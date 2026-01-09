import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, BarChart3, CheckCircle } from 'lucide-react';

export default function DomoCaseStudy() {
  return (
    <>
      <SEO
        title="Ready Signal and Domo - Case Study | Ready Signal"
        description="See how Ready Signal integrates with Domo to power advanced analytics and forecasting."
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
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Ready Signal and Domo - Case Study
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Powering advanced analytics with external data
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h2>
            <p className="text-gray-700 mb-4">
              Organizations using Domo for business intelligence often need to incorporate external factors into their analysis - economic indicators, weather patterns, demographic trends - but sourcing and integrating this data is time-consuming and technically complex.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Solution</h2>
            <p className="text-gray-700 mb-4">
              By combining Ready Signal's external data platform with Domo's visualization capabilities, teams can:
            </p>
            <ul className="space-y-3">
              {[
                'Access thousands of pre-processed external data features',
                'Automatically refresh data on a schedule',
                'Join external factors with internal metrics',
                'Build predictive dashboards with complete context',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Results</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                <p className="text-gray-600">Reduction in data sourcing time</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">3x</div>
                <p className="text-gray-600">More external factors analyzed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">24/7</div>
                <p className="text-gray-600">Automated data refresh</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-gray-800 mb-2">Get Started</h3>
            <p className="text-gray-700">
              Connect Ready Signal to your Domo instance today and start enriching your analytics with external data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/domo-data-connector/"
              className="inline-flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Domo Connector Setup
            </Link>
            <Link
              to="/contact-us/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all"
            >
              Request Demo
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
