import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function OrderNormTransformation() {
  return (
    <>
      <SEO
        title="What is an Order-Norm Transformation? | Ready Signal"
        description="Order-Norm is a rank-based procedure that maps values to the percentile of a normal distribution."
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
              What is an Order-Norm Transformation?
            </h1>
            <p className="text-xl text-gray-600">
              A rank-based procedure that maps values to percentiles of a normal distribution
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              Standard parametric transformations like Box-Cox or Yeo-Johnson may not always achieve normality. When dealing with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Heavily skewed distributions</li>
              <li>Multimodal data</li>
              <li>Data with many tied values</li>
              <li>Outliers that resist standard transformations</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is an Order-Norm Transformation?</h2>
            <p className="text-gray-700 mb-4">
              The Order-Norm (Ordered Quantile Normalization) is a rank-based procedure that maps each value to its corresponding percentile position in a standard normal distribution.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">How it works:</h4>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Rank all values in the dataset</li>
                <li>Convert ranks to percentiles</li>
                <li>Map percentiles to standard normal quantiles</li>
                <li>The result is guaranteed to be normally distributed</li>
              </ol>
            </div>
            <div className="bg-green-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-green-900 mb-3">Key Advantages:</h4>
              <ul className="list-disc list-inside text-green-700 space-y-2">
                <li><strong>Guaranteed normality:</strong> Always produces a normal distribution</li>
                <li><strong>Robust to outliers:</strong> Extreme values are naturally bounded</li>
                <li><strong>Non-parametric:</strong> No assumptions about the original distribution</li>
                <li><strong>Handles any distribution:</strong> Works regardless of original shape</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal applies Order-Norm transformations with one click. This is particularly useful when other transformations fail to achieve normality, ensuring your models have properly distributed inputs.
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
