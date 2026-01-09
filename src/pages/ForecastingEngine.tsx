import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { TrendingUp, Zap, Target, BarChart3, Brain, CheckCircle2 } from 'lucide-react';

export default function ForecastingEngine() {
  return (
    <>
      <SEO
        title="Forecasting Engine | Ready Signal"
        description="Make better business decisions with confidence using Ready Signal's Automated Forecasting tool. Generate accurate, automated forecasts at scale."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Forecasting Engine
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Make better business decisions with confidence using Ready Signal's Automated Forecasting tool. Our advanced platform uses patented algorithms to analyze your historical data, identify leading indicators, and generate accurate, automated forecasts at scale.
                </p>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Request Demo
                  <TrendingUp className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 shadow-xl">
                  <BarChart3 className="w-full h-64 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Sets Us Apart Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">What Sets Us Apart</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready Signal's Forecasting Engine delivers unmatched accuracy and scalability
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Predict Future Trends</h3>
                    <p className="text-gray-600">
                      Our platform enables you to predict future trends and stay ahead of the competition by identifying leading indicators for your business.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Customized Forecasting</h3>
                    <p className="text-gray-600">
                      Our bespoke forecasts are tailored to your specific business portfolio and individual products, allowing you to make informed decisions about your entire organization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Scalable Solutions</h3>
                    <p className="text-gray-600">
                      Generate forecasts at scale with our automated tool, saving you time and resources and streamlining the forecasting process.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Unmatched Accuracy</h3>
                    <p className="text-gray-600">
                      Our platform specializes in generating accurate predictive models specific to your business needs, giving you the confidence to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Forecast Insights Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Forecast Insights</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready Signal's Forecasting Engine creates customized scalable forecasts based on comprehensive evaluation of leading indicators
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Feature Importance</h3>
                    <p className="text-gray-600">
                      Understand which factors drive your business outcomes most significantly
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Actuals vs Forecast</h3>
                    <p className="text-gray-600">
                      Compare historical performance with future projections to validate accuracy
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">External Factors</h3>
                    <p className="text-gray-600">
                      Incorporate both internal data and external market factors driving your business
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-xl">
                <div className="text-center text-gray-400">
                  <BarChart3 className="w-48 h-48 mx-auto mb-4" />
                  <p className="text-sm">Interactive Forecast Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Experience the power of accurate forecasting, customized solutions, scalability, and a competitive edge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us/"
                className="inline-flex items-center justify-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 transition-all shadow-lg hover:shadow-xl"
              >
                Request Demo
              </Link>
              <Link
                to="/plans/"
                className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-all shadow-lg hover:shadow-xl"
              >
                View Plans
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
