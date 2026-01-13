import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Lock, Unlock, Copy, Check, Eye, Code, FileText, ArrowLeft } from 'lucide-react';
import { blogArticles, BlogArticle } from '../data/blogArticles';

const ADMIN_PASSWORD = 'readysignal2026'; // Simple password for internal use

export default function AdminBlog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'articles' | 'template' | 'preview'>('articles');
  const [previewArticle, setPreviewArticle] = useState<BlogArticle | null>(null);

  // Check for saved auth state
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin-blog-auth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

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

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const articleTemplate = `{
  slug: "your-article-slug",
  title: "Your Article Title",
  description: "A brief description for SEO (160 chars max)",
  author: "Your Name",
  publishedDate: "${new Date().toISOString().split('T')[0]}",
  category: "Resources",
  tags: ["forecasting", "data-science"],
  image: "/blog-images/your-slug/featured-image.png",
  content: \`
    <p>Your first paragraph here...</p>
    
    <h2>Section Heading</h2>
    <p>More content...</p>
    
    <ul>
      <li>Bullet point 1</li>
      <li>Bullet point 2</li>
    </ul>
    
    <blockquote>
      <p>A highlighted quote or callout</p>
    </blockquote>
    
    <h2>Another Section</h2>
    <p>Final content...</p>
  \`
}`;

  // Login screen
  if (!isAuthenticated) {
    return (
      <>
        <SEO title="Admin - Blog Management | Ready Signal" description="" />
        <Navbar />
        <div className="pt-20 min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center">
          <div className="max-w-md w-full mx-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mx-auto mb-6">
                <Lock className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
                Blog Admin
              </h1>
              <p className="text-gray-600 text-center mb-6">
                Enter password to access blog management
              </p>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Access Admin
                </button>
              </form>
              
              <Link
                to="/"
                className="block text-center text-gray-500 hover:text-gray-700 mt-4 text-sm"
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Admin</h1>
              <p className="text-gray-600 mt-1">Manage and add blog articles</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              <Unlock className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('articles')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'articles'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              All Articles ({blogArticles.length})
            </button>
            <button
              onClick={() => setActiveTab('template')}
              className={`flex items-center gap-2 px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === 'template'
                  ? 'border-amber-500 text-amber-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Code className="w-4 h-4" />
              Add New Article
            </button>
            {previewArticle && (
              <button
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
            )}
          </div>

          {/* Articles List */}
          {activeTab === 'articles' && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Title</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Slug</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Category</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {blogArticles.map((article) => (
                      <tr key={article.slug} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-900 line-clamp-1">
                            {article.title}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                            /{article.slug}/
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs font-medium">
                            {article.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {article.publishedDate}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              to={`/${article.slug}/`}
                              target="_blank"
                              className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                            >
                              View
                            </Link>
                            <button
                              onClick={() => {
                                setPreviewArticle(article);
                                setActiveTab('preview');
                              }}
                              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                            >
                              Preview
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Add New Article Template */}
          {activeTab === 'template' && (
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">How to Add a New Article</h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Copy the template below</li>
                  <li>Open <code className="bg-gray-100 px-2 py-1 rounded text-sm">src/data/blogArticles.ts</code></li>
                  <li>Add your article to the <code className="bg-gray-100 px-2 py-1 rounded text-sm">blogArticles</code> array</li>
                  <li>If you have images, add them to <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/blog-images/your-slug/</code></li>
                  <li>Save the file - the article will be live immediately</li>
                </ol>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Article Template</h2>
                  <button
                    onClick={() => copyToClipboard(articleTemplate, 'template')}
                    className="flex items-center gap-2 text-sm bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    {copied === 'template' ? (
                      <>
                        <Check className="w-4 h-4 text-green-600" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Template
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{articleTemplate}</code>
                </pre>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">HTML Content Guidelines</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Supported HTML Tags</h3>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li><code className="bg-gray-100 px-1 rounded">&lt;h2&gt;</code> - Section headings</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;h3&gt;</code> - Subsection headings</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;p&gt;</code> - Paragraphs</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;ul&gt;/&lt;ol&gt;</code> - Lists</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;blockquote&gt;</code> - Callouts</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;strong&gt;</code> - Bold text</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;a href=""&gt;</code> - Links</li>
                      <li><code className="bg-gray-100 px-1 rounded">&lt;img&gt;</code> - Images</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Image Example</h3>
                    <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`<img 
  src="/blog-images/your-slug/image.png" 
  alt="Description" 
/>`}
                    </pre>
                    <p className="text-gray-600 text-sm mt-2">
                      Images should be placed in <code className="bg-gray-100 px-1 rounded">public/blog-images/[slug]/</code>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h2 className="text-lg font-bold text-amber-800 mb-2">Categories</h2>
                <p className="text-amber-700 mb-3">Use one of these categories:</p>
                <div className="flex flex-wrap gap-2">
                  {['Resources', 'Insights', 'Case Studies', 'Tutorials', 'Documentation', 'News'].map((cat) => (
                    <span key={cat} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {activeTab === 'preview' && previewArticle && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Preview: {previewArticle.title}</h2>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Articles
                </button>
              </div>
              <div className="p-8">
                <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                  {previewArticle.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{previewArticle.title}</h1>
                <p className="text-gray-600 mb-6">{previewArticle.author} • {previewArticle.publishedDate}</p>
                {previewArticle.image && (
                  <img
                    src={previewArticle.image}
                    alt={previewArticle.title}
                    className="w-full h-64 object-cover rounded-xl mb-8"
                  />
                )}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: previewArticle.content }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

