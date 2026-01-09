import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Play, ChevronRight, Database, TrendingUp, Zap } from 'lucide-react';

export default function BriefIntroduction() {
  return (
    <>
      <SEO
        title="Ready Signal - A Brief Introduction | Ready Signal"
        description="Get started with Ready Signal - learn how to find external data that improves your forecasts."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Ready Signal - A Brief Introduction
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Welcome to Ready Signal! Here's everything you need to know to get started.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Ready Signal?</h2>
            <p className="text-gray-700 mb-4">
              Ready Signal is an external data platform that helps you find, prepare, and integrate third-party data into your forecasting and analytical models.
            </p>
            <p className="text-gray-700">
              Instead of spending weeks or months sourcing and cleaning external data, Ready Signal gives you instant access to thousands of curated, model-ready features from trusted sources.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Capabilities</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Catalog</h3>
                <p className="text-gray-600 text-sm">Thousands of external features from weather, economic, demographic, and industry sources</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Auto Discovery</h3>
                <p className="text-gray-600 text-sm">Upload your data and let AI find the external factors that drive your metrics</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Data Treatments</h3>
                <p className="text-gray-600 text-sm">Apply transformations, lags, and normalizations with one click</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Create a Signal', desc: 'Start by defining your analysis type, time range, and geographic scope' },
                { step: 2, title: 'Select Features', desc: 'Browse or search for external data features to include in your signal' },
                { step: 3, title: 'Apply Treatments', desc: 'Optionally apply data science treatments like lags, transformations, or seasonal adjustments' },
                { step: 4, title: 'Export Your Data', desc: 'Download as CSV/Excel or connect via API to your models' },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
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

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-green-800 mb-2">Ready to get started?</h3>
            <p className="text-green-700">
              Create your first signal in minutes. Follow our step-by-step guide to build your first data signal.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Next Steps</h2>
            <div className="space-y-3">
              {[
                { title: 'How to Create a Signal', href: '/how-to-create-a-signal/', desc: 'Step-by-step guide' },
                { title: 'Data Science Treatments', href: '/overview-of-data-science-treatments/', desc: 'Learn about transformations' },
                { title: 'API Documentation', href: '/ready-signal-api-documentation/', desc: 'Connect programmatically' },
              ].map((item, i) => (
                <Link
                  key={i}
                  to={item.href}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all group"
                >
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
