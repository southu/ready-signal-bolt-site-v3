import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Edit2, Trash2, ExternalLink, Filter, Plus, Volume2, Loader2, AlertCircle } from 'lucide-react';
import { Article } from '../../lib/supabaseArticles';

const VOICES = [
  { id: 'nova', label: 'Nova', desc: 'Bright, energetic' },
  { id: 'coral', label: 'Coral', desc: 'Professional' },
  { id: 'onyx', label: 'Onyx', desc: 'Authoritative' },
  { id: 'shimmer', label: 'Shimmer', desc: 'Upbeat' },
  { id: 'ash', label: 'Ash', desc: 'Soft, steady' },
  { id: 'ballad', label: 'Ballad', desc: 'Warm, melodic' },
  { id: 'echo', label: 'Echo', desc: 'Neutral' },
  { id: 'fable', label: 'Fable', desc: 'Storytelling' },
  { id: 'sage', label: 'Sage', desc: 'Calm, wise' },
  { id: 'alloy', label: 'Alloy', desc: 'Balanced' },
];

interface ArticleListProps {
  articles: Article[];
  loading: boolean;
  onEdit: (article: Article) => void;
  onDelete: (article: Article) => void;
  onNew: () => void;
  onGenerateAudio: (article: Article, voice: string) => void;
}

export default function ArticleList({
  articles,
  loading,
  onEdit,
  onDelete,
  onNew,
  onGenerateAudio,
}: ArticleListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [audioMenuArticleId, setAudioMenuArticleId] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState('nova');
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());
  const audioMenuRef = useRef<HTMLDivElement>(null);

  // Clear local generating state when articles refresh with updated status
  useEffect(() => {
    setGeneratingIds(prev => {
      const updated = new Set(prev);
      for (const id of prev) {
        const article = articles.find(a => a.id === id);
        if (article && article.audioStatus !== 'generating') {
          updated.delete(id);
        }
      }
      return updated.size !== prev.size ? updated : prev;
    });
  }, [articles]);

  // Close voice dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (audioMenuRef.current && !audioMenuRef.current.contains(e.target as Node)) {
        setAudioMenuArticleId(null);
      }
    }
    if (audioMenuArticleId) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [audioMenuArticleId]);

  // Get unique categories from articles
  const categories = useMemo(() => {
    const cats = new Set(articles.map(a => a.category));
    return Array.from(cats).sort();
  }, [articles]);

  // Filter articles based on search and filters
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = !searchTerm ||
        article.title.toLowerCase().includes(searchLower) ||
        article.slug.toLowerCase().includes(searchLower) ||
        article.author.toLowerCase().includes(searchLower) ||
        article.description.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || article.status === statusFilter;

      // Category filter
      const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [articles, searchTerm, statusFilter, categoryFilter]);

  // Stats
  const stats = useMemo(() => {
    const published = articles.filter(a => a.status === 'published').length;
    const draft = articles.filter(a => a.status === 'draft').length;
    return { total: articles.length, published, draft };
  }, [articles]);

  const handleAudioClick = (article: Article) => {
    const isGenerating = generatingIds.has(article.id!) || (article.audioStatus === 'generating');
    if (isGenerating) return;
    setAudioMenuArticleId(audioMenuArticleId === article.id ? null : article.id!);
    if (article.audioVoice) setSelectedVoice(article.audioVoice);
  };

  const handleGenerate = (article: Article) => {
    setAudioMenuArticleId(null);
    setGeneratingIds(prev => new Set(prev).add(article.id!));
    onGenerateAudio(article, selectedVoice);
  };

  function getAudioButton(article: Article) {
    const isGenerating = generatingIds.has(article.id!) || (article.audioStatus === 'generating');

    if (isGenerating) {
      return (
        <button
          disabled
          className="p-2 text-amber-500 rounded-lg cursor-not-allowed"
          title="Generating audio..."
        >
          <Loader2 className="w-4 h-4 animate-spin" />
        </button>
      );
    }

    const status = article.audioStatus || 'none';

    if (status === 'completed') {
      return (
        <button
          onClick={() => handleAudioClick(article)}
          className="relative p-2 text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
          title={`Audio ready (${article.audioVoice || 'nova'})`}
        >
          <Volume2 className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full" />
        </button>
      );
    }

    if (status === 'failed') {
      return (
        <button
          onClick={() => handleAudioClick(article)}
          className="relative p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Audio generation failed — click to retry"
        >
          <AlertCircle className="w-4 h-4" />
        </button>
      );
    }

    // status === 'none'
    return (
      <button
        onClick={() => handleAudioClick(article)}
        className="p-2 text-gray-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
        title="Generate audio narration"
      >
        <Volume2 className="w-4 h-4" />
      </button>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Articles</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold text-amber-600">{stats.draft}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-gray-400" />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* New Article Button */}
          <button
            onClick={onNew}
            className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-md"
          >
            <Plus className="w-4 h-4" />
            New Article
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading articles...</p>
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Author</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredArticles.map((article) => (
                  <tr key={article.id || article.slug} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 line-clamp-1">
                          {article.title}
                        </span>
                        <code className="text-xs text-gray-500 mt-1">
                          /{article.slug}/
                        </code>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        article.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {article.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(article.publishedDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 relative">
                        {/* Audio button */}
                        {article.id && getAudioButton(article)}

                        {/* Voice selector dropdown */}
                        {audioMenuArticleId === article.id && (
                          <div
                            ref={audioMenuRef}
                            className="absolute right-0 top-full mt-1 z-50 bg-white rounded-xl border border-gray-200 shadow-xl p-4 w-64"
                          >
                            <p className="text-sm font-semibold text-gray-900 mb-2">
                              {article.audioStatus === 'completed' ? 'Regenerate Audio' : 'Generate Audio'}
                            </p>
                            <select
                              value={selectedVoice}
                              onChange={(e) => setSelectedVoice(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                              {VOICES.map(v => (
                                <option key={v.id} value={v.id}>
                                  {v.label} — {v.desc}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleGenerate(article)}
                              className="w-full bg-rs-cyan text-white py-2 rounded-lg text-sm font-semibold hover:bg-rs-cyan/90 transition-colors"
                            >
                              Generate Audio
                            </button>
                            {article.audioStatus === 'completed' && article.audioUrl && (
                              <a
                                href={article.audioUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-center text-xs text-gray-500 hover:text-gray-700 mt-2"
                              >
                                Preview current audio
                              </a>
                            )}
                          </div>
                        )}

                        <a
                          href={`/${article.slug}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                          title="View Live"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => onEdit(article)}
                          className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(article)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results count */}
      {!loading && filteredArticles.length > 0 && (
        <p className="text-sm text-gray-500 text-center">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>
      )}
    </div>
  );
}
