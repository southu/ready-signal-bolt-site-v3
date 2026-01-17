import { useState } from 'react';
import { Sparkles, Loader2, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

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
      // Always use Supabase Edge Function (API key is stored server-side)
      const { data, error: fnError } = await supabase.functions.invoke('ai-enhance', {
        body: { type, value, context },
      });

      if (fnError) throw fnError;
      
      const enhanced = type === 'seo' ? JSON.stringify(data) : data?.enhanced;

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
