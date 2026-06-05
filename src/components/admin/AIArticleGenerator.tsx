import { useState } from 'react';
import { Sparkles, Loader2, Check, Copy, ArrowRight, FileText, AlertCircle, Search, Zap, Settings, ExternalLink, Image, RefreshCw } from 'lucide-react';

interface GeneratedArticle {
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  dataSuggestions: string[];
  image?: string;
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

interface AIArticleGeneratorProps {
  onGenerated: (article: GeneratedArticle) => void;
  onCancel: () => void;
}

type GenerationMode = 'quick' | 'advanced';
type GenerationStep = 'input' | 'researching' | 'research-review' | 'writing' | 'generating-image' | 'complete';

const SYSTEM_PROMPT = `You are an expert blog content creator and SEO specialist with deep knowledge of B2B data analytics, forecasting, and business intelligence.

**CRITICAL RULES:**
1. **ORIGINALITY FIRST**: If the user provides existing content (articles, tweets, notes), treat it as INSPIRATION ONLY. Extract the core topic and angle, but write completely original analysis with fresh insights. NEVER copy or closely paraphrase the input.
2. **USE PROVIDED RESEARCH**: Incorporate the research data provided, including statistics and findings. Always cite sources with hyperlinks.
3. **HYPERLINKED CITATIONS**: When citing statistics or claims, use HTML anchor tags with SHORT, DESCRIPTIVE source names (NOT "Source Name" literally). Use the publication or organization name, e.g.: <a href="URL" target="_blank" rel="noopener">Reuters</a>, <a href="URL" target="_blank" rel="noopener">Aluminum Association</a>, <a href="URL" target="_blank" rel="noopener">U.S. Geological Survey</a>. Keep link text concise (2-4 words max).

**YOUR TASK:** Generate a complete blog article package in JSON format including:

1. **title** - SEO-Optimized Title (50-60 characters, compelling and keyword-rich)
2. **slug** - URL Slug (SEO-friendly, lowercase, hyphens between words, no special characters)
3. **description** - Meta Description (150-160 characters, compelling with clear value proposition)
4. **content** - Article Content (1,500-2,500 words, well-structured HTML with H2/H3 headings, paragraphs, lists)
5. **category** - Single most appropriate category from: Resources, Insights, Case Studies, Tutorials, Documentation, News
6. **tags** - Array of 5-8 relevant lowercase tags for discoverability
7. **dataSuggestions** - Array of 3-5 specific recommendations for incorporating additional external data sources

**CONTENT REQUIREMENTS:**
- Write in an expert, authoritative tone while remaining accessible
- Structure content with clear H2/H3 headings, bullet points, and logical flow
- Include actionable insights and practical takeaways
- Weave in statistics naturally with inline hyperlinks to sources
- Use proper HTML formatting: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <a>
- Do NOT include <h1> tags (title is separate)
- Add a "Sources" section at the end with a list of all referenced URLs

**OUTPUT FORMAT:**
Return ONLY valid JSON with this exact structure:
{
  "title": "Your SEO Title Here",
  "slug": "your-seo-slug-here",
  "description": "Your compelling meta description here...",
  "content": "<h2>First Section</h2><p>Content with <a href='URL'>cited sources</a>...</p>...<h2>Sources</h2><ul><li><a href='URL'>Source 1</a></li>...</ul>",
  "category": "Insights",
  "tags": ["tag1", "tag2", "tag3"],
  "dataSuggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}`;

export default function AIArticleGenerator({ onGenerated, onCancel }: AIArticleGeneratorProps) {
  const [rawContent, setRawContent] = useState('');
  const [mode, setMode] = useState<GenerationMode>('quick');
  const [step, setStep] = useState<GenerationStep>('input');
  const [research, setResearch] = useState<ResearchResult | null>(null);
  const [editedResearch, setEditedResearch] = useState<ResearchResult | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<GeneratedArticle | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [generatingImage, setGeneratingImage] = useState(false);

  // Get Supabase URL/key for edge functions (anon key required by the functions gateway)
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const performResearch = async (topic: string): Promise<ResearchResult> => {
    const response = await fetch(`${supabaseUrl}/functions/v1/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ topic, context: rawContent }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Research failed: ${response.status}`);
    }

    return await response.json();
  };

  const generateImage = async (title: string, topic: string): Promise<string> => {
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        action: 'generate-image',
        imageTitle: title,
        imageTopic: topic,
      }),
    });

    if (!response.ok) {
      console.error('Image generation error:', await response.text());
      return '';
    }

    const data = await response.json();
    return data.url || '';
  };

  const generateArticle = async (researchData?: ResearchResult) => {
    // Call Supabase edge function (API key is stored server-side)
    const response = await fetch(`${supabaseUrl}/functions/v1/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({
        action: 'generate-article',
        rawContent,
        research: researchData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Article generation error:', errorData);
      throw new Error(errorData.error || `Generation failed: ${response.status}`);
    }

    const article = await response.json() as GeneratedArticle;

    if (!article.title || !article.content) {
      throw new Error('Generated content is missing required fields');
    }

    return article;
  };

  const handleQuickGenerate = async () => {
    if (!rawContent.trim() || rawContent.trim().length < 100) {
      setError('Please provide more content (at least 100 characters)');
      return;
    }

    setError(null);
    
    try {
      // Step 1: Research
      setStep('researching');
      const researchData = await performResearch(rawContent.substring(0, 500));
      setResearch(researchData);
      
      // Step 2: Generate article
      setStep('writing');
      const article = await generateArticle(researchData);
      
      // Step 3: Generate image
      setStep('generating-image');
      setGeneratingImage(true);
      const imageUrl = await generateImage(article.title, rawContent.substring(0, 200));
      if (imageUrl) {
        article.image = imageUrl;
      }
      setGeneratingImage(false);
      
      setGeneratedArticle(article);
      setStep('complete');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate article');
      setStep('input');
    }
  };

  const handleAdvancedResearch = async () => {
    if (!rawContent.trim() || rawContent.trim().length < 50) {
      setError('Please provide a topic or content (at least 50 characters)');
      return;
    }

    setError(null);
    setStep('researching');

    try {
      const researchData = await performResearch(rawContent.substring(0, 500));
      setResearch(researchData);
      setEditedResearch(researchData);
      setStep('research-review');
    } catch (err) {
      console.error('Research error:', err);
      setError(err instanceof Error ? err.message : 'Failed to perform research');
      setStep('input');
    }
  };

  const handleAdvancedGenerate = async () => {
    if (!editedResearch) return;

    setError(null);
    
    try {
      setStep('writing');
      const article = await generateArticle(editedResearch);
      
      // Generate image
      setStep('generating-image');
      setGeneratingImage(true);
      const imageUrl = await generateImage(article.title, rawContent.substring(0, 200));
      if (imageUrl) {
        article.image = imageUrl;
      }
      setGeneratingImage(false);
      
      setGeneratedArticle(article);
      setStep('complete');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate article');
      setStep('research-review');
    }
  };

  const handleRegenerateImage = async () => {
    if (!generatedArticle) return;
    
    setGeneratingImage(true);
    try {
      const imageUrl = await generateImage(generatedArticle.title, rawContent.substring(0, 200));
      if (imageUrl) {
        setGeneratedArticle({ ...generatedArticle, image: imageUrl });
      }
    } catch (err) {
      console.error('Image regeneration error:', err);
    }
    setGeneratingImage(false);
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

  const handleStartOver = () => {
    setStep('input');
    setResearch(null);
    setEditedResearch(null);
    setGeneratedArticle(null);
    setError(null);
  };

  // Research Review UI
  if (step === 'research-review' && editedResearch) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Research Complete</h3>
              <p className="text-sm text-gray-500">Review and edit the research before generating</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleStartOver}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Start Over
            </button>
            <button
              onClick={handleAdvancedGenerate}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
            >
              Write Article
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Summary */}
          <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Research Summary</label>
            <textarea
              value={editedResearch.summary}
              onChange={(e) => setEditedResearch({ ...editedResearch, summary: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Key Findings */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Key Findings</label>
            <textarea
              value={editedResearch.keyFindings.join('\n')}
              onChange={(e) => setEditedResearch({ ...editedResearch, keyFindings: e.target.value.split('\n').filter(f => f.trim()) })}
              rows={6}
              placeholder="One finding per line..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Statistics to Cite</label>
            <textarea
              value={editedResearch.statistics.join('\n')}
              onChange={(e) => setEditedResearch({ ...editedResearch, statistics: e.target.value.split('\n').filter(s => s.trim()) })}
              rows={6}
              placeholder="One statistic per line..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Recent Trends */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <label className="text-sm font-semibold text-gray-700 block mb-2">Recent Trends</label>
            <textarea
              value={editedResearch.recentTrends.join('\n')}
              onChange={(e) => setEditedResearch({ ...editedResearch, recentTrends: e.target.value.split('\n').filter(t => t.trim()) })}
              rows={4}
              placeholder="One trend per line..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          {/* Sources */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-4">
            <label className="text-sm font-semibold text-blue-800 block mb-2">Sources Found</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {editedResearch.sources.map((source, i) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <ExternalLink className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline truncate"
                  >
                    {source.title || source.url}
                  </a>
                </div>
              ))}
              {editedResearch.sources.length === 0 && (
                <p className="text-blue-600 text-sm italic">No sources found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Complete - Show Generated Article
  if (step === 'complete' && generatedArticle) {
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
              onClick={handleStartOver}
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
            {/* Featured Image */}
            {generatedArticle.image && (
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">AI-Generated Featured Image</label>
                  <button
                    onClick={handleRegenerateImage}
                    disabled={generatingImage}
                    className="flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700"
                  >
                    {generatingImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                    Regenerate
                  </button>
                </div>
                <img
                  src={generatedArticle.image}
                  alt="AI-generated featured image"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-xs text-gray-500 mt-2">You can replace this with your own image in the editor</p>
              </div>
            )}

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
                    <span className="text-blue-400 mt-0.5">•</span>
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
              className="prose prose-sm max-w-none max-h-[700px] overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
            />
          </div>
        </div>
      </div>
    );
  }

  // Loading States
  if (step === 'researching' || step === 'writing' || step === 'generating-image') {
    return (
      <div className="text-center py-16">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            {step === 'researching' && <Search className="w-8 h-8 text-white animate-pulse" />}
            {step === 'writing' && <Sparkles className="w-8 h-8 text-white animate-pulse" />}
            {step === 'generating-image' && <Image className="w-8 h-8 text-white animate-pulse" />}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {step === 'researching' && 'Researching...'}
              {step === 'writing' && 'Writing Article...'}
              {step === 'generating-image' && 'Generating Featured Image...'}
            </h3>
            <p className="text-gray-600">
              {step === 'researching' && 'Gathering current data, statistics, and sources with Perplexity'}
              {step === 'writing' && 'Creating your original article with GPT-5.2'}
              {step === 'generating-image' && 'Creating a custom featured image with Grok'}
            </p>
          </div>
          <Loader2 className="w-8 h-8 text-amber-500 animate-spin mt-4" />
          <p className="text-sm text-gray-500">This may take 30-60 seconds</p>
        </div>
      </div>
    );
  }

  // Input State
  return (
    <div className="space-y-6">
      <div className="text-center py-6">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Article Generator</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          Paste your topic, notes, or inspiration content below. The AI will research current data,
          write an original article, and generate a featured image.
        </p>
      </div>

      {/* Mode Toggle */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setMode('quick')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            mode === 'quick'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          Quick Mode
        </button>
        <button
          onClick={() => setMode('advanced')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
            mode === 'advanced'
              ? 'bg-amber-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Settings className="w-4 h-4" />
          Advanced Mode
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        {mode === 'quick' 
          ? 'Research → Write → Image in one click'
          : 'Review and edit research before writing'
        }
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Topic or Inspiration Content
        </label>
        <textarea
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          placeholder={`Paste your content here...

Examples:
• A topic you want to write about
• Notes from a meeting or research
• An article or tweet that inspired you (we'll write something original)
• Bullet points or an outline

The AI will:
1. Research current statistics and trends
2. Write an original, well-cited article
3. Generate a professional featured image`}
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 placeholder-gray-400"
        />
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-gray-500">
            {rawContent.length} characters
          </p>
          <p className="text-sm text-gray-500">
            Minimum {mode === 'quick' ? '100' : '50'} characters
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-medium">Error</p>
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
            Original, research-backed content
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Hyperlinked source citations
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            SEO-optimized title & description
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            AI-generated featured image
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Current statistics & trends
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Check className="w-4 h-4 text-emerald-500" />
            Sources section with URLs
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
        
        {mode === 'quick' ? (
          <button
            onClick={handleQuickGenerate}
            disabled={rawContent.trim().length < 100}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Zap className="w-5 h-5" />
            Generate Complete Article
          </button>
        ) : (
          <button
            onClick={handleAdvancedResearch}
            disabled={rawContent.trim().length < 50}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            <Search className="w-5 h-5" />
            Research First
          </button>
        )}
      </div>
    </div>
  );
}
