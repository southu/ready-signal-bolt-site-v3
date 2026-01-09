import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Layers, Info, Settings, TrendingUp } from 'lucide-react';

export default function FeatureDetails() {
  return (
    <>
      <SEO
        title="Overview of Feature Details Page | Ready Signal"
        description="Learn how to use the Feature Details page to understand and configure individual features in your signal."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Overview of Feature Details Page
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Understanding and configuring individual features in your signal
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessing Feature Details</h2>
            <p className="text-gray-700 mb-4">
              Click on any feature in your signal to open its details panel. Here you can view metadata, configure transformations, and see sample data.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Find</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Feature Metadata</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Feature name and description</li>
                    <li>Data provider/publisher</li>
                    <li>Source geographic and time grain</li>
                    <li>Units of measurement</li>
                    <li>Data availability dates</li>
                    <li>Last published date</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Configuration Options</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Export name customization</li>
                    <li>Data science treatments</li>
                    <li>Lead/lag configuration</li>
                    <li>Duplicate feature option</li>
                    <li>Remove from signal</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Preview</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    <li>Sample data visualization</li>
                    <li>Time series chart</li>
                    <li>Before/after transformation comparison</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-blue-800 mb-2">Pro Tip</h3>
            <p className="text-blue-700">
              Use the duplicate feature option to test different transformations side by side. This lets you compare which data science treatment works best for your specific use case.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/overview-of-data-science-treatments/"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              Data Science Treatments
            </Link>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
