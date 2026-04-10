import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Lock, Unlock, AlertTriangle } from 'lucide-react';
import { Article, fetchCategories, fetchTags, isSupabaseConfigured, generateAudioForArticle } from '../lib/supabaseArticles';
import { useAllArticles, useArticleOperations } from '../hooks/useArticles';
import ArticleList from '../components/admin/ArticleList';
import ArticleEditor from '../components/admin/ArticleEditor';
import DeleteConfirmDialog from '../components/admin/DeleteConfirmDialog';

const ADMIN_PASSWORD = 'readysignal2026';

type View = 'list' | 'new' | 'edit';

export default function AdminBlog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [view, setView] = useState<View>('list');
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [deleteArticle, setDeleteArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  // Hooks for data
  const { articles, loading, refresh } = useAllArticles();
  const { create, update, remove, saving, deleting } = useArticleOperations();

  // Check Supabase configuration
  const supabaseReady = isSupabaseConfigured();

  // Check for saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-blog-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load categories and tags
  useEffect(() => {
    if (isAuthenticated && supabaseReady) {
      fetchCategories().then(setCategories);
      fetchTags().then(setTags);
    }
  }, [isAuthenticated, supabaseReady]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('admin-blog-auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-blog-auth');
  };

  const handleNewArticle = () => {
    setEditingArticle(null);
    setView('new');
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setView('edit');
  };

  const handleDeleteArticle = (article: Article) => {
    setDeleteArticle(article);
  };

  const confirmDelete = async () => {
    if (!deleteArticle?.id) return;
    
    try {
      await remove(deleteArticle.id);
      setDeleteArticle(null);
      await refresh();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSaveArticle = async (articleData: Omit<Article, 'id'> | Partial<Article>) => {
    try {
      if (view === 'edit' && editingArticle?.id) {
        await update(editingArticle.id, articleData);
      } else {
        await create(articleData as Omit<Article, 'id'>);
      }
      await refresh();
      setView('list');
      setEditingArticle(null);
    } catch (err) {
      console.error('Save failed:', err);
      alert('Failed to save article. Please try again.');
    }
  };

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Stop polling when articles update with a non-generating status
  useEffect(() => {
    if (pollRef.current) {
      const anyGenerating = articles.some(a => a.audioStatus === 'generating');
      if (!anyGenerating) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    }
  }, [articles]);

  const handleGenerateAudio = async (article: Article, voice: string) => {
    if (!article.id) return;
    try {
      await generateAudioForArticle(article.id, voice);
    } catch (err) {
      // Gateway timeout is expected for long articles — the function may still
      // be running server-side. Don't alert, just let polling handle it.
      console.log('Audio generation call returned (may still be processing):', err);
    }
    // Always refresh and start polling to catch completion
    await refresh();
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => refresh(), 5000);
    setTimeout(() => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } }, 300000);
  };

  const handleCancelEdit = () => {
    setView('list');
    setEditingArticle(null);
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Admin - Blog Management | Ready Signal" description="" />
        <Navbar />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-center text-white mb-2">
                Blog Admin
              </h1>
              <p className="text-gray-300 text-center mb-6">
                Enter password to access blog management
              </p>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-gray-400"
                />
                {error && (
                  <p className="text-red-400 text-sm mb-4">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                >
                  Access Admin
                </button>
              </form>
              
              <Link
                to="/"
                className="block text-center text-gray-400 hover:text-white mt-4 text-sm transition-colors"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Admin dashboard
  return (
    <>
      <SEO title="Admin - Blog Management | Ready Signal" description="" />
      <Navbar />
      
      <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
              <p className="text-gray-600 mt-1">
                {view === 'list' && 'Manage your blog articles'}
                {view === 'new' && 'Create a new article'}
                {view === 'edit' && 'Editing article'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Unlock className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Supabase Warning */}
          {!supabaseReady && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 font-medium">Supabase Not Configured</p>
                <p className="text-amber-700 text-sm mt-1">
                  The admin panel is in read-only mode. To enable editing, configure the Supabase environment variables 
                  (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY) and run the database migration.
                </p>
              </div>
            </div>
          )}

          {/* Main Content */}
          {view === 'list' && (
            <ArticleList
              articles={articles}
              loading={loading}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
              onNew={handleNewArticle}
              onGenerateAudio={handleGenerateAudio}
            />
          )}

          {(view === 'new' || view === 'edit') && (
            <ArticleEditor
              article={editingArticle}
              existingCategories={categories}
              existingTags={tags}
              isSaving={saving}
              onSave={handleSaveArticle}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Delete Confirmation Dialog */}
          <DeleteConfirmDialog
            article={deleteArticle}
            isOpen={!!deleteArticle}
            isDeleting={deleting}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteArticle(null)}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}
