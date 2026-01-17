import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Heart, Activity, Stethoscope, Shield, ArrowRight, Building2, Pill, AlertTriangle } from 'lucide-react';

export default function DataPublicHealth() {
  const healthSources = [
    {
      name: 'CDC (Centers for Disease Control)',
      description: 'Disease surveillance, flu tracking, and public health statistics',
      icon: Shield,
    },
    {
      name: 'Influenza-Like Illness (ILI) Data',
      description: 'Weekly flu and respiratory illness tracking across the U.S.',
      icon: Activity,
    },
    {
      name: 'COVID Tracking Data',
      description: 'Historical COVID-19 case counts, hospitalizations, and trends',
      icon: AlertTriangle,
    },
    {
      name: 'Hospital Capacity',
      description: 'Healthcare utilization and hospital capacity metrics',
      icon: Building2,
    },
    {
      name: 'Vaccination Data',
      description: 'Immunization rates and vaccine distribution data',
      icon: Pill,
    },
    {
      name: 'Mortality Statistics',
      description: 'Death rates and cause-of-death statistics',
      icon: Stethoscope,
    },
  ];

  const useCases = [
    {
      title: 'Retail & CPG Forecasting',
      description: 'Factor flu seasons and illness rates into demand forecasts for health products, comfort foods, and related categories',
    },
    {
      title: 'Healthcare Planning',
      description: 'Anticipate patient volumes and resource needs based on disease prevalence',
    },
    {
      title: 'Workforce Planning',
      description: 'Account for absenteeism patterns driven by seasonal illness',
    },
    {
      title: 'Supply Chain Resilience',
      description: 'Identify health-related disruption risks in your supply chain',
    },
  ];

  const healthMetrics = [
    'Flu & Respiratory Illness Rates',
    'COVID-19 Cases & Hospitalizations',
    'Vaccination Coverage',
    'Hospital Bed Utilization',
    'Emergency Department Visits',
    'Disease Outbreak Data',
    'Mortality & Life Expectancy',
    'Health Risk Factors',
  ];

  return (
    <>
      <SEO
        title="Public Health Data | Ready Signal"
        description="Access comprehensive public health data from the CDC and other sources to factor health trends into your forecasting and planning."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" />
                Data Category
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Public Health Data
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-8">
                Disease surveillance, health trends, and pandemic data for smarter forecasting
              </p>
              <p className="text-lg text-purple-200 mb-12">
                Factor public health dynamics into your predictive models
              </p>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Health Data
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Success Story Callout */}
        <section className="py-12 bg-gradient-to-r from-purple-100 to-indigo-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real Impact: The Flu Factor</h3>
                  <p className="text-gray-600">
                    When a major CPG company saw an unexpected 9% forecast error in February 2025, Ready Signal's flu data (ILI rates from the CDC) revealed a 65% year-over-year increase in flu cases. Adding this data reduced forecast error by over 50%. 
                    <Link to="/unmasking-the-flu-factor-in-sales-forecasting/" className="text-purple-600 hover:text-purple-700 font-medium ml-1">
                      Read the case study →
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Public Health Data Sources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access authoritative health data from the CDC and other public health organizations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {healthSources.map((source) => (
                <div key={source.name} className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all">
                  <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
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
              <h2 className="text-4xl font-bold mb-4">How Businesses Use Health Data</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Turn health trends into actionable business intelligence
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

        {/* Health Metrics Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Available Health Metrics</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Access critical public health indicators that can impact your business, all normalized and ready for integration.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {healthMetrics.map((metric) => (
                    <div key={metric} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-gray-700">{metric}</span>
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
                      {['Week', 'Month', 'Quarter', 'Year'].map((grain) => (
                        <span key={grain} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                          {grain}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Geographic Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Country', 'HHS Region', 'State', 'County'].map((grain) => (
                        <span key={grain} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Factor Health Into Your Forecasts
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Don't let health trends catch you by surprise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/data-catalog/"
                className="inline-flex items-center gap-2 bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-all border-2 border-white"
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

