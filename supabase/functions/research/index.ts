// Supabase Edge Function: Research with Perplexity API
//
// This function handles research queries for blog article generation.
// It uses Perplexity's API to gather:
// - Current statistics and data points
// - Recent news and trends
// - Source URLs for citations

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ResearchRequest {
  topic: string;
  context?: string;
}

interface ResearchSource {
  title: string;
  url: string;
  snippet: string;
}

interface ResearchResult {
  summary: string;
  keyFindings: string[];
  statistics: string[];
  recentTrends: string[];
  sources: ResearchSource[];
}

async function performResearch(topic: string, context?: string): Promise<ResearchResult> {
  if (!PERPLEXITY_API_KEY) {
    throw new Error('Perplexity API key not configured');
  }

  const systemPrompt = `You are a research assistant specializing in B2B data analytics, forecasting, and business intelligence.
Your task is to research the given topic and provide comprehensive, well-sourced information.

Focus on:
1. Current statistics and data points with specific numbers
2. Recent news and developments (within the last 1-2 years)
3. Industry trends and market insights
4. Authoritative sources (research firms, industry publications, government data)

IMPORTANT: Always cite your sources with actual URLs. Every claim should have a source.

Respond in valid JSON format:
{
  "summary": "A 2-3 sentence overview of the topic",
  "keyFindings": ["Finding 1 with specific data", "Finding 2 with specific data", ...],
  "statistics": ["Statistic 1 (Source: URL)", "Statistic 2 (Source: URL)", ...],
  "recentTrends": ["Trend 1", "Trend 2", ...],
  "sources": [
    {"title": "Source Title", "url": "https://...", "snippet": "Key quote or data from this source"},
    ...
  ]
}`;

  const userPrompt = context
    ? `Research this topic for a B2B data analytics blog article:\n\nTopic: ${topic}\n\nAdditional context: ${context}`
    : `Research this topic for a B2B data analytics blog article:\n\nTopic: ${topic}`;

  const response = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.2,
      max_tokens: 4000,
      return_citations: true,
      search_recency_filter: 'year',
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('Perplexity API error:', error);
    throw new Error(`Perplexity API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '';
  
  // Extract citations if provided by Perplexity
  const citations = data.citations || [];

  try {
    // Parse JSON response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]) as ResearchResult;
      
      // Merge Perplexity's native citations with parsed sources
      if (citations.length > 0 && (!parsed.sources || parsed.sources.length === 0)) {
        parsed.sources = citations.map((url: string, index: number) => ({
          title: `Source ${index + 1}`,
          url: url,
          snippet: '',
        }));
      }
      
      return parsed;
    }
    throw new Error('No valid JSON found in response');
  } catch (err) {
    console.error('Failed to parse research response:', err);
    
    // Return a basic structure with the raw content
    return {
      summary: content.substring(0, 500),
      keyFindings: [],
      statistics: [],
      recentTrends: [],
      sources: citations.map((url: string, index: number) => ({
        title: `Source ${index + 1}`,
        url: url,
        snippet: '',
      })),
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

    const { topic, context } = await req.json() as ResearchRequest;

    if (!topic || topic.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Missing or empty topic' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const research = await performResearch(topic, context);

    return new Response(
      JSON.stringify(research),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Research error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Research failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
