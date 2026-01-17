import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { dataSources, getAllCategories } from '../data/dataSources';
import { dataFeatures } from '../data/dataFeatures';
import { 
  Database, 
  TrendingUp, 
  Cloud, 
  Users, 
  HeartPulse, 
  ArrowRight, 
  Building2,
  BarChart3,
  ExternalLink,
  Search
} from 'lucide-react';
import { useState, useMemo } from 'react';

const categoryIcons: Record<string, React.ElementType> = {
  economic: TrendingUp,
  weather: Cloud,
  demographic: Users,
  'public-health': HeartPulse,
};

const categoryLabels: Record<string, string> = {
  economic: 'Economic',
  weather: 'Weather',
  demographic: 'Demographic',
  'public-health': 'Public Health',
};

const categoryColors: Record<string, { bg: string; text: string; border: string; icon: string }> = {
  economic: { bg: 'from-blue-50 to-blue-100', text: 'text-blue-700', border: 'border-blue-200 hover:border-blue-400', icon: 'bg-blue-500' },
  weather: { bg: 'from-sky-50 to-sky-100', text: 'text-sky-700', border: 'border-sky-200 hover:border-sky-400', icon: 'bg-sky-500' },
  demographic: { bg: 'from-emerald-50 to-emerald-100', text: 'text-emerald-700', border: 'border-emerald-200 hover:border-emerald-400', icon: 'bg-emerald-500' },
  'public-health': { bg: 'from-rose-50 to-rose-100', text: 'text-rose-700', border: 'border-rose-200 hover:border-rose-400', icon: 'bg-rose-500' },
};

export default function DataSources() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = useMemo(() => {
    let sources = dataSources;
    
    if (selectedCategory) {
      sources = sources.filter(s => s.category === selectedCategory);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      sources = sources.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.dataTypes.some(dt => dt.toLowerCase().includes(query))
      );
    }
    
    return sources;
  }, [selectedCategory, searchQuery]);

  const categories = getAllCategories();

  return (
    <>
      <SEO
        title="Data Sources | Government & Institutional Data Providers | Ready Signal"
        description="Access curated data from trusted sources including the Bureau of Labor Statistics, Federal Reserve, Census Bureau, and more for your predictive analytics models."
      />
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Database className="w-4 h-4" />
                Curated Data Sources
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Trusted Data Sources
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                40,000+ data sources generating 3 million+ features
              </p>
              <p className="text-lg text-gray-400 mb-12">
                All data is normalized, cleaned, and ready for your predictive models
              </p>

              {/* Category Pills */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(cat => {
                  const Icon = categoryIcons[cat];
                  const colors = categoryColors[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'bg-white text-gray-900 shadow-lg'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {categoryLabels[cat]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <section className="bg-white border-b sticky top-20 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search select data sources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Data Sources Grid */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSources.map((source) => {
                const colors = categoryColors[source.category];
                const Icon = categoryIcons[source.category];
                const featuresForSource = dataFeatures.filter(f => f.sourceId === source.id).slice(0, 3);
                
                return (
                  <div
                    key={source.id}
                    className={`bg-gradient-to-br ${colors.bg} p-6 rounded-2xl border-2 ${colors.border} transition-all hover:shadow-lg group`}
                  >
                    <div className="flex items-start mb-4">
                      <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{source.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{source.description}</p>
                    
                    {/* Data Types */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {source.dataTypes.slice(0, 4).map(type => (
                        <span key={type} className="text-xs bg-white/80 text-gray-700 px-2 py-1 rounded-md">
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Sample Features */}
                    {featuresForSource.length > 0 && (
                      <div className="border-t border-gray-200/50 pt-4 mt-4">
                        <p className="text-xs font-semibold text-gray-500 mb-2">SAMPLE FEATURES:</p>
                        <ul className="space-y-1">
                          {featuresForSource.map(feature => (
                            <li key={feature.slug}>
                              <Link 
                                to={`/data/${feature.slug}/`}
                                className={`text-sm ${colors.text} hover:underline flex items-center gap-1`}
                              >
                                <BarChart3 className="w-3 h-3" />
                                {feature.shortName || feature.name.substring(0, 40)}...
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {source.website && (
                      <a
                        href={source.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 mt-4"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Official Website
                      </a>
                    )}
                  </div>
                );
              })}
            </div>

            {filteredSources.length === 0 && (
              <div className="text-center py-16">
                <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No sources found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Popular Data Features</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore some of our most-used economic indicators and data signals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dataFeatures.slice(0, 8).map(feature => (
                <Link
                  key={feature.slug}
                  to={`/data/${feature.slug}/`}
                  className="p-5 bg-gray-50 rounded-xl hover:bg-blue-50 hover:border-blue-200 border-2 border-gray-100 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-blue-500" />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">{feature.dateGrain}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                    {feature.shortName || feature.name}
                  </h3>
                  <p className="text-sm text-gray-500">{feature.sourceName}</p>
                </Link>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/data-catalog/"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Explore All Features
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-amber-500 to-amber-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Using Our Data Today
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Get instant access to curated, model-ready data from trusted sources
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                to="/how-it-works/"
                className="inline-flex items-center gap-2 bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-800 transition-all border-2 border-white"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

