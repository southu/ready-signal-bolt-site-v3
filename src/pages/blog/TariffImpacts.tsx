import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Calendar, User } from 'lucide-react';

export default function TariffImpacts() {
  return (
    <>
      <SEO
        title="Navigating Tariff Impacts Proactively | Ready Signal"
        description="Transform uncertainty into strategic opportunities with AI-driven forecasting during tariff changes."
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
                Strategy
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Navigating Tariff Impacts Proactively
              </h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>January 9, 2026</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Ready Signal Team</span>
                </div>
              </div>
            </div>

            <img
              src="https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Navigating Tariff Impacts"
              className="w-full h-96 object-cover rounded-2xl mb-8"
            />

            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Trade policy changes create uncertainty—but they also create opportunities for businesses that can anticipate and adapt quickly. The key is moving from reactive to proactive strategy.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Reactive Trap</h2>
              <p className="text-gray-700 mb-4">
                Most businesses respond to tariffs only after they take effect:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Scrambling to find alternative suppliers</li>
                <li>Accepting margin compression without adjustment</li>
                <li>Making rushed decisions under pressure</li>
                <li>Missing opportunities to gain competitive advantage</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">The Proactive Advantage</h2>
              <p className="text-gray-700 mb-4">
                Companies using AI-driven forecasting with tariff indicators can:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Model multiple tariff scenarios before they occur</li>
                <li>Identify which products and regions face greatest impact</li>
                <li>Develop contingency plans for various policy outcomes</li>
                <li>Time inventory and purchasing decisions strategically</li>
                <li>Adjust pricing before competitors react</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">Real-World Application</h2>
              <p className="text-gray-700 mb-4">
                Ready Signal customers navigating tariff changes have:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>Identified alternative sourcing options before capacity constraints emerged</li>
                <li>Optimized inventory levels to balance cost increases with storage expenses</li>
                <li>Adjusted product mix to favor less-impacted items</li>
                <li>Implemented dynamic pricing that maintained margins without losing volume</li>
              </ul>

              <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-900">From Uncertainty to Opportunity</h2>
              <p className="text-gray-700 mb-6">
                While competitors struggle with tariff uncertainty, data-driven businesses can identify opportunities: products where competitors will struggle more, markets where demand may shift, and strategic timing for capacity investments.
              </p>

              <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg my-8">
                <p className="text-teal-800">
                  <strong>Turn tariff uncertainty into competitive advantage.</strong> Ready Signal helps you model scenarios and make proactive decisions with confidence.
                </p>
              </div>
            </div>
          </article>

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
