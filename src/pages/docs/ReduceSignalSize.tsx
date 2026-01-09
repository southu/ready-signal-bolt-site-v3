import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Minimize2, AlertTriangle } from 'lucide-react';

export default function ReduceSignalSize() {
  return (
    <>
      <SEO
        title="How to Reduce the Size of Your Signal | Ready Signal"
        description="Learn how to control the size of your Ready Signal output by adjusting time grain, geo grain, and date range."
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
                <Minimize2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                How to Reduce the Size of Your Signal
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Control your signal output size for optimal performance
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-1">Output Size Limit</p>
                <p className="text-amber-700">
                  Ready Signal limits the number of rows in a Signal Output to <strong>1 Million</strong>. This article explains how to control the size of your signal.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Three Key Settings</h2>
            <p className="text-gray-700 mb-6">
              You can reduce the size of your signal (number of rows) by adjusting these 3 settings:
            </p>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-blue-900 mb-2">1. Time Grain</h3>
                <p className="text-blue-700">
                  Day grain creates more rows than Year grain. Moving from Daily to Weekly or Monthly significantly reduces output size.
                </p>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-semibold text-green-900 mb-2">2. Geo Grain</h3>
                <p className="text-green-700">
                  ZIP grain creates more rows than State grain. Consider whether you truly need ZIP-level precision or if City or State would suffice.
                </p>
              </div>
              <div className="bg-amber-50 rounded-xl p-6">
                <h3 className="font-semibold text-amber-900 mb-2">3. Date Range</h3>
                <p className="text-amber-700">
                  A two-year time period will create more rows than a 1-month time period. Only request the historical data you actually need.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Formula</h2>
            <div className="bg-gray-100 rounded-xl p-6 font-mono text-center text-lg">
              # of Rows ≈ Geo Grain × (Date Range ÷ Time Grain)
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Two Easiest Ways to Reduce Size</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Switch Geo Grain</h4>
                  <p className="text-gray-600">Change from ZIP to City or State for dramatic size reduction</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Increase Time Grain</h4>
                  <p className="text-gray-600">Move from Daily to Weekly or Monthly</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Example Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold text-gray-900">Configuration</th>
                    <th className="text-right py-2 px-3 font-semibold text-gray-900">Approx. Rows</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-red-50">
                    <td className="py-2 px-3 text-gray-700">ZIP + Daily + 1 Year</td>
                    <td className="py-2 px-3 text-right font-mono text-red-600">~15M rows</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-700">ZIP + Monthly + 1 Year</td>
                    <td className="py-2 px-3 text-right font-mono text-amber-600">~500K rows</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-gray-700">State + Monthly + 1 Year</td>
                    <td className="py-2 px-3 text-right font-mono text-green-600">~612 rows</td>
                  </tr>
                  <tr className="bg-green-50">
                    <td className="py-2 px-3 text-gray-700">Country + Monthly + 1 Year</td>
                    <td className="py-2 px-3 text-right font-mono text-green-600">12 rows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/data-grains-explained/"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              Learn About Data Grains
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
