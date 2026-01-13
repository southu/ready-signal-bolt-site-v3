import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Cloud, Sun, Snowflake, Wind, ArrowRight, Thermometer, Droplets, CloudRain } from 'lucide-react';

export default function DataWeather() {
  const weatherSources = [
    {
      name: 'NOAA',
      description: 'National Oceanic and Atmospheric Administration weather data',
      icon: Cloud,
    },
    {
      name: 'Historical Weather Patterns',
      description: 'Decades of historical temperature, precipitation, and climate data',
      icon: Thermometer,
    },
    {
      name: 'Climate Indicators',
      description: 'Long-term climate trends and seasonal patterns',
      icon: Sun,
    },
    {
      name: 'Precipitation Data',
      description: 'Rainfall, snowfall, and humidity measurements',
      icon: CloudRain,
    },
    {
      name: 'Temperature Extremes',
      description: 'Heat waves, cold snaps, and temperature anomalies',
      icon: Snowflake,
    },
    {
      name: 'Storm & Wind Data',
      description: 'Severe weather events and wind pattern data',
      icon: Wind,
    },
  ];

  const useCases = [
    {
      title: 'Retail & Consumer Goods',
      description: 'Predict seasonal demand shifts based on temperature and weather patterns',
    },
    {
      title: 'Supply Chain',
      description: 'Anticipate disruptions and optimize logistics based on weather forecasts',
    },
    {
      title: 'Agriculture',
      description: 'Plan operations around precipitation, temperature, and growing conditions',
    },
    {
      title: 'Energy',
      description: 'Forecast energy demand based on heating and cooling degree days',
    },
  ];

  return (
    <>
      <SEO
        title="Weather Data | Ready Signal"
        description="Access comprehensive weather data from NOAA and other sources to enhance your predictive models with climate and weather patterns."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-600 via-orange-500 to-yellow-500 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Cloud className="w-4 h-4" />
                Data Category
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Weather Data
              </h1>
              <p className="text-xl md:text-2xl text-amber-100 mb-8">
                Comprehensive weather and climate data to power your forecasting models
              </p>
              <p className="text-lg text-amber-200 mb-12">
                Integrate historical and current weather patterns into your predictions
              </p>
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Weather Data
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Weather Data Sources</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Access weather data from authoritative meteorological sources, processed and normalized for immediate use
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {weatherSources.map((source) => (
                <div key={source.name} className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all">
                  <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center mb-6">
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
              <h2 className="text-4xl font-bold mb-4">Weather Data Use Cases</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See how businesses leverage weather data to improve their forecasts
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

        {/* Data Grains Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="bg-gradient-to-br from-amber-100 to-amber-50 p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Available Weather Metrics</h3>
                <ul className="space-y-3">
                  {[
                    'Temperature (high, low, average)',
                    'Precipitation (rain, snow, total)',
                    'Humidity levels',
                    'Wind speed and direction',
                    'Heating degree days',
                    'Cooling degree days',
                    'Severe weather events',
                    'UV index',
                  ].map((metric) => (
                    <li key={metric} className="flex items-center gap-3">
                      <Droplets className="w-5 h-5 text-amber-500" />
                      <span className="text-gray-700">{metric}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Granular Weather Data</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Access weather data at the granularity your models need. Our weather data is available across multiple time and geographic grains.
                </p>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Time Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Day', 'Week', 'Month', 'Quarter', 'Year'].map((grain) => (
                        <span key={grain} className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
                          {grain}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Geographic Grains</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Country', 'State', 'City', 'Zip Code'].map((grain) => (
                        <span key={grain} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
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
        <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Weather-Proof Your Forecasts
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Add weather intelligence to your predictive models today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/data-catalog/"
                className="inline-flex items-center gap-2 bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all border-2 border-white"
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

