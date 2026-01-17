import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `You are an expert blog content creator and SEO specialist with deep knowledge of B2B data analytics, forecasting, and business intelligence.

**CRITICAL RULES:**
1. **ORIGINALITY FIRST**: If the user provides existing content (articles, tweets, notes), treat it as INSPIRATION ONLY. Extract the core topic and angle, but write completely original analysis with fresh insights. NEVER copy or closely paraphrase the input.
2. **USE PROVIDED RESEARCH**: Incorporate the research data provided, including statistics and findings. Always cite sources with hyperlinks.
3. **HYPERLINKED CITATIONS**: When citing statistics or claims, use HTML anchor tags: <a href="URL" target="_blank" rel="noopener">Source Name</a>

**YOUR TASK:** Generate a complete blog article package in JSON format including:

1. **title** - SEO-Optimized Title (50-60 characters, compelling and keyword-rich)
2. **slug** - URL Slug (SEO-friendly, lowercase, hyphens between words, no special characters)
3. **description** - Meta Description (150-160 characters, compelling with clear value proposition)
4. **content** - Article Content (1,500-2,500 words, well-structured HTML with H2/H3 headings, paragraphs, lists)
5. **category** - Single most appropriate category from: Resources, Insights, Case Studies, Tutorials, Documentation, News
6. **tags** - Array of 3-7 relevant, specific tags (lowercase, can include spaces)
7. **dataSuggestions** - Array of 2-4 specific data types from Ready Signal that would enhance the article

**SOURCES SECTION:**
At the end of the content, include a "Sources" section with all referenced links formatted as a bulleted list.

**IMPORTANT:**
- Write in an authoritative yet accessible tone
- Focus on actionable insights for business decision-makers
- Include specific examples, statistics, and data points from research
- Structure content for both readability and SEO
- Use short paragraphs (2-3 sentences max)

Respond ONLY with valid JSON, no markdown code blocks.`;

interface GenerateRequest {
  action: 'generate-article' | 'generate-image';
  rawContent?: string;
  research?: {
    summary: string;
    keyFindings: string[];
    statistics: string[];
    recentTrends: string[];
    sources: { title: string; url: string; snippet: string; }[];
  };
  imageTitle?: string;
  imageTopic?: string;
}

async function generateArticle(rawContent: string, research?: GenerateRequest['research']) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  let userPrompt = `Transform this into a complete, ORIGINAL blog article:\n\n${rawContent}`;
  
  if (research) {
    userPrompt += `\n\n--- RESEARCH DATA (incorporate with citations) ---\n`;
    userPrompt += `\nSummary: ${research.summary}`;
    
    if (research.keyFindings.length > 0) {
      userPrompt += `\n\nKey Findings:\n${research.keyFindings.map(f => `- ${f}`).join('\n')}`;
    }
    
    if (research.statistics.length > 0) {
      userPrompt += `\n\nStatistics to cite:\n${research.statistics.map(s => `- ${s}`).join('\n')}`;
    }
    
    if (research.recentTrends.length > 0) {
      userPrompt += `\n\nRecent Trends:\n${research.recentTrends.map(t => `- ${t}`).join('\n')}`;
    }
    
    if (research.sources.length > 0) {
      userPrompt += `\n\nSources (use these URLs in citations):\n${research.sources.map(s => `- ${s.title}: ${s.url}`).join('\n')}`;
    }
  }

  // Use GPT-5.2 with the Responses API
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5.2',
      input: [
        { role: 'developer', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt }
      ],
      reasoning: { effort: 'medium' },
      text: { verbosity: 'high' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', response.status, errorText);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  
  // Extract content from GPT-5.2 response (output_text blocks)
  let content = '';
  if (data.output && Array.isArray(data.output)) {
    for (const block of data.output) {
      if (block.type === 'output_text' && block.text) {
        content += block.text;
      } else if (block.type === 'message' && block.content) {
        for (const contentBlock of block.content) {
          if (contentBlock.type === 'output_text' && contentBlock.text) {
            content += contentBlock.text;
          }
        }
      }
    }
  }

  if (!content) {
    throw new Error('No content returned from AI');
  }

  // Parse the JSON response
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Invalid response format from AI');
  }

  return JSON.parse(jsonMatch[0]);
}

async function generateImage(title: string, topic: string) {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  const imagePrompt = `Professional, modern B2B business illustration for a blog article titled "${title}". 
Topic: ${topic}
Style: Clean, corporate, data-driven aesthetic with abstract geometric shapes, charts, or professional business imagery. 
Colors: Professional blues, teals, and amber accents on a clean background.
No text or words in the image. Suitable for a data analytics company blog.`;

  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: imagePrompt,
      n: 1,
      size: '1792x1024',
      quality: 'standard',
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('DALL-E API error:', response.status, errorText);
    throw new Error(`Image generation failed: ${response.status}`);
  }

  const data = await response.json();
  return { url: data.data[0]?.url || '' };
}

Deno.serve(async (req: Request) => {
  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const { action, rawContent, research, imageTitle, imageTopic } = await req.json() as GenerateRequest;

    if (action === 'generate-article') {
      if (!rawContent) {
        return new Response(
          JSON.stringify({ error: 'Missing rawContent' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const article = await generateArticle(rawContent, research);
      return new Response(
        JSON.stringify(article),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'generate-image') {
      if (!imageTitle || !imageTopic) {
        return new Response(
          JSON.stringify({ error: 'Missing imageTitle or imageTopic' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const image = await generateImage(imageTitle, imageTopic);
      return new Response(
        JSON.stringify(image),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Invalid action' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Generate article error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Generation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
