import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useArticleBySlug } from '../../hooks/useArticles';

// Custom styles for blog content elements
const blogStyles = `
  .blog-content .download-card {
    background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
    border: 2px solid #10b981;
    border-radius: 12px;
    padding: 1.5rem;
    margin: 1.5rem 0;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .blog-content .download-card::before {
    content: '📥';
    font-size: 2rem;
  }
  
  .blog-content .download-button {
    background: #10b981;
    color: white !important;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none !important;
    display: inline-block;
    transition: all 0.2s;
  }
  
  .blog-content .download-button:hover {
    background: #059669;
    transform: translateY(-1px);
  }
  
  .blog-content iframe {
    width: 100%;
    border-radius: 12px;
    margin: 1.5rem 0;
    aspect-ratio: 16/9;
  }
  
  .blog-content img {
    border-radius: 12px;
    margin: 1.5rem 0;
    max-width: 100%;
    height: auto;
  }
  
  .blog-content ul {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
  
  .blog-content ul li {
    margin: 0.5rem 0;
    color: #374151;
    line-height: 1.7;
  }
  
  .blog-content ol {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
  
  .blog-content ol li {
    margin: 0.5rem 0;
    color: #374151;
    line-height: 1.7;
  }
  
  .blog-content p {
    margin: 1.25rem 0;
    line-height: 1.8;
    color: #374151;
  }
  
  .blog-content h2 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #111827;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
    line-height: 1.3;
  }
  
  .blog-content h3 {
    font-size: 1.35rem;
    font-weight: 600;
    color: #1f2937;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    line-height: 1.4;
  }
  
  .blog-content a {
    color: #0d9488;
    text-decoration: none;
    font-weight: 500;
  }
  
  .blog-content a:hover {
    color: #0f766e;
    text-decoration: underline;
  }
  
  .blog-content strong {
    font-weight: 600;
    color: #111827;
  }
  
  .blog-content blockquote {
    border-left: 4px solid #f59e0b;
    background: #fffbeb;
    padding: 1.5rem;
    margin: 1.5rem 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: #92400e;
  }
  
  .blog-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    border-radius: 8px;
    overflow: hidden;
  }
  
  .blog-content th,
  .blog-content td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem 1rem;
    text-align: left;
  }
  
  .blog-content th {
    background: #f3f4f6;
    font-weight: 600;
    color: #111827;
  }
  
  .blog-content tr:nth-child(even) {
    background: #f9fafb;
  }
  
  .blog-content pre,
  .blog-content code {
    background: #1f2937;
    color: #f3f4f6;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
    font-family: 'Monaco', 'Consolas', monospace;
    font-size: 0.9rem;
  }
  
  .blog-content code {
    padding: 0.2rem 0.4rem;
    font-size: 0.85em;
  }
`;

export default function BlogArticle() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Get slug from URL params (for /blog/:slug routes) or from pathname (for root-level routes)
  const slug = paramSlug || location.pathname.replace(/^\/|\/$/g, '');

  // Fetch the article by slug from Supabase (or fallback to static data)
  const { article, loading, error } = useArticleBySlug(slug);

  // Show loading state
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // If article not found, redirect to blog listing
  if (!article) {
    return <Navigate to="/blog-and-resources/" replace />;
  }

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Keep legacy video-example article pointing at the updated R docs page,
  // regardless of whether article HTML is loaded from Supabase or static fallback.
  const renderedContent =
    article.slug === 'ready-signal-api-documentation-r-3-6-video-example'
      ? article.content
          .replace(
            /https:\/\/help\.readysignal\.com\/ready-signal-api-documentation-r/g,
            'https://www.readysignal.com/ready-signal-api-documentation-r-3-6/'
          )
          .replace(
            /https:\/\/www\.readysignal\.com\/ready-signal-api-documentation-r-3-6-video-example\//g,
            'https://www.readysignal.com/ready-signal-api-documentation-r-3-6/'
          )
      : article.content;

  return (
    <>
      <SEO
        title={`${article.title} | Ready Signal`}
        description={article.description}
      />
      <Navbar />
      
      {/* Inject custom styles */}
      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/blog-and-resources/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            {/* Article Header */}
            <header className="mb-10">
              <span className="inline-block bg-amber-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-400" />
                  <span>{article.author}</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {article.image && (
              <div className="mb-10">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div 
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />
          </article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 md:p-10 text-center shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Forecasting?
            </h3>
            <p className="text-amber-50 mb-6 text-lg max-w-2xl mx-auto">
              Discover how Ready Signal can help you harness the power of external data for more accurate predictions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-md"
              >
                Get Started Free
              </a>
              <a
                href="https://app.readysignal.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-amber-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-800 transition-all"
              >
                Log In
              </a>
            </div>
          </div>

          {/* More Articles Link */}
          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <Link
              to="/blog-and-resources/"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              View More Articles
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
