import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Database, Search, TrendingUp, Zap, Download } from 'lucide-react';

export default function DataCatalog() {
  return (
    <>
      <SEO
        title="Data Catalog | Ready Signal"
        description="Thousands of data sources to enrich your forecasts. Centralized data repository continuously updated and easy to integrate."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Data Catalog
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Thousands of Data Sources to Enrich Your Forecasts
              </p>
              <p className="text-lg text-gray-600 mb-12">
                Centralized Data Repository Continuously Updated and Easy to Integrate
              </p>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Data Sources
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Comprehensive Data Coverage</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access thousands of curated data sources across multiple domains to enhance your forecasting accuracy
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Economic Data</h3>
                <p className="text-gray-600">
                  Federal Reserve, Bureau of Labor Statistics, Treasury, and more
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Demographic Data</h3>
                <p className="text-gray-600">
                  Census Bureau, population trends, and consumer behavior data
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all">
                <div className="w-16 h-16 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Weather Data</h3>
                <p className="text-gray-600">
                  NOAA weather data, historical patterns, and climate indicators
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Industry Data</h3>
                <p className="text-gray-600">
                  Sector-specific data, market trends, and business indicators
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Free Data Tables Section */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Free Data Tables</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Reference data for your models - Download essential datasets to enhance your forecasting projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* United States Zip Code Data Table */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-900">United States Zip Code Data Table</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive zip code data with demographics and geographic insights
                </p>
                <a
                  href="https://share.hsforms.com/2qjXFQXRIQC2JpvlVzAu_xw2bh6r"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Data
                </a>
              </div>

              {/* FIPS County Codes Data Table */}
              <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-900">FIPS County Codes Data Table</h3>
                <p className="text-gray-600 mb-6">
                  Federal Information Processing Standard county codes for geographic analysis
                </p>
                <a
                  href="https://f.hubspotusercontent30.net/hubfs/7540639/FIPS%20Codes.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Data
                </a>
              </div>

              {/* S&P 500 Companies Data Table */}
              <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-900">S&P 500 Companies Data Table</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive list of S&P 500 companies with sector information
                </p>
                <a
                  href="https://f.hubspotusercontent30.net/hubfs/7540639/SP500.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Data
                </a>
              </div>

              {/* Electoral College Data Table */}
              <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-2xl border-2 border-red-100 hover:border-red-300 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Electoral College Data Table</h3>
                <p className="text-gray-600 mb-6">
                  Electoral votes by state for political and demographic analysis
                </p>
                <a
                  href="https://f.hubspotusercontent30.net/hubfs/7540639/Electoral_College.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Data
                </a>
              </div>

              {/* State Abbreviation Data Table */}
              <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border-2 border-indigo-100 hover:border-indigo-300 transition-all">
                <h3 className="text-xl font-bold mb-3 text-gray-900">State Abbreviation Data Table</h3>
                <p className="text-gray-600 mb-6">
                  Complete list of US state names and abbreviations for data standardization
                </p>
                <a
                  href="https://f.hubspotusercontent30.net/hubfs/7540639/state_abbreviations.csv"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Download Data
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Database className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">15,000+ Data Sources</h3>
                <p className="text-gray-600">
                  Comprehensive library of curated external data sources across multiple domains
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Continuously Updated</h3>
                <p className="text-gray-600">
                  Data automatically updated as new information is released from trusted sources
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Easy Integration</h3>
                <p className="text-gray-600">
                  Seamless integration with your existing data science platforms and workflows
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Explore Our Data Catalog?
            </h2>
            <p className="text-xl mb-8 text-amber-50">
              Start enriching your forecasts with thousands of curated data sources today
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
