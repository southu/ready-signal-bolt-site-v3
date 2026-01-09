import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function YeoJohnsonTransformation() {
  return (
    <>
      <SEO
        title="What is a Yeo-Johnson Power Transformation? | Ready Signal"
        description="The Yeo-Johnson transformation is a power transformation that works with zero and negative values."
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
              What is a Yeo-Johnson Power Transformation?
            </h1>
            <p className="text-xl text-gray-600">
              A flexible power transformation that works with zero and negative values
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              Many statistical models assume normally distributed data. Real-world data often contains:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Skewed distributions</li>
              <li>Zero values (which break log transformations)</li>
              <li>Negative values (which break Box-Cox transformations)</li>
              <li>Non-constant variance</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Yeo-Johnson Transformation?</h2>
            <p className="text-gray-700 mb-4">
              The Yeo-Johnson transformation is an extension of the Box-Cox transformation that can handle <strong>zero and negative values</strong>. Like Box-Cox, it uses a parameter lambda (λ) to find the optimal transformation.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Key Advantages:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Works with positive, zero, and negative values</li>
                <li>No need to shift data before transformation</li>
                <li>Automatically finds optimal lambda parameter</li>
                <li>Produces approximately normal distributions</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-blue-900 mb-3">When to use Yeo-Johnson vs Box-Cox:</h4>
              <ul className="list-disc list-inside text-blue-700 space-y-2">
                <li><strong>Box-Cox:</strong> When all values are strictly positive</li>
                <li><strong>Yeo-Johnson:</strong> When data contains zeros or negative values</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal applies Yeo-Johnson transformations with one click. The platform automatically determines the optimal lambda parameter for your data, handling zeros and negative values seamlessly.
                </p>
              </div>
            </div>
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
