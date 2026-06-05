// Supabase Edge Function: SEO Optimize with cross-LLM validation
//
// Pipeline (mirrors J77's two-tier validation design):
//   1. Rewrite the article with GPT-5.2 to apply SEO improvements + keywords.
//   2. Deterministic guard: confirm no citation links were dropped (no LLM).
//   3. Cross-model validation with Grok-4 (a DIFFERENT provider than the rewriter)
//      to confirm claims/statistics/meaning were preserved and nothing fabricated.
//   4. Binary gate: passed only if links survived AND Grok confirms preservation.
//
// The rewriter (OpenAI) and validator (xAI/Grok) are deliberately different providers
// so the model that wrote the change is not the one grading it.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const XAI_API_KEY = Deno.env.get('XAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface OptimizeRequest {
  title: string;
  description: string;
  content: string;
  slug?: string;
  keywords?: string[];
  improvements?: string[];
  // When provided, skip the rewrite and only validate this candidate against `content`.
  // Used to re-validate a human-edited draft against the original.
  validateCandidate?: string;
}

interface Optimized {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

interface Validation {
  passed: boolean;
  meaningPreserved: boolean;
  confidence: number;
  fabricatedClaims: string[];
  droppedClaims: string[];
  alteredFacts: string[];
  droppedCitations: string[];
  summary: string;
}

const REWRITE_SYSTEM_PROMPT = `You are an expert SEO editor for Ready Signal, a B2B data analytics and forecasting platform. You rewrite an existing blog article to apply specific SEO improvements WITHOUT changing its facts.

**HARD CONSTRAINTS (never violate):**
1. PRESERVE EVERY FACTUAL CLAIM AND STATISTIC EXACTLY. Do not change any number, percentage, dollar amount, date, or named entity. Never invent or extrapolate new statistics.
2. PRESERVE EVERY CITATION. Keep every <a href="..."> link and its exact URL. Keep the "Sources" section and all its URLs. You may change link anchor text but never the href.
3. Do not remove substantive information. You may restructure and expand, but not delete facts.

**WHAT YOU SHOULD DO:**
- Apply each of the provided SEO improvements.
- Weave the target keywords in naturally (title, first 100 words, H2/H3s, body) — no keyword stuffing.
- Improve structure with clear <h2>/<h3> headings, short paragraphs, and lists.
- Add relevant internal links to Ready Signal pages (e.g. https://www.readysignal.com/) where it genuinely helps the reader.
- Expand thin or shallow sections with explanation and context (not invented data).
- Use proper HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <a>. No <h1>.

**OUTPUT:** Return ONLY valid JSON, no markdown fences:
{
  "title": "SEO-optimized title (50-60 chars)",
  "description": "Meta description (150-160 chars)",
  "content": "<h2>...</h2><p>...</p>... full HTML article including the preserved Sources section",
  "tags": ["tag1", "tag2", "..."]
}`;

const VALIDATOR_SYSTEM_PROMPT = `You are a meticulous fact-preservation auditor. You are given the ORIGINAL blog article and a REWRITTEN version that was SEO-optimized by a different AI. Your ONLY job is to verify the rewrite did not alter, fabricate, or drop any factual content. SEO/structural changes (new headings, reworded prose, added internal links, keyword usage) are EXPECTED and fine — do not flag those.

Flag ONLY:
- fabricatedClaims: statistics or factual claims in the REWRITE that are NOT supported by the ORIGINAL.
- droppedClaims: important factual claims/data points present in the ORIGINAL but missing from the REWRITE.
- alteredFacts: any number, percentage, date, name, or claim whose meaning CHANGED between original and rewrite.
- droppedCitations: source URLs present in the ORIGINAL that are missing from the REWRITE.

Then judge meaningPreserved (does the rewrite convey the same factual substance?) and a confidence score 0-100.

Respond ONLY with valid JSON, no markdown fences:
{
  "passed": true,
  "meaningPreserved": true,
  "confidence": 95,
  "fabricatedClaims": [],
  "droppedClaims": [],
  "alteredFacts": [],
  "droppedCitations": [],
  "summary": "one sentence"
}
Set "passed" to false if there is ANY fabricatedClaim or alteredFact, or if meaning is not preserved.`;

// ---- Step 1: rewrite with GPT-5.2 (Responses API) ----
async function rewriteForSEO(req: OptimizeRequest): Promise<Optimized> {
  if (!OPENAI_API_KEY) throw new Error('OPENAI_API_KEY not configured');

  let userPrompt = `Rewrite this article to improve SEO while preserving all facts and citations.\n\nCURRENT TITLE: ${req.title}\nCURRENT DESCRIPTION: ${req.description}\n`;
  if (req.keywords?.length) {
    userPrompt += `\nTARGET KEYWORDS:\n${req.keywords.map((k) => `- ${k}`).join('\n')}\n`;
  }
  if (req.improvements?.length) {
    userPrompt += `\nSEO IMPROVEMENTS TO APPLY:\n${req.improvements.map((i) => `- ${i}`).join('\n')}\n`;
  }
  userPrompt += `\nCURRENT CONTENT (HTML):\n${req.content}`;

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5.2',
      input: [
        { role: 'developer', content: REWRITE_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      reasoning: { effort: 'high' },
      text: { verbosity: 'high' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('GPT-5.2 rewrite error:', response.status, errorText);
    throw new Error(`OpenAI rewrite error: ${response.status}`);
  }

  const data = await response.json();
  let content = '';
  if (data.output && Array.isArray(data.output)) {
    for (const block of data.output) {
      if (block.type === 'output_text' && block.text) {
        content += block.text;
      } else if (block.type === 'message' && block.content) {
        for (const cb of block.content) {
          if (cb.type === 'output_text' && cb.text) content += cb.text;
        }
      }
    }
  }
  if (!content) throw new Error('No content returned from rewriter');

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Rewriter returned no JSON');
  const parsed = JSON.parse(jsonMatch[0]) as Optimized;
  if (!parsed.title || !parsed.content) throw new Error('Rewrite missing required fields');
  return parsed;
}

// ---- Step 2: deterministic citation guard (no LLM) ----
function extractHrefs(html: string): string[] {
  const urls = new Set<string>();
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const u = m[1].trim();
    if (u.startsWith('http')) urls.add(u.replace(/\/$/, ''));
  }
  return [...urls];
}

function findDroppedLinks(original: string, rewritten: string): string[] {
  const after = new Set(extractHrefs(rewritten));
  return extractHrefs(original).filter((u) => !after.has(u));
}

// ---- Step 3: cross-model validation with Grok-4 ----
async function validateWithGrok(original: string, rewritten: string): Promise<Validation> {
  if (!XAI_API_KEY) throw new Error('XAI_API_KEY not configured');

  const userPrompt = `ORIGINAL ARTICLE:\n${original}\n\n---\n\nREWRITTEN ARTICLE:\n${rewritten}`;

  const response = await fetch('https://api.x.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${XAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'grok-4',
      messages: [
        { role: 'system', content: VALIDATOR_SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Grok validation error:', response.status, errorText);
    throw new Error(`Grok validation error: ${response.status} ${errorText.substring(0, 200)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '';
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Validator returned no JSON');
  const v = JSON.parse(jsonMatch[0]);
  return {
    passed: !!v.passed,
    meaningPreserved: v.meaningPreserved !== false,
    confidence: typeof v.confidence === 'number' ? v.confidence : 0,
    fabricatedClaims: v.fabricatedClaims || [],
    droppedClaims: v.droppedClaims || [],
    alteredFacts: v.alteredFacts || [],
    droppedCitations: v.droppedCitations || [],
    summary: v.summary || '',
  };
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const body = await req.json() as OptimizeRequest;
    if (!body.content || !body.title) {
      return new Response(
        JSON.stringify({ error: 'Missing title or content' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // Step 1: rewrite (or use a supplied candidate to re-validate an edited draft)
    const optimized = body.validateCandidate
      ? { title: body.title, description: body.description, content: body.validateCandidate, tags: [] }
      : await rewriteForSEO(body);

    // Step 2: deterministic citation guard
    const droppedLinks = findDroppedLinks(body.content, optimized.content);

    // Step 3: cross-model validation
    const validation = await validateWithGrok(body.content, optimized.content);

    // Merge deterministic findings into the validation verdict, deduped by
    // normalized URL (ignore trailing slashes) so the same link isn't listed twice.
    const norm = (u: string) => u.trim().replace(/\/$/, '');
    const seen = new Set<string>();
    validation.droppedCitations = [...validation.droppedCitations, ...droppedLinks]
      .filter((u) => {
        const key = norm(u);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });

    // Step 4: binary gate — links must survive AND Grok must confirm preservation
    const linksOk = droppedLinks.length === 0;
    const passed = linksOk && validation.passed && validation.meaningPreserved;

    return new Response(
      JSON.stringify({
        optimized,
        validation: { ...validation, passed, linksOk },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('SEO optimize error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'SEO optimization failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
