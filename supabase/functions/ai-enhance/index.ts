// Supabase Edge Function: AI Enhancement with GPT-5.2
//
// This function handles AI-powered content enhancement for the blog admin.
// It uses OpenAI's GPT-5.2 model for:
// - Title enhancement
// - Description enhancement
// - Content enhancement
// - SEO optimization and analysis

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EnhanceRequest {
  type: 'title' | 'description' | 'content' | 'seo';
  value: string;
  context?: {
    title?: string;
    description?: string;
    content?: string;
  };
}

async function callGPT(systemPrompt: string, userPrompt: string, maxTokens: number = 2000): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key not configured');
  }

  // Use GPT-5.2 with the Responses API for best results
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-5.2',
      input: `${systemPrompt}\n\n---\n\n${userPrompt}`,
      reasoning: {
        effort: 'low',  // Quick enhancements don't need heavy reasoning
      },
      text: {
        verbosity: 'medium',
      },
      max_output_tokens: maxTokens,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('OpenAI API error:', error);
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  // Responses API returns output_text directly
  return data.output_text?.trim() || data.output?.[0]?.content?.[0]?.text?.trim() || '';
}

async function enhanceTitle(title: string): Promise<string> {
  const systemPrompt = `You are an expert copywriter specializing in B2B data analytics and forecasting content.
Your task is to improve article titles to be more engaging, click-worthy, and SEO-friendly.
Guidelines:
- Keep titles under 60 characters for SEO
- Make them compelling and action-oriented
- Include relevant keywords naturally
- Maintain professional B2B tone
- Don't use clickbait or sensationalism
Return ONLY the improved title, nothing else.`;

  const userPrompt = `Improve this article title for a B2B data analytics company: "${title}"`;

  return await callGPT(systemPrompt, userPrompt, 1000);
}

async function enhanceDescription(description: string, context?: { title?: string; content?: string }): Promise<string> {
  const systemPrompt = `You are an SEO expert specializing in B2B content for data analytics companies.
Your task is to create compelling meta descriptions that:
- Are between 150-160 characters
- Include relevant keywords naturally
- Have a clear value proposition
- Encourage clicks without being clickbait
- Summarize the content accurately
Return ONLY the improved description, nothing else.`;

  const contextInfo = context ? `
Title: ${context.title || 'Not provided'}
Content preview: ${context.content?.substring(0, 500) || 'Not provided'}` : '';

  const userPrompt = `Improve this meta description for a B2B data analytics article:
Current description: "${description}"
${contextInfo}`;

  return await callGPT(systemPrompt, userPrompt, 1000);
}

async function enhanceContent(content: string, context?: { title?: string; description?: string }): Promise<string> {
  const systemPrompt = `You are an expert editor for B2B data analytics and forecasting content.
Your task is to improve the article content for:
- Better readability and flow
- Clearer explanations
- Professional B2B tone
- Proper HTML formatting
- Grammar and style improvements
- Logical structure with clear headings

Keep the same HTML structure but improve the text quality.
Return ONLY the improved HTML content, nothing else. Do not wrap in code blocks or markdown.`;

  const contextInfo = context ? `
Title: ${context.title || 'Not provided'}
Description: ${context.description || 'Not provided'}` : '';

  const userPrompt = `Improve this article content:
${contextInfo}

Content:
${content}`;

  const result = await callGPT(systemPrompt, userPrompt, 4000);

  // Strip markdown code blocks if present
  return result
    .replace(/^```html\s*/i, '')  // Remove opening ```html
    .replace(/^```\s*/i, '')       // Remove opening ```
    .replace(/\s*```$/i, '')       // Remove closing ```
    .trim();
}

interface SEOAnalysis {
  score: number;
  suggestedTitle: string;
  suggestedDescription: string;
  keywords: string[];
  improvements: string[];
}

async function analyzeSEO(content: string, context?: { title?: string; description?: string }): Promise<SEOAnalysis> {
  const systemPrompt = `You are an SEO expert analyzing B2B data analytics content.
Analyze the content and provide:
1. An SEO score (0-100)
2. A suggested optimized title (under 60 chars)
3. A suggested meta description (150-160 chars)
4. 5-7 target keywords
5. 3-5 specific improvements

Respond in valid JSON format ONLY:
{
  "score": 75,
  "suggestedTitle": "...",
  "suggestedDescription": "...",
  "keywords": ["keyword1", "keyword2"],
  "improvements": ["improvement1", "improvement2"]
}`;

  const userPrompt = `Analyze this article for SEO:
Title: ${context?.title || 'Not provided'}
Description: ${context?.description || 'Not provided'}
Content: ${content.substring(0, 3000)}`;

  const response = await callGPT(systemPrompt, userPrompt, 2000);
  
  try {
    // Extract JSON from response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('No valid JSON found in response');
  } catch (err) {
    console.error('Failed to parse SEO analysis:', err);
    return {
      score: 50,
      suggestedTitle: context?.title || '',
      suggestedDescription: context?.description || '',
      keywords: [],
      improvements: ['Unable to analyze content. Please try again.'],
    };
  }
}

Deno.serve(async (req: Request) => {
  try {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    const { type, value, context } = await req.json() as EnhanceRequest;

    if (!type) {
      return new Response(
        JSON.stringify({ error: 'Missing enhancement type' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    let result: string | SEOAnalysis;

    switch (type) {
      case 'title':
        result = await enhanceTitle(value);
        return new Response(
          JSON.stringify({ enhanced: result }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'description':
        result = await enhanceDescription(value, context);
        return new Response(
          JSON.stringify({ enhanced: result }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'content':
        result = await enhanceContent(value, context);
        return new Response(
          JSON.stringify({ enhanced: result }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      case 'seo':
        result = await analyzeSEO(value, context);
        return new Response(
          JSON.stringify(result),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      default:
        return new Response(
          JSON.stringify({ error: `Unknown enhancement type: ${type}` }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (err) {
    console.error('Enhancement error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Enhancement failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
