import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Zap, TrendingUp, Globe, Shield, ArrowRight, Database, BarChart3, RefreshCw } from 'lucide-react';

export default function DataRobot() {
  return (
    <>
      <SEO
        title="DataRobot AI Accelerator | Ready Signal"
        description="Unlock the full potential of DataRobot with Ready Signal. Accelerate your workflow and seamlessly integrate external data sources to enrich your predictive models."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="w-4 h-4" />
                AI Accelerator
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                DataRobot
                <span className="block text-amber-400">AI Accelerator</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Unlock the full potential of DataRobot with Ready Signal. Accelerate your workflow and seamlessly integrate external data sources to enrich your predictive models.
              </p>
              <p className="text-lg text-gray-400 mb-12">
                Ready Signal: Your gateway to enhanced efficiency, expanded insights, and more accurate predictions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://github.com/rxa-io/readysignal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                >
                  Explore on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  AI Accelerator Overview
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Leverage the unparalleled advantage of seamlessly connecting your DataRobot modeling engine to over <strong className="text-gray-900">500 normalized, aggregated, and continuously updated external data sources</strong>.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  From macro-economic indicators, demographics, consumer behavior and weather patterns, our comprehensive data catalog empowers your models with the depth and breadth of information necessary for predictive modeling, experimentation, and business intelligence.
                </p>
                <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-amber-500">
                  <p className="text-gray-700 italic">
                    "DataRobot and Ready Signal together provide you the ability to easily integrate third-party data with your private data and then quickly determine if that external data can improve model accuracy and provide additional context to what is happening in your business."
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                  <Database className="w-10 h-10 text-blue-500 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">500+ Data Sources</h3>
                  <p className="text-gray-600 text-sm">Normalized and continuously updated</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-xl border border-green-100">
                  <BarChart3 className="w-10 h-10 text-green-500 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Economic Data</h3>
                  <p className="text-gray-600 text-sm">Macro indicators & market trends</p>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-xl border border-amber-100">
                  <Globe className="w-10 h-10 text-amber-500 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Weather Patterns</h3>
                  <p className="text-gray-600 text-sm">Climate & environmental data</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                  <RefreshCw className="w-10 h-10 text-purple-500 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">Auto-Updated</h3>
                  <p className="text-gray-600 text-sm">Always current data</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Key Benefits</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Enhance your DataRobot models with external data for better predictions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Enhanced Accuracy</h3>
                <p className="text-gray-600">
                  Relevant external data can improve accuracy by <strong className="text-green-600">20%+</strong> by capturing additional variables affecting the time series.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Adaptability to Change</h3>
                <p className="text-gray-600">
                  External data enables models to respond dynamically to external factors that may not be evident in the historical data alone.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Broader Context</h3>
                <p className="text-gray-600">
                  External data provides a broader context for understanding the external market dynamics that influence or impact your organization.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Stakeholder Confidence</h3>
                <p className="text-gray-600">
                  Instill confidence that forecasts are grounded in a thorough understanding of the external landscape.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">Try It Yourself</h2>
            <p className="text-xl text-gray-600 mb-8">
              Dive into the world of data enrichment and unleash the full potential of Ready Signal within DataRobot. Explore our model enrichment for yourself with our <code className="bg-gray-100 px-2 py-1 rounded text-amber-600">DataRobot_RXA.ipynb</code> notebook, available on GitHub.
            </p>
            <p className="text-lg text-gray-600 mb-12">
              Harness the power of Ready Signal to enhance your time series data analysis and drive actionable insights like never before.
            </p>
            <a
              href="https://github.com/rxa-io/readysignal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Explore on GitHub
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Supercharge your DataRobot models with Ready Signal's external data
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Schedule Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/plans/"
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all border-2 border-white"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

