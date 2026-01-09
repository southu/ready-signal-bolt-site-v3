import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Database, BarChart3, RefreshCw } from 'lucide-react';

export default function DomoConnector() {
  return (
    <>
      <SEO
        title="Domo Data Connector | Ready Signal"
        description="Learn how to connect Ready Signal to Domo for seamless BI integration."
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
                <Database className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Domo Data Connector
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Connect Ready Signal directly to your Domo instance
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Integration</h2>
            <p className="text-gray-700 mb-4">
              The Ready Signal Domo Connector allows you to automatically sync your processed signal data directly into Domo datasets, enabling powerful BI visualizations and analysis.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <BarChart3 className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Visualize</h4>
                <p className="text-sm text-gray-600">Create dashboards with external data</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <RefreshCw className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Auto-Refresh</h4>
                <p className="text-sm text-gray-600">Schedule automatic data updates</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <Database className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <h4 className="font-semibold text-gray-900">Combine</h4>
                <p className="text-sm text-gray-600">Join with internal data sources</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Get Your API Credentials', desc: 'Copy your access token from the Ready Signal platform' },
                { step: 2, title: 'Add the Connector in Domo', desc: 'Search for "Ready Signal" in Domo\'s connector library' },
                { step: 3, title: 'Configure Your Signal', desc: 'Enter your Signal ID and access token' },
                { step: 4, title: 'Set Refresh Schedule', desc: 'Choose how often Domo should pull updated data' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-gray-700">
              For detailed setup instructions or troubleshooting, contact our support team or check out the Ready Signal and Domo case study.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/ready-signal-and-domo-case-study/"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              View Case Study
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
