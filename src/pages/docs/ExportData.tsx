import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Download, Code, Database } from 'lucide-react';

export default function ExportData() {
  return (
    <>
      <SEO
        title="How to Export Your Processed Control Data (Signal) | Ready Signal"
        description="Learn how to export and leverage processed signal data from Ready Signal in your predictive models."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                How to Export Your Processed Data
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Export and leverage data from a Signal in your predictive models
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Three Ways to Access Your Data</h2>
            <p className="text-gray-700 mb-6">
              There are 3 ways you can access your processed Signal Data:
            </p>

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Download to Excel or CSV</h3>
                    <p className="text-gray-700 mb-4">
                      The quickest way to get your data. Click on Manage Signal, then click on the Download to Excel or CSV options.
                    </p>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Instant download</li>
                      <li>Works with any spreadsheet software</li>
                      <li>Good for one-time analysis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Code className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Leverage API Integration</h3>
                    <p className="text-gray-700 mb-4">
                      Connect programmatically to automate your data pipeline. Available for Python, R, and direct REST API access.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Link to="/ready-signal-api-documentation/" className="text-blue-600 hover:underline">API Docs</Link>
                      <span className="text-gray-400">|</span>
                      <Link to="/ready-signal-api-documentation-python-sdk/" className="text-blue-600 hover:underline">Python SDK</Link>
                      <span className="text-gray-400">|</span>
                      <Link to="/ready-signal-api-documentation-r-3-6/" className="text-blue-600 hover:underline">R Package</Link>
                    </div>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Automated data refresh</li>
                      <li>Direct integration with models</li>
                      <li>Paginated for large datasets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Access Data in Domo</h3>
                    <p className="text-gray-700 mb-4">
                      Connect Ready Signal directly to your Domo instance for seamless BI integration.
                    </p>
                    <Link to="/domo-data-connector/" className="text-amber-600 hover:underline">
                      Learn about the Domo Connector
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-blue-800 mb-2">Best Practice</h3>
            <p className="text-blue-700">
              For production workflows, we recommend using the API to ensure your models always have access to the latest data. Set up scheduled refreshes to keep your predictions current.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/ready-signal-api-documentation/"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              <Code className="w-5 h-5" />
              API Documentation
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
