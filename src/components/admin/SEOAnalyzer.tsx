import { useState, useMemo } from 'react';
import { Sparkles, Loader2, CheckCircle, XCircle, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SEOAnalyzerProps {
  title: string;
  description: string;
  content: string;
  slug: string;
  onUpdateTitle: (title: string) => void;
  onUpdateDescription: (description: string) => void;
}

interface SEOCheck {
  label: string;
  status: 'good' | 'warning' | 'bad';
  message: string;
  suggestion?: string;
}

interface AIAnalysis {
  score: number;
  suggestedTitle?: string;
  suggestedDescription?: string;
  keywords?: string[];
  improvements?: string[];
}

export default function SEOAnalyzer({
  title,
  description,
  content,
  slug,
  onUpdateTitle,
  onUpdateDescription,
}: SEOAnalyzerProps) {
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Basic SEO checks (client-side)
  const basicChecks = useMemo((): SEOCheck[] => {
    const checks: SEOCheck[] = [];

    // Title checks
    if (!title) {
      checks.push({
        label: 'Title',
        status: 'bad',
        message: 'Missing title',
        suggestion: 'Add a compelling title for your article',
      });
    } else if (title.length < 30) {
      checks.push({
        label: 'Title Length',
        status: 'warning',
        message: `Title is short (${title.length} chars)`,
        suggestion: 'Aim for 50-60 characters for optimal SEO',
      });
    } else if (title.length > 60) {
      checks.push({
        label: 'Title Length',
        status: 'warning',
        message: `Title may be truncated (${title.length} chars)`,
        suggestion: 'Keep under 60 characters to prevent truncation in search results',
      });
    } else {
      checks.push({
        label: 'Title Length',
        status: 'good',
        message: `Good length (${title.length} chars)`,
      });
    }

    // Description checks
    if (!description) {
      checks.push({
        label: 'Meta Description',
        status: 'bad',
        message: 'Missing meta description',
        suggestion: 'Add a description for search engines',
      });
    } else if (description.length < 120) {
      checks.push({
        label: 'Description Length',
        status: 'warning',
        message: `Description is short (${description.length} chars)`,
        suggestion: 'Aim for 150-160 characters',
      });
    } else if (description.length > 160) {
      checks.push({
        label: 'Description Length',
        status: 'warning',
        message: `Description may be truncated (${description.length} chars)`,
        suggestion: 'Keep under 160 characters',
      });
    } else {
      checks.push({
        label: 'Description Length',
        status: 'good',
        message: `Good length (${description.length} chars)`,
      });
    }

    // Content checks
    const wordCount = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(w => w.length > 0).length;
    if (wordCount < 300) {
      checks.push({
        label: 'Content Length',
        status: 'warning',
        message: `Short content (${wordCount} words)`,
        suggestion: 'Aim for at least 300 words for better SEO',
      });
    } else if (wordCount >= 1000) {
      checks.push({
        label: 'Content Length',
        status: 'good',
        message: `Excellent length (${wordCount} words)`,
      });
    } else {
      checks.push({
        label: 'Content Length',
        status: 'good',
        message: `Good length (${wordCount} words)`,
      });
    }

    // Heading checks
    const hasH2 = content.includes('<h2');
    if (!hasH2) {
      checks.push({
        label: 'Headings',
        status: 'warning',
        message: 'No H2 headings found',
        suggestion: 'Add H2 headings to structure your content',
      });
    } else {
      const h2Count = (content.match(/<h2/g) || []).length;
      checks.push({
        label: 'Headings',
        status: 'good',
        message: `${h2Count} H2 heading(s) found`,
      });
    }

    // Image checks
    const hasImages = content.includes('<img');
    if (!hasImages) {
      checks.push({
        label: 'Images',
        status: 'warning',
        message: 'No images found',
        suggestion: 'Add images to make content more engaging',
      });
    } else {
      const imgCount = (content.match(/<img/g) || []).length;
      const hasAlt = content.includes('alt="') || content.includes("alt='");
      if (hasAlt) {
        checks.push({
          label: 'Images',
          status: 'good',
          message: `${imgCount} image(s) with alt text`,
        });
      } else {
        checks.push({
          label: 'Images',
          status: 'warning',
          message: `${imgCount} image(s) - missing alt text`,
          suggestion: 'Add alt text to all images for accessibility and SEO',
        });
      }
    }

    // Slug checks
    if (slug.includes('--') || slug.includes('_')) {
      checks.push({
        label: 'URL Slug',
        status: 'warning',
        message: 'Slug has unusual characters',
        suggestion: 'Use single hyphens between words',
      });
    } else if (slug.length > 50) {
      checks.push({
        label: 'URL Slug',
        status: 'warning',
        message: 'Slug is long',
        suggestion: 'Keep URLs concise (under 50 chars)',
      });
    } else {
      checks.push({
        label: 'URL Slug',
        status: 'good',
        message: 'Clean URL structure',
      });
    }

    // Internal links
    const hasLinks = content.includes('<a href');
    if (!hasLinks) {
      checks.push({
        label: 'Links',
        status: 'warning',
        message: 'No links found',
        suggestion: 'Add internal or external links',
      });
    } else {
      checks.push({
        label: 'Links',
        status: 'good',
        message: 'Contains links',
      });
    }

    return checks;
  }, [title, description, content, slug]);

  // Calculate basic score
  const basicScore = useMemo(() => {
    const goodCount = basicChecks.filter(c => c.status === 'good').length;
    return Math.round((goodCount / basicChecks.length) * 100);
  }, [basicChecks]);

  // Run AI analysis
  const runAIAnalysis = async () => {
    if (!title || !content) {
      setError('Please add a title and content first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('ai-enhance', {
        body: {
          type: 'seo',
          value: content,
          context: { title, description },
        },
      });

      if (fnError) {
        throw new Error(fnError.message || 'Failed to analyze content');
      }

      setAiAnalysis(data);
    } catch (err) {
      console.error('SEO Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToField = (value: string, field: 'title' | 'description') => {
    if (field === 'title') {
      onUpdateTitle(value);
    } else {
      onUpdateDescription(value);
    }
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getStatusIcon = (status: 'good' | 'warning' | 'bad') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'bad':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Basic SEO Checks */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">SEO Checklist</h3>
          <div className={`text-2xl font-bold ${
            basicScore >= 80 ? 'text-emerald-600' : basicScore >= 50 ? 'text-amber-600' : 'text-red-600'
          }`}>
            {basicScore}%
          </div>
        </div>
        
        <div className="space-y-3">
          {basicChecks.map((check, index) => (
            <div key={index} className="flex items-start gap-3">
              {getStatusIcon(check.status)}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{check.label}</span>
                </div>
                <p className="text-sm text-gray-600">{check.message}</p>
                {check.suggestion && (
                  <p className="text-sm text-amber-600 mt-1">{check.suggestion}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI-Powered Analysis */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">AI Analysis</h3>
          <button
            onClick={runAIAnalysis}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Analyze with AI
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {!aiAnalysis && !loading && (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Click "Analyze with AI" to get AI-powered SEO recommendations
            </p>
          </div>
        )}

        {aiAnalysis && (
          <div className="space-y-6">
            {/* AI Score */}
            {aiAnalysis.score && (
              <div className="text-center py-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <div className={`text-4xl font-bold ${
                  aiAnalysis.score >= 80 ? 'text-emerald-600' : aiAnalysis.score >= 50 ? 'text-amber-600' : 'text-red-600'
                }`}>
                  {aiAnalysis.score}%
                </div>
                <p className="text-sm text-gray-600 mt-1">AI SEO Score</p>
              </div>
            )}

            {/* Suggested Title */}
            {aiAnalysis.suggestedTitle && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Suggested Title</label>
                  <button
                    onClick={() => copyToField(aiAnalysis.suggestedTitle!, 'title')}
                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                  >
                    {copiedField === 'title' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Applied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Use this
                      </>
                    )}
                  </button>
                </div>
                <p className="bg-gray-50 p-3 rounded-lg text-gray-800">
                  {aiAnalysis.suggestedTitle}
                </p>
              </div>
            )}

            {/* Suggested Description */}
            {aiAnalysis.suggestedDescription && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Suggested Description</label>
                  <button
                    onClick={() => copyToField(aiAnalysis.suggestedDescription!, 'description')}
                    className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
                  >
                    {copiedField === 'description' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Applied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Use this
                      </>
                    )}
                  </button>
                </div>
                <p className="bg-gray-50 p-3 rounded-lg text-gray-800 text-sm">
                  {aiAnalysis.suggestedDescription}
                </p>
              </div>
            )}

            {/* Keywords */}
            {aiAnalysis.keywords && aiAnalysis.keywords.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Recommended Keywords
                </label>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.keywords.map((keyword, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            {aiAnalysis.improvements && aiAnalysis.improvements.length > 0 && (
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Suggested Improvements
                </label>
                <ul className="space-y-2">
                  {aiAnalysis.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-purple-500 mt-1">•</span>
                      {improvement}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={runAIAnalysis}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Re-analyze
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

