import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function LogarithmicTransformation() {
  return (
    <>
      <SEO
        title="What is a Logarithmic Transformation? | Ready Signal"
        description="Logarithmic transformations allow datasets to become more readable and useful for statistical analysis."
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
              What is a Logarithmic Transformation?
            </h1>
            <p className="text-xl text-gray-600">
              Logarithmic transformations allow datasets to become more readable and useful
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              Datasets often need adjustments for proper statistical analysis. Common issues include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Reducing skewness in distributions</li>
              <li>Creating linear relationships from exponential data</li>
              <li>Stabilizing variance across different scales</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Logarithmic Transformation?</h2>
            <p className="text-gray-700 mb-4">
              In a logarithmic transformation, every data-value (x) is recalculated in logarithmic form: <code className="bg-gray-100 px-2 py-1 rounded">log(x)</code> or <code className="bg-gray-100 px-2 py-1 rounded">ln(x)</code>.
            </p>
            <p className="text-gray-700 mb-4">
              This transformation turns multiplicative operations into addition, making exponential relationships linear.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Allows exponential data to be viewed linearly</li>
                <li>Makes linear models more accurate and reliable</li>
                <li>Reduces right skewness in distributions</li>
                <li>Stabilizes variance for heteroscedastic data</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal allows you to apply logarithmic transformations with one click. The platform handles the transformation automatically and ensures proper handling of zero and negative values.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Duke University - Robert Nau on log transformations</li>
              <li>Durham University - Nicholas J. Cox on data transformations</li>
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
