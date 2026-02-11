import { useLocation, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import SEO from '../../../components/SEO';
import { ArrowLeft, ChevronRight, BookOpen } from 'lucide-react';
import {
  forecastingArticles,
  getArticleBySlug,
  stripFrontmatter,
  type ForecastingArticle as ArticleType,
} from '../../../data/forecastingArticles';

/**
 * Custom link renderer that uses react-router Link for internal paths
 * and a standard <a> for external URLs.
 */
function MarkdownLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href && href.startsWith('/')) {
    return (
      <Link to={href} className="text-amber-600 hover:text-amber-700 underline underline-offset-2" {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-amber-600 hover:text-amber-700 underline underline-offset-2"
      {...props}
    >
      {children}
    </a>
  );
}

/** Sidebar navigation listing all 10 articles */
function ArticleSidebar({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="hidden xl:block w-64 flex-shrink-0">
      <div className="sticky top-28">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Forecasting Fundamentals
        </h3>
        <ul className="space-y-1">
          {forecastingArticles.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/${a.slug}/`}
                className={`block text-sm px-3 py-2 rounded-lg transition-colors ${
                  a.slug === currentSlug
                    ? 'bg-amber-50 text-amber-700 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/** Next / previous article navigation */
function ArticleNavigation({ current }: { current: ArticleType }) {
  const idx = forecastingArticles.findIndex((a) => a.slug === current.slug);
  const prev = idx > 0 ? forecastingArticles[idx - 1] : null;
  const next = idx < forecastingArticles.length - 1 ? forecastingArticles[idx + 1] : null;

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-12">
      {prev ? (
        <Link
          to={`/${prev.slug}/`}
          className="flex-1 flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-amber-500 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Previous</p>
            <p className="text-sm font-medium text-gray-900 group-hover:text-amber-600 truncate">
              {prev.title}
            </p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next && (
        <Link
          to={`/${next.slug}/`}
          className="flex-1 flex items-center justify-end gap-3 p-4 border border-gray-200 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all group text-right"
        >
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Next</p>
            <p className="text-sm font-medium text-gray-900 group-hover:text-amber-600 truncate">
              {next.title}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-amber-500 flex-shrink-0" />
        </Link>
      )}
    </div>
  );
}

export default function ForecastingArticle() {
  const location = useLocation();
  // Extract slug from pathname: strip leading/trailing slashes
  const slug = location.pathname.replace(/^\/|\/$/g, '');
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/help-center/" replace />;
  }

  const markdownContent = stripFrontmatter(article.content);

  return (
    <>
      <SEO
        title={`${article.title} | Forecasting Fundamentals | Ready Signal`}
        description={article.description}
        image={`/images/forecasting/${article.image}`}
        type="article"
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/help-center/" className="hover:text-amber-600 transition-colors">
              Help Center
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/help-center/" className="hover:text-amber-600 transition-colors">
              Forecasting Fundamentals
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">{article.title}</span>
          </nav>

          <div className="flex gap-10">
            {/* Sidebar */}
            <ArticleSidebar currentSlug={article.slug} />

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Hero / header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-amber-600">
                    Forecasting Fundamentals
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                  {article.title}
                </h1>
                <p className="text-lg text-gray-600">{article.description}</p>
              </div>

              {/* Article image */}
              <div className="mb-8 rounded-2xl overflow-hidden border-2 border-gray-200">
                <img
                  src={`/images/forecasting/${article.image}`}
                  alt={article.title}
                  className="w-full h-auto"
                  loading="eager"
                />
              </div>

              {/* Article body */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 sm:p-8 lg:p-10">
                <div className="prose prose-gray prose-lg max-w-none
                  prose-headings:font-bold prose-headings:text-gray-900
                  prose-h1:hidden
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-100
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-2
                  prose-p:text-gray-700 prose-p:leading-relaxed
                  prose-li:text-gray-700
                  prose-strong:text-gray-900
                  prose-blockquote:border-l-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                  prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
                  prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl
                  prose-table:text-sm
                  prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2
                  prose-td:px-4 prose-td:py-2 prose-td:border-gray-200
                ">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: MarkdownLink,
                    }}
                  >
                    {markdownContent}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Prev / Next navigation */}
              <ArticleNavigation current={article} />

              {/* Back to Help Center */}
              <div className="mt-8 text-center">
                <Link
                  to="/help-center/"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
