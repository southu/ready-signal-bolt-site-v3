import { useState } from 'react';
import { Sparkles, Loader2, Check, Copy, ArrowRight, FileText, AlertCircle } from 'lucide-react';

interface GeneratedArticle {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  dataSuggestions: string[];
}

interface AIArticleGeneratorProps {
  onGenerated: (article: GeneratedArticle) => void;
  onCancel: () => void;
}

const SYSTEM_PROMPT = `You are an expert blog content creator and SEO specialist with deep knowledge of B2B data analytics, forecasting, and business intelligence. Your task is to transform raw text input into a comprehensive, publication-ready blog article with all necessary metadata and optimizations.

**YOUR TASK:** Generate a complete blog article package in JSON format including:

1. **title** - SEO-Optimized Title (50-60 characters, compelling and keyword-rich)
2. **slug** - URL Slug (SEO-friendly, lowercase, hyphens between words, no special characters)
3. **description** - Meta Description (150-160 characters, compelling with clear value proposition)
4. **content** - Article Content (1,500-2,500 words, well-structured HTML with H2/H3 headings, paragraphs, lists)
5. **category** - Single most appropriate category from: Resources, Insights, Case Studies, Tutorials, Documentation, News
6. **tags** - Array of 5-8 relevant lowercase tags for discoverability
7. **dataSuggestions** - Array of 3-5 specific recommendations for incorporating external data sources

**CONTENT REQUIREMENTS:**
- Write in an expert, authoritative tone while remaining accessible
- Structure content with clear H2/H3 headings, bullet points, and logical flow
- Include actionable insights and practical takeaways
- Optimize for both human readers and search engines
- Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
- Do NOT include <h1> tags (title is separate)
- Integrate opportunities to showcase data-driven insights naturally

**OUTPUT FORMAT:**
Return ONLY valid JSON with this exact structure:
{
  "title": "Your SEO Title Here",
  "slug": "your-seo-slug-here",
  "description": "Your compelling meta description here...",
  "content": "<h2>First Section</h2><p>Content here...</p>...",
  "category": "Insights",
  "tags": ["tag1", "tag2", "tag3"],
  "dataSuggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}`;

export default function AIArticleGenerator({ onGenerated, onCancel }: AIArticleGeneratorProps) {
  const [rawContent, setRawContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const generateArticle = async () => {
    if (!rawContent.trim()) {
      setError('Please enter some content to transform');
      return;
    }

    if (rawContent.trim().length < 100) {
      setError('Please provide more content (at least 100 characters)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error('OpenAI API key not configured. Please add VITE_OPENAI_API_KEY to your environment.');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: `Transform this raw content into a complete blog article:\n\n${rawContent}` },
          ],
          temperature: 0.7,
          max_tokens: 8000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenAI API error:', errorData);

        if (response.status === 401) {
          throw new Error('Invalid API key');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content?.trim();

      if (!content) {
        throw new Error('No content returned from AI');
      }

      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }

      const parsed = JSON.parse(jsonMatch[0]) as GeneratedArticle;

      if (!parsed.title || !parsed.content) {
        throw new Error('Generated content is missing required fields');
      }

      setGeneratedArticle(parsed);
    } catch (err) {
      console.error('Article generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate article');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUseArticle = () => {
    if (generatedArticle) {
      onGenerated(generatedArticle);
    }
  };

  if (generatedArticle) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Article Generated</h3>
              <p className="text-sm text-gray-500">Review the generated content below</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setGeneratedArticle(null)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Start Over
            </button>
            <button
              onClick={handleUseArticle}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Use This Article
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Title</label>
                <button
                  onClick={() => copyToClipboard(generatedArticle.title, 'title')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'title' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-gray-900 font-medium">{generatedArticle.title}</p>
              <p className="text-xs text-gray-500 mt-1">{generatedArticle.title.length} characters</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">URL Slug</label>
                <button
                  onClick={() => copyToClipboard(generatedArticle.slug, 'slug')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'slug' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-gray-900 font-mono text-sm">/{generatedArticle.slug}/</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Meta Description</label>
                <button
                  onClick={() => copyToClipboard(generatedArticle.description, 'description')}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {copiedField === 'description' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-gray-700 text-sm">{generatedArticle.description}</p>
              <p className="text-xs text-gray-500 mt-1">{generatedArticle.description.length} characters</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Category</label>
              <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                {generatedArticle.category}
              </span>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <label className="text-sm font-semibold text-gray-700 block mb-2">Tags</label>
              <div className="flex flex-wrap gap-2">
                {generatedArticle.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4">
              <label className="text-sm font-semibold text-blue-800 block mb-2">
                External Data Suggestions
              </label>
              <ul className="space-y-2">
                {generatedArticle.dataSuggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                    <span className="text-blue-400 mt-0.5">*</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">Content Preview</label>
              <button
                onClick={() => copyToClipboard(generatedArticle.content, 'content')}
                className="text-gray-400 hover:text-gray-600"
              >
                {copiedField === 'content' ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div
              className="prose prose-sm max-w-none max-h-[600px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Article Generator</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Paste your raw content below and let AI transform it into a complete, SEO-optimized blog article
          with title, description, tags, and fully formatted content.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Raw Content Input
        </label>
        <textarea
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          placeholder="Paste your raw content, notes, or topic outline here...

Examples of what you can paste:
- Rough draft of an article
- Meeting notes or interview transcripts
- Bullet points on a topic
- Research findings or data summaries
- Topic ideas with key points to cover

The AI will transform this into a fully formatted, SEO-optimized blog article."
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-400"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">
            {rawContent.length} characters
          </p>
          <p className="text-sm text-gray-500">
            Minimum 100 characters recommended
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Generation Failed</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-600" />
          What the AI will generate:
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            SEO-optimized title (50-60 chars)
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Clean URL slug
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Meta description (150-160 chars)
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Category recommendation
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Full HTML content (1,500-2,500 words)
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            5-8 relevant tags
          </div>
          <div className="flex items-center gap-2 text-gray-700 col-span-2">
            <Check className="w-4 h-4 text-emerald-500" />
            External data integration suggestions for enhanced credibility
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={generateArticle}
          disabled={loading || rawContent.trim().length < 100}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Article...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Complete Article
            </>
          )}
        </button>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 rounded-full">
            <Loader2 className="w-5 h-5 text-amber-600 animate-spin" />
            <span className="text-amber-800 font-medium">
              Generating your article... This may take 20-40 seconds
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
