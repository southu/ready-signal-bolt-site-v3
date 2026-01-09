import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, TrendingUp, Download } from 'lucide-react';

export default function SP500Companies() {
  return (
    <>
      <SEO
        title="S&P 500 Companies Data Table | Ready Signal"
        description="Reference table of S&P 500 companies for financial and market analysis."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                S&P 500 Companies Data Table
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Reference data for the S&P 500 index constituents
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the S&P 500</h2>
            <p className="text-gray-700 mb-4">
              The S&P 500 (Standard & Poor's 500) is a stock market index tracking the stock performance of 500 of the largest companies listed on stock exchanges in the United States.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Index Characteristics</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>500 leading companies</li>
                  <li>~80% of US equity market cap</li>
                  <li>Market-cap weighted</li>
                  <li>Regularly rebalanced</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-3">Sector Breakdown</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Technology</li>
                  <li>Healthcare</li>
                  <li>Financials</li>
                  <li>Consumer Discretionary</li>
                  <li>And 7 more sectors</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sample Companies by Sector</h2>
            <div className="space-y-4">
              {[
                { sector: 'Technology', companies: ['Apple (AAPL)', 'Microsoft (MSFT)', 'NVIDIA (NVDA)'] },
                { sector: 'Healthcare', companies: ['UnitedHealth (UNH)', 'Johnson & Johnson (JNJ)', 'Eli Lilly (LLY)'] },
                { sector: 'Financials', companies: ['Berkshire Hathaway (BRK.B)', 'JPMorgan Chase (JPM)', 'Visa (V)'] },
                { sector: 'Consumer', companies: ['Amazon (AMZN)', 'Tesla (TSLA)', 'Home Depot (HD)'] },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-2">{item.sector}</h5>
                  <p className="text-gray-700">{item.companies.join(' | ')}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 border-l-4 border-teal-500 p-6 rounded-r-lg mb-8">
            <p className="text-teal-800">
              <strong>Note:</strong> S&P 500 composition changes periodically as companies are added or removed based on market capitalization and other criteria. Ready Signal keeps this reference data up to date.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://f.hubspotusercontent30.net/hubfs/7540639/SP500.csv"
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Download the Data
            </a>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-teal-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition-all"
            >
              <Database className="w-5 h-5" />
              More Data Tables
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
