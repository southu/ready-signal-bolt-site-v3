import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Brain, Sparkles, Target, Clock, TrendingUp, Zap } from 'lucide-react';

export default function RecommendationEngine() {
  return (
    <>
      <SEO
        title="Recommendation Engine | Ready Signal"
        description="Unlock the full potential of your business with Ready Signal's AI-powered Recommendation Engine. Effortlessly discover the most relevant external factors and market trends."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Recommendation Engine
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Unlock the full potential of your business or product with Ready Signal's AI-powered Recommendation Engine. Effortlessly discover the most relevant external factors, market trends, and consumer behavior tailored to your unique needs. Accelerate your data-driven decision-making process and achieve unparalleled accuracy in a fraction of the time.
                </p>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Get Started
                  <Brain className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 shadow-xl">
                  <Brain className="w-full h-64 text-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Effortlessly identify the most relevant external factors for your business or product
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Personalized Recommendations</h3>
                    <p className="text-gray-600">
                      Experience the precision of our personalized recommendations, tailored to your business. Our platform ensures that every suggestion aligns seamlessly with your specific needs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Leading Indicators</h3>
                    <p className="text-gray-600">
                      Identify leading indicators to anticipate market shifts, consumer behavior, and emerging trends, empowering you to proactively shape your strategy and outpace the competition.
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
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Efficiency at Scale</h3>
                    <p className="text-gray-600">
                      Identify feature sets at scale across a robust product portfolio with unique factors for hundreds of product SKUs. Ensure every decision is informed and optimized for success.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">Time Savings</h3>
                    <p className="text-gray-600">
                      Spend less time searching and more time making informed decisions. Identify important sources to your business across hundreds of possibilities in a matter of minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Signal Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Personalized Data Recommendations</h2>
                <p className="text-xl text-gray-600 mb-8">
                  Harness the efficiency of our custom signal, consolidating data from diverse sources with ease. Say goodbye to the hassle of manually identifying the most relevant feature sets for your business—our Recommendation Engine does the heavy lifting for you.
                </p>
                <p className="text-lg text-gray-600 mb-8">
                  Whether you're delving into inventory management, demand forecasting, or sales analysis, Ready Signal's Recommendation Engine is your key to unlocking actionable insights.
                </p>
                <Link
                  to="/contact-us/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Request Demo
                  <Target className="w-5 h-5" />
                </Link>
              </div>
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200 shadow-xl">
                <div className="text-center text-gray-400">
                  <TrendingUp className="w-48 h-48 mx-auto mb-4" />
                  <p className="text-sm">Consumer Sentiment × Travel Numbers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Recommendation Engine</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Make data-driven decisions faster and more accurately with our platform
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Our patent-pending iterative testing engine automatically tests for statistical relationships across all available data sources
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Precision Targeting</h3>
                <p className="text-gray-600">
                  Recommends the best features for your specific needs based on the target variable you wish to explain
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Save Time</h3>
                <p className="text-gray-600">
                  Remove analyst bias and save time by automating the feature discovery process
                </p>
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
              Discover the power of AI-driven recommendations and accelerate your decision-making process
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
