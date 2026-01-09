import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { BookOpen, TrendingUp, FileText } from 'lucide-react';

export default function BlogAndResources() {
  const articles = [
    {
      title: 'Transform Your Retail Strategy with External Data and AI',
      excerpt: 'Discover how external data and AI can revolutionize your retail forecasting and decision-making process.',
      image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Retail',
      link: '/blog/retail-strategy',
    },
    {
      title: 'Discovering Flu Impact on Sales',
      excerpt: 'Unmasking the flu factor in sales forecasting and understanding seasonal health impacts on business.',
      image: 'https://images.pexels.com/photos/3825527/pexels-photo-3825527.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Forecasting',
      link: '/blog/flu-impact-sales',
    },
    {
      title: 'High-Precision Forecasting: Reduce Errors and Gain Market Insights',
      excerpt: 'Learn how to improve forecast accuracy and unlock market-based insights for better decision-making.',
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Best Practices',
      link: '/blog/high-precision-forecasting',
    },
    {
      title: 'Top 9 Data-Driven Indicators to Understand Tariffs',
      excerpt: 'Navigate the complex world of tariffs with data-driven economic indicators and predictive analytics.',
      image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Economics',
      link: '/blog/tariffs-indicators',
    },
    {
      title: 'Navigating Tariff Impacts Proactively',
      excerpt: 'Transform uncertainty into strategic opportunities with AI-driven forecasting during tariff changes.',
      image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Strategy',
      link: '/blog/tariff-impacts',
    },
    {
      title: 'Ready Signal Introduces Interaction Variables',
      excerpt: 'Deepen your economic insights with our new interaction variables feature for more nuanced analysis.',
      image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Product Updates',
      link: '/blog/interaction-variables',
    },
  ];

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
            </div>
          </div>
        </section>

        {/* Featured Articles Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article, index) => (
                <Link
                  key={index}
                  to={article.link}
                  className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden hover:border-amber-300 transition-all hover:shadow-xl group block"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
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
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center gap-2 text-amber-600 font-semibold">
                      <span>Read More</span>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
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
              <Link
                to="/blog-and-resources/"
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Forecasting
                </h3>
              </Link>

              <Link
                to="/blog-and-resources/"
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                  Data Science
                </h3>
              </Link>

              <Link
                to="/blog-and-resources/"
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-amber-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                  Case Studies
                </h3>
              </Link>

              <Link
                to="/blog-and-resources/"
                className="bg-white p-6 rounded-2xl border-2 border-gray-200 hover:border-purple-300 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  Best Practices
                </h3>
              </Link>
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
