import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function BoxCoxTransformation() {
  return (
    <>
      <SEO
        title="What is a Box-Cox Transformation? | Ready Signal"
        description="Box-Cox Transformations can help reduce non-constant variance in a dataset for better statistical analysis."
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
              What is a Box-Cox Transformation?
            </h1>
            <p className="text-xl text-gray-600">
              Box-Cox Transformations can help reduce non-constant variance in a dataset
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              Datasets often fail to provide accurate information under statistical analysis without adjustments. Transformations make data more fit for analysis by addressing issues like non-constant variance (heteroscedasticity).
            </p>
            <p className="text-gray-700">
              When variance changes across the range of your data, it can lead to unreliable model predictions and invalid statistical inferences.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is a Box-Cox Transformation?</h2>
            <p className="text-gray-700 mb-4">
              A Box-Cox Transformation is a method to reduce <strong>heteroscedasticity</strong> (non-constant variance) by inflating low variance data and reducing high variance data to create uniform datasets.
            </p>
            <p className="text-gray-700 mb-4">
              The transformation uses an exponent <strong>lambda (λ)</strong> ranging from -5 to 5. The optimal lambda value results in the best approximation of a normal distribution curve.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">How it works:</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>When λ = 0, the transformation is equivalent to a natural log transformation</li>
                <li>When λ = 0.5, it's equivalent to a square root transformation</li>
                <li>When λ = 1, no transformation is applied</li>
                <li>The optimal λ is found by maximizing the log-likelihood function</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal allows you to apply a Box-Cox transformation with one click. The platform automatically finds the optimal lambda value for your data and applies the transformation to improve your model's performance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Minitab Blog - Bruno Scibilia on Box-Cox transformations</li>
              <li>Durham University - Nicholas J. Cox on power transformations</li>
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
