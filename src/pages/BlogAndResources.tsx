import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { BookOpen, TrendingUp, FileText, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogArticles, getRecentArticles } from '../data/blogArticles';

const ARTICLES_PER_PAGE = 12;

// Get unique categories from articles
const allCategories = [...new Set(blogArticles.map(a => a.category))];

export default function BlogAndResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter articles based on search and category
  const filteredArticles = useMemo(() => {
    return blogArticles.filter(article => {
      const matchesSearch = searchQuery === '' || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === null || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Featured articles (most recent 3)
  const featuredArticles = getRecentArticles(3);

  // Get a stock image based on category
  const getCategoryImage = (category: string, title: string) => {
    const images: Record<string, string> = {
      'Resources': 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Insights': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Case Studies': 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Tutorials': 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
      'Documentation': 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
      'News': 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800',
    };
    return images[category] || images['Resources'];
  };

  return (
    <>
      <SEO
        title="Blog and Resources | Ready Signal"
        description="Free resources for today's analysts & data scientists to dive into new challenges & keep up with today's current industry news."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Blog and Resources
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Free resources for today's analysts & data scientists to dive into new challenges & keep up with today's current industry news
              </p>
              
              {/* Search Bar */}
              <div className="max-w-xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => handleCategoryChange(null)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === null
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({blogArticles.length})
              </button>
              {allCategories.map((category) => {
                const count = blogArticles.filter(a => a.category === category).length;
                return (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Featured Articles (only show when no filters) */}
        {!searchQuery && !selectedCategory && currentPage === 1 && (
          <section className="py-12 bg-gradient-to-br from-amber-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/${article.slug}/`}
                    className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-amber-300 transition-all hover:shadow-xl group block"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image || getCategoryImage(article.category, article.title)}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {article.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{article.publishedDate}</span>
                        <span className="text-amber-600 font-semibold flex items-center gap-1">
                          Read More
                          <TrendingUp className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {searchQuery || selectedCategory ? 'Search Results' : 'All Articles'}
                <span className="text-gray-500 font-normal ml-2">({filteredArticles.length})</span>
              </h2>
            </div>

            {filteredArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(null);
                  }}
                  className="text-amber-600 font-semibold hover:text-amber-700"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {paginatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/${article.slug}/`}
                      className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-amber-300 transition-all hover:shadow-xl group block"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image || getCategoryImage(article.category, article.title)}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {article.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{article.author}</span>
                          <span className="text-xs text-gray-500">{article.publishedDate}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg font-medium ${
                            currentPage === page
                              ? 'bg-amber-500 text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Resource Categories Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Explore by Category</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dive deeper into topics that matter most to your business
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => handleCategoryChange('Resources')}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Forecasting
                </h3>
              </button>

              <button
                onClick={() => handleCategoryChange('Insights')}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Data Science
                </h3>
              </button>

              <button
                onClick={() => handleCategoryChange('Case Studies')}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-amber-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Case Studies
                </h3>
              </button>

              <button
                onClick={() => handleCategoryChange('Tutorials')}
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Best Practices
                </h3>
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Stay Updated with the Latest Insights
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Get expert tips, industry trends, and product updates delivered to your inbox
            </p>
            <Link
              to="/contact-us/"
              className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
            >
              Subscribe to Newsletter
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
