import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Users, MapPin, Home, Briefcase, ArrowRight, GraduationCap, Heart, Building } from 'lucide-react';

export default function DataDemographic() {
  const demographicSources = [
    {
      name: 'U.S. Census Bureau',
      description: 'Comprehensive population counts, demographics, and housing data',
      icon: Users,
    },
    {
      name: 'American Community Survey',
      description: 'Detailed socioeconomic data updated annually',
      icon: Home,
    },
    {
      name: 'Population Estimates',
      description: 'Current population estimates between census years',
      icon: MapPin,
    },
    {
      name: 'Income & Employment',
      description: 'Household income, employment status, and occupation data',
      icon: Briefcase,
    },
    {
      name: 'Education Statistics',
      description: 'Educational attainment and enrollment data',
      icon: GraduationCap,
    },
    {
      name: 'Housing Characteristics',
      description: 'Housing values, ownership rates, and housing inventory',
      icon: Building,
    },
  ];

  const dataCategories = [
    'Population by Age & Gender',
    'Household Income Levels',
    'Educational Attainment',
    'Employment & Occupation',
    'Housing Values & Ownership',
    'Migration & Mobility',
    'Family & Household Size',
    'Racial & Ethnic Composition',
  ];

  const useCases = [
    {
      title: 'Market Sizing',
      description: 'Understand your addressable market by demographics in any geography',
    },
    {
      title: 'Site Selection',
      description: 'Choose optimal locations based on demographic fit with your target customers',
    },
    {
      title: 'Customer Segmentation',
      description: 'Enrich customer data with demographic attributes for better segmentation',
    },
    {
      title: 'Demand Forecasting',
      description: 'Factor population and demographic shifts into your demand models',
    },
  ];

  return (
    <>
      <SEO
        title="Demographic Data | Ready Signal"
        description="Access comprehensive demographic data from the U.S. Census Bureau and other sources to enhance your market analysis and forecasting."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-800 via-green-700 to-teal-700 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Users className="w-4 h-4" />
                Data Category
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Demographic Data
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8">
                Population, income, and consumer behavior data at every geographic level
              </p>
              <p className="text-lg text-green-200 mb-12">
                Understand your customers and markets with comprehensive demographic intelligence
              </p>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Demographic Data
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Demographic Data Sources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access authoritative demographic data, processed and normalized for immediate integration
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {demographicSources.map((source) => (
                <div key={source.name} className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl border-2 border-green-100 hover:border-green-300 transition-all">
                  <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                    <source.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{source.name}</h3>
                  <p className="text-gray-600">{source.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How Businesses Use Demographic Data</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leverage demographic insights to make better business decisions
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{useCase.title}</h3>
                  <p className="text-lg text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Data Categories Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Available Demographic Indicators</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access hundreds of demographic variables across multiple categories, all normalized and ready for your models.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {dataCategories.map((category) => (
                    <div key={category} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
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
                      {['Month', 'Quarter', 'Year'].map((grain) => (
                        <span key={grain} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          {grain}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Geographic Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Country', 'State', 'County', 'City', 'Zip Code', 'Census Tract'].map((grain) => (
                        <span key={grain} className="bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <section className="py-20 bg-gradient-to-br from-green-600 to-teal-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Know Your Market Inside and Out
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Enrich your data with comprehensive demographic insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/data-catalog/"
                className="inline-flex items-center gap-2 bg-green-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-800 transition-all border-2 border-white"
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

