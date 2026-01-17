import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { TrendingUp, BarChart3, DollarSign, Building2, ArrowRight, LineChart, PieChart, Activity } from 'lucide-react';

export default function DataEconomic() {
  const economicSources = [
    {
      name: 'Federal Reserve System',
      description: 'Monetary policy, interest rates, and financial indicators',
      icon: Building2,
    },
    {
      name: 'Bureau of Labor Statistics',
      description: 'Employment data, wages, and labor market statistics',
      icon: BarChart3,
    },
    {
      name: 'Bureau of Economic Analysis',
      description: 'GDP, personal income, and economic accounts',
      icon: PieChart,
    },
    {
      name: 'U.S. Census Bureau',
      description: 'Retail sales, construction spending, and trade data',
      icon: LineChart,
    },
    {
      name: 'U.S. Department of Treasury',
      description: 'Treasury yields, government spending, and fiscal data',
      icon: DollarSign,
    },
    {
      name: 'Federal Reserve Bank of St. Louis',
      description: 'FRED database with thousands of economic time series',
      icon: Activity,
    },
  ];

  const dataCategories = [
    'GDP & Economic Growth',
    'Employment & Unemployment',
    'Inflation & Consumer Prices',
    'Interest Rates & Yields',
    'Retail Sales & Consumer Spending',
    'Housing & Construction',
    'Manufacturing & Industrial Production',
    'Trade & Import/Export Data',
  ];

  return (
    <>
      <SEO
        title="Economic Data | Ready Signal"
        description="Access comprehensive economic data from the Federal Reserve, Bureau of Labor Statistics, and more to enhance your predictive models and forecasts."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <TrendingUp className="w-4 h-4" />
                Data Category
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Economic Data
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Comprehensive economic indicators from trusted government and institutional sources
              </p>
              <p className="text-lg text-gray-400 mb-12">
                Integrate macro-economic data directly into your forecasting models
              </p>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Economic Data
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Trusted Data Sources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ready Signal aggregates economic data from the most authoritative government and institutional sources
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {economicSources.map((source) => (
                <div key={source.name} className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                    <source.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{source.name}</h3>
                  <p className="text-gray-600">{source.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Categories Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Available Economic Indicators</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access hundreds of economic indicators across multiple categories, all normalized and ready to integrate with your data.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {dataCategories.map((category) => (
                    <div key={category} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="text-gray-700">{category}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-bold mb-6">Data Grains Available</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Day', 'Week', 'Month', 'Quarter', 'Year'].map((grain) => (
                        <span key={grain} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          {grain}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Geographic Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Country', 'State', 'City', 'Zip Code'].map((grain) => (
                        <span key={grain} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {grain}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Using Economic Data Today
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Enhance your forecasts with comprehensive economic indicators
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/data-catalog/"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white"
              >
                Browse Data Catalog
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

