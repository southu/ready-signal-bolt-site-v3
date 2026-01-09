import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function SeasonalAdjustment() {
  return (
    <>
      <SEO
        title="What is Seasonal Adjustment? | Ready Signal"
        description="Seasonal adjustments allow for a dataset to remove predictable seasonal patterns for cleaner analysis."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What is Seasonal Adjustment?
            </h1>
            <p className="text-xl text-gray-600">
              Seasonal adjustments allow for a dataset to remove predictable seasonal patterns
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              Datasets have varying fluctuations due to seasons, business cycles, or time periods that make it harder to analyze true trends. For example:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Retail sales spike during holiday seasons</li>
              <li>Energy consumption varies by weather patterns</li>
              <li>Tourism data fluctuates with vacation periods</li>
              <li>Agricultural data follows planting and harvest cycles</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Seasonal Adjustment?</h2>
            <p className="text-gray-700 mb-4">
              Seasonal Adjustment is the process of finding and removing predictable seasonal patterns from datasets. This provides cleaner insight and more accurate statistical analysis of underlying trends.
            </p>
            <p className="text-gray-700 mb-4">
              The adjustment can be multiplicative (dividing out a seasonal factor) or additive (subtracting a seasonal component), depending on the nature of the data.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Common Methods:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>X-13ARIMA-SEATS</strong> - Used by U.S. Census Bureau</li>
                <li><strong>STL Decomposition</strong> - Seasonal and Trend decomposition using Loess</li>
                <li><strong>Moving Averages</strong> - Simple seasonal smoothing</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal automatically detects and removes seasonal patterns from your data with one click. This allows you to focus on the true underlying trends and make more accurate forecasts.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Duke University Fuqua School of Business - Robert Nau</li>
              <li>U.S. Bureau of Labor Statistics</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/overview-of-data-science-treatments/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              View All Treatments
            </Link>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
