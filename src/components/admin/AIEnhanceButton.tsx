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
      setError('Please enter some content first');
      setTimeout(() => setError(null), 3000);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Call the Supabase Edge Function
      const { data, error: fnError } = await supabase.functions.invoke('ai-enhance', {
        body: {
          type,
          value,
          context,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to enhance content');
      }

      if (data?.enhanced) {
        onEnhanced(data.enhanced);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        throw new Error('No enhanced content returned');
      }
    } catch (err) {
      console.error('AI Enhancement error:', err);
      setError(err instanceof Error ? err.message : 'Enhancement failed');
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

