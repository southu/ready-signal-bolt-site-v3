import { useState } from 'react';
import { Sparkles, Loader2, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { isSupabaseConfigured } from '../../lib/supabaseArticles';

type EnhanceType = 'title' | 'description' | 'content' | 'seo';

interface AIEnhanceButtonProps {
  type: EnhanceType;
  value: string;
  context?: {
    title?: string;
    description?: string;
    content?: string;
  };
  onEnhanced: (enhanced: string) => void;
  disabled?: boolean;
}

const ENHANCE_LABELS: Record<EnhanceType, string> = {
  title: 'Enhance Title',
  description: 'Enhance Description',
  content: 'Enhance Content',
  seo: 'Optimize SEO',
};

// System prompts for different enhancement types
const SYSTEM_PROMPTS: Record<EnhanceType, string> = {
  title: `You are an expert copywriter specializing in B2B data analytics and forecasting content.
Your task is to improve article titles to be more engaging, click-worthy, and SEO-friendly.
Guidelines:
- Keep titles under 60 characters for SEO
- Make them compelling and action-oriented
- Include relevant keywords naturally
- Maintain professional B2B tone
- Don't use clickbait or sensationalism
Return ONLY the improved title, nothing else.`,

  description: `You are an SEO expert specializing in B2B content for data analytics companies.
Your task is to create compelling meta descriptions that:
- Are between 150-160 characters
- Include relevant keywords naturally
- Have a clear value proposition
- Encourage clicks without being clickbait
- Summarize the content accurately
Return ONLY the improved description, nothing else.`,

  content: `You are an expert editor for B2B data analytics and forecasting content.
Your task is to improve the article content for:
- Better readability and flow
- Clearer explanations
- Professional B2B tone
- Proper HTML formatting
- Grammar and style improvements
- Logical structure with clear headings
Keep the same HTML structure but improve the text quality.
Return ONLY the improved HTML content, nothing else.`,

  seo: `You are an SEO expert analyzing B2B data analytics content.
Analyze the content and provide a JSON response with:
{
  "score": 75,
  "optimizedTitle": "Your suggested title here",
  "optimizedDescription": "Your suggested meta description here",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
  "overallFeedback": "Brief summary of SEO status"
}
Respond with ONLY valid JSON, no markdown or explanation.`,
};

// Direct OpenAI API call
async function callOpenAI(
  type: EnhanceType,
  value: string,
  context?: { title?: string; description?: string; content?: string }
): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment variables.');
  }

  const systemPrompt = SYSTEM_PROMPTS[type];
  let userPrompt = '';

  switch (type) {
    case 'title':
      userPrompt = `Improve this article title for a B2B data analytics company:\n\n"${value}"`;
      break;
    case 'description':
      userPrompt = `Improve this meta description for a B2B data analytics article:
      
Current description: "${value}"
${context?.title ? `\nTitle: ${context.title}` : ''}
${context?.content ? `\nContent preview: ${context.content.substring(0, 500)}...` : ''}`;
      break;
    case 'content':
      userPrompt = `Improve this article content while maintaining HTML formatting:
${context?.title ? `\nTitle: ${context.title}` : ''}
${context?.description ? `\nDescription: ${context.description}` : ''}

Content to improve:
${value}`;
      break;
    case 'seo':
      userPrompt = `Analyze this article for SEO:

Title: ${context?.title || 'Not provided'}
Description: ${context?.description || 'Not provided'}
Content: ${value.substring(0, 4000)}`;
      break;
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o', // GPT-4o is the latest available model
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: type === 'content' ? 4000 : 1000,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('OpenAI API error:', errorData);
    
    if (response.status === 401) {
      throw new Error('Invalid API key');
    } else if (response.status === 429) {
      throw new Error('Rate limit exceeded');
    } else if (response.status === 500) {
      throw new Error('OpenAI server error');
    }
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content?.trim() || '';
}

export default function AIEnhanceButton({
  type,
  value,
  context,
  onEnhanced,
  disabled = false,
}: AIEnhanceButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEnhance = async () => {
    if (!value.trim() && type !== 'seo') {
      setError('Enter content first');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      let enhanced: string;

      // Try Supabase Edge Function first if fully configured
      if (isSupabaseConfigured()) {
        try {
          const { data, error: fnError } = await supabase.functions.invoke('ai-enhance', {
            body: { type, value, context },
          });

          if (fnError) throw fnError;
          enhanced = type === 'seo' ? JSON.stringify(data) : data?.enhanced;
        } catch (edgeFnError) {
          console.warn('Edge Function not available, using direct API:', edgeFnError);
          enhanced = await callOpenAI(type, value, context);
        }
      } else {
        // Direct OpenAI call
        enhanced = await callOpenAI(type, value, context);
      }

      if (enhanced) {
        onEnhanced(enhanced);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        throw new Error('No content returned');
      }
    } catch (err) {
      console.error('AI Enhancement error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Enhancement failed';
      
      // Short error messages for display
      if (errorMessage.includes('API key not configured')) {
        setError('API key missing');
      } else if (errorMessage.includes('Invalid API key')) {
        setError('Invalid API key');
      } else if (errorMessage.includes('Rate limit')) {
        setError('Rate limited');
      } else {
        setError(errorMessage.length > 30 ? 'Enhancement failed' : errorMessage);
      }
      
      setTimeout(() => setError(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleEnhance}
        disabled={disabled || loading}
        title={ENHANCE_LABELS[type]}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
          loading
            ? 'bg-purple-100 text-purple-600 cursor-wait'
            : success
            ? 'bg-green-100 text-green-700'
            : error
            ? 'bg-red-100 text-red-700'
            : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Enhancing...</span>
          </>
        ) : success ? (
          <>
            <Check className="w-4 h-4" />
            <span>Done!</span>
          </>
        ) : error ? (
          <>
            <X className="w-4 h-4" />
            <span>Failed</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            <span>{ENHANCE_LABELS[type]}</span>
          </>
        )}
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 bg-red-100 text-red-700 text-xs px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
          {error}
        </div>
      )}
    </div>
  );
}
