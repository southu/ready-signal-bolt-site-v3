import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Save, Eye, Send, FileText, X, Sparkles } from 'lucide-react';
import { Article, generateSlug, isSlugUnique } from '../../lib/supabaseArticles';
import RichTextEditor from './RichTextEditor';
import AIEnhanceButton from './AIEnhanceButton';
import SEOAnalyzer from './SEOAnalyzer';
import AIArticleGenerator from './AIArticleGenerator';

interface ArticleEditorProps {
  article?: Article | null;
  existingCategories: string[];
  existingTags: string[];
  isSaving: boolean;
  onSave: (article: Omit<Article, 'id'> | Partial<Article>) => void;
  onCancel: () => void;
}

const DEFAULT_ARTICLE: Omit<Article, 'id'> = {
  slug: '',
  title: '',
  description: '',
  author: 'Ready Signal Team',
  publishedDate: new Date().toISOString().split('T')[0],
  category: 'Resources',
  tags: [],
  image: '',
  content: '',
  status: 'draft',
};

export default function ArticleEditor({
  article,
  existingCategories,
  existingTags,
  isSaving,
  onSave,
  onCancel,
}: ArticleEditorProps) {
  const isEditing = !!article?.id;
  const [formData, setFormData] = useState<Omit<Article, 'id'>>({
    ...DEFAULT_ARTICLE,
    ...article,
  });
  const [slugError, setSlugError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'preview' | 'seo'>(isEditing ? 'edit' : 'generate');
  const [tagInput, setTagInput] = useState('');
  const [dataSuggestions, setDataSuggestions] = useState<string[]>([]);

  // Update form data when article prop changes
  useEffect(() => {
    if (article) {
      setFormData({
        slug: article.slug,
        title: article.title,
        description: article.description,
        author: article.author,
        publishedDate: article.publishedDate,
        modifiedDate: article.modifiedDate,
        category: article.category,
        tags: article.tags,
        image: article.image || '',
        content: article.content,
        status: article.status,
      });
    } else {
      setFormData(DEFAULT_ARTICLE);
    }
  }, [article]);

  // Auto-generate slug from title for new articles
  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      // Only auto-generate slug for new articles
      slug: isEditing ? prev.slug : generateSlug(title),
    }));
  };

  // Validate slug uniqueness
  const handleSlugChange = async (slug: string) => {
    const cleanSlug = generateSlug(slug);
    setFormData(prev => ({ ...prev, slug: cleanSlug }));
    
    if (cleanSlug.length > 0) {
      const isUnique = await isSlugUnique(cleanSlug, article?.id);
      setSlugError(isUnique ? null : 'This slug is already in use');
    } else {
      setSlugError(null);
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tagToRemove),
    }));
  };

  const handleSubmit = (status: 'draft' | 'published') => {
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }
    if (!formData.slug.trim()) {
      alert('Please enter a slug');
      return;
    }
    if (!formData.content.trim()) {
      alert('Please enter some content');
      return;
    }
    if (slugError) {
      alert('Please fix the slug error');
      return;
    }

    onSave({
      ...formData,
      status,
      modifiedDate: new Date().toISOString().split('T')[0],
    });
  };

  // Category suggestions
  const categorySuggestions = useMemo(() => {
    const defaults = ['Resources', 'Insights', 'Case Studies', 'Tutorials', 'Documentation', 'News', 'Help'];
    const all = new Set([...defaults, ...existingCategories]);
    return Array.from(all).sort();
  }, [existingCategories]);

  // Tag suggestions
  const tagSuggestions = useMemo(() => {
    return existingTags.filter(t => !formData.tags.includes(t)).slice(0, 10);
  }, [existingTags, formData.tags]);

  // Handle AI-generated article
  const handleGeneratedArticle = (generated: {
    title: string;
    slug: string;
    description: string;
    content: string;
    category: string;
    tags: string[];
    dataSuggestions: string[];
  }) => {
    setFormData(prev => ({
      ...prev,
      title: generated.title,
      slug: generated.slug,
      description: generated.description,
      content: generated.content,
      category: generated.category,
      tags: generated.tags,
    }));
    setDataSuggestions(generated.dataSuggestions);
    setActiveTab('edit');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Article' : 'New Article'}
          </h2>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        {!isEditing && (
          <button
            type="button"
            onClick={() => setActiveTab('generate')}
            className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === 'generate'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Generate
          </button>
        )}
        <button
          type="button"
          onClick={() => setActiveTab('edit')}
          className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'edit'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'preview'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
            activeTab === 'seo'
              ? 'border-amber-500 text-amber-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          SEO Analysis
        </button>
      </div>

      {/* AI Generate Tab */}
      {activeTab === 'generate' && (
        <AIArticleGenerator
          onGenerated={handleGeneratedArticle}
          onCancel={onCancel}
        />
      )}

      {/* Edit Tab */}
      {activeTab === 'edit' && (
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content Column */}
          <div className="col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Title *
                </label>
                <AIEnhanceButton
                  type="title"
                  value={formData.title}
                  onEnhanced={(enhanced) => setFormData(prev => ({ ...prev, title: enhanced }))}
                />
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter article title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
              />
            </div>

            {/* Slug */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL Slug *
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleSlugChange(e.target.value)}
                  placeholder="article-url-slug"
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono ${
                    slugError ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <span className="text-gray-400">/</span>
              </div>
              {slugError && (
                <p className="text-red-500 text-sm mt-1">{slugError}</p>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Description (for SEO)
                </label>
                <AIEnhanceButton
                  type="description"
                  value={formData.description}
                  context={{ title: formData.title, content: formData.content }}
                  onEnhanced={(enhanced) => setFormData(prev => ({ ...prev, description: enhanced }))}
                />
              </div>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description for search engines (160 chars recommended)..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.description.length} / 160 characters
              </p>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Content *
                </label>
                <AIEnhanceButton
                  type="content"
                  value={formData.content}
                  context={{ title: formData.title, description: formData.description }}
                  onEnhanced={(enhanced) => setFormData(prev => ({ ...prev, content: enhanced }))}
                />
              </div>
              <RichTextEditor
                value={formData.content}
                onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                placeholder="Write your article content in HTML..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Status
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    formData.status === 'draft'
                      ? 'bg-amber-100 text-amber-800 border-2 border-amber-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  Draft
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    formData.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500'
                      : 'bg-gray-100 text-gray-600 border-2 border-transparent'
                  }`}
                >
                  Published
                </button>
              </div>
            </div>

            {/* Author & Date */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publish Date
                </label>
                <input
                  type="date"
                  value={formData.publishedDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, publishedDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Category */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {categorySuggestions.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              {tagSuggestions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Suggestions:</p>
                  <div className="flex flex-wrap gap-1">
                    {tagSuggestions.map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }))}
                        className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Featured Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="/blog-images/slug/image.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
              />
              {formData.image && (
                <div className="mt-3">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* AI Data Suggestions */}
            {dataSuggestions.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
                <label className="block text-sm font-semibold text-blue-800 mb-3">
                  External Data Suggestions
                </label>
                <p className="text-xs text-blue-600 mb-3">
                  Consider adding these data sources to strengthen your article:
                </p>
                <ul className="space-y-2">
                  {dataSuggestions.map((suggestion, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-700">
                      <span className="text-blue-400 mt-0.5">*</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-8 max-w-4xl mx-auto">
            <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
              {formData.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {formData.title || 'Untitled Article'}
            </h1>
            <p className="text-gray-600 mb-6">
              {formData.author} • {formData.publishedDate}
            </p>
            {formData.image && (
              <img
                src={formData.image}
                alt={formData.title}
                className="w-full h-64 object-cover rounded-xl mb-8"
              />
            )}
            {formData.content ? (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: formData.content }}
              />
            ) : (
              <p className="text-gray-400 italic">No content yet...</p>
            )}
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === 'seo' && (
        <SEOAnalyzer
          title={formData.title}
          description={formData.description}
          content={formData.content}
          slug={formData.slug}
          onUpdateTitle={(title) => setFormData(prev => ({ ...prev, title }))}
          onUpdateDescription={(description) => setFormData(prev => ({ ...prev, description }))}
        />
      )}
    </div>
  );
}

