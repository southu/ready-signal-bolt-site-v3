import { useParams, useLocation, Link, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { getArticleBySlug } from '../../data/blogArticles';

export default function BlogArticle() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  
  // Get slug from URL params (for /blog/:slug routes) or from pathname (for root-level routes)
  const slug = paramSlug || location.pathname.replace(/^\/|\/$/g, '');
  
  // Look up the article by slug
  const article = slug ? getArticleBySlug(slug) : undefined;
  
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

  return (
    <>
      <SEO
        title={`${article.title} | Ready Signal`}
        description={article.description}
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/blog-and-resources/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <article>
            <div className="mb-8">
              <span className="inline-block bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {article.title}
              </h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedDate)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
              </div>
            </div>

            {article.image && (
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-2xl mb-8"
              />
            )}

            <div 
              className="prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-teal-600 prose-a:hover:text-teal-700 prose-a:no-underline hover:prose-a:underline
                prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6 prose-ul:text-gray-700 prose-ul:space-y-2
                prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-6 prose-ol:text-gray-700 prose-ol:space-y-2
                prose-li:text-gray-700
                prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8 prose-blockquote:text-teal-800
                prose-strong:font-semibold
                prose-img:rounded-lg prose-img:my-6
                prose-figure:my-6
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Forecasting?
            </h3>
            <p className="text-amber-50 mb-6">
              Discover how Ready Signal can help you harness the power of external data.
            </p>
            <Link
              to="/contact-us/"
              className="inline-block bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-all"
            >
              Get Started
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t-2 border-gray-200">
            <Link
              to="/blog-and-resources/"
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              View More Articles
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

