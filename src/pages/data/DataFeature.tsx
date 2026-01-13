import { useParams, Link, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { getFeatureBySlug, dataFeatures, getFeaturesBySource } from '../../data/dataFeatures';
import { getSourceById } from '../../data/dataSources';
import { 
  TrendingUp, 
  ArrowRight, 
  Building2, 
  Calendar, 
  MapPin, 
  Tag,
  BarChart3,
  Download,
  ExternalLink,
  ChevronRight,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react';

export default function DataFeature() {
  const { slug } = useParams<{ slug: string }>();
  const feature = slug ? getFeatureBySlug(slug) : undefined;

  if (!feature) {
    // Try to find a partial match for similar features
    const suggestions = dataFeatures.filter(f => 
      f.slug.includes(slug || '') || f.name.toLowerCase().includes(slug?.toLowerCase() || '')
    ).slice(0, 4);

    return (
      <>
        <SEO
          title="Data Feature Not Found | Ready Signal"
          description="The requested data feature could not be found."
        />
        <Navbar />
        <div className="pt-20 min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <BarChart3 className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Data Feature Not Found</h1>
            <p className="text-gray-600 mb-8">
              The data feature "{slug}" doesn't exist or may have been moved.
            </p>
            
            {suggestions.length > 0 && (
              <div className="mb-8">
                <h3 className="font-semibold text-gray-700 mb-4">Similar Features:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestions.map(s => (
                    <Link
                      key={s.slug}
                      to={`/data/${s.slug}/`}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      {s.shortName || s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            <Link
              to="/data-sources/"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse All Data Sources
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const source = getSourceById(feature.sourceId);
  const relatedFeatures = getFeaturesBySource(feature.sourceId)
    .filter(f => f.slug !== feature.slug)
    .slice(0, 4);

  // Build structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": feature.name,
    "description": feature.description,
    "url": `https://www.readysignal.com/data/${feature.slug}/`,
    "keywords": feature.seoKeywords.join(", "),
    "creator": {
      "@type": "Organization",
      "name": feature.sourceName,
    },
    "temporalCoverage": feature.dateGrain,
    "spatialCoverage": feature.geoGrain === 'USA' ? 'United States' : feature.geoGrain,
    "provider": {
      "@type": "Organization",
      "name": "Ready Signal",
      "url": "https://www.readysignal.com"
    }
  };

  return (
    <>
      <SEO
        title={`${feature.shortName || feature.name} Data for Predictive Analytics | Ready Signal`}
        description={`${feature.description} Access ${feature.name} data with ${feature.dateGrain.toLowerCase()} frequency at the ${feature.geoGrain} level.`}
      />
      
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <Navbar />

      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/data-sources/" className="text-gray-500 hover:text-gray-700">Data Sources</Link>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900 font-medium">{feature.shortName || feature.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <TrendingUp className="w-4 h-4" />
                  {feature.category}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {feature.name}
                </h1>
                
                <p className="text-xl text-gray-300 mb-8">
                  {feature.description}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Building2 className="w-5 h-5 text-amber-400" />
                    <span>{source?.shortName || feature.sourceName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span>{feature.dateGrain}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-rose-400" />
                    <span>{feature.geoGrain}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact-us/"
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg"
                  >
                    Get This Data
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/how-it-works/"
                    className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                  >
                    See How It Works
                  </Link>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-6">Data Specifications</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Source</p>
                    <p className="text-white font-medium">{feature.sourceName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Frequency</p>
                    <p className="text-white font-medium">{feature.dateGrain}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Geographic Coverage</p>
                    <p className="text-white font-medium">
                      {feature.geoGrain === 'USA' && 'United States (National)'}
                      {feature.geoGrain === 'STATE' && 'U.S. States (50 states + DC)'}
                      {feature.geoGrain === 'COUNTRY' && 'Country Level'}
                      {!['USA', 'STATE', 'COUNTRY'].includes(feature.geoGrain) && feature.geoGrain}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Data Type</p>
                    <p className="text-white font-medium">Native Grain (Raw Data)</p>
                  </div>
                </div>

                {source?.website && (
                  <a
                    href={source.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 mt-6"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Original Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold">Use Cases</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  This data can be used in a variety of predictive analytics and business intelligence applications.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {feature.useCases.map((useCase, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                      <Target className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-800 font-medium">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-amber-600" />
                  </div>
                  <h2 className="text-3xl font-bold">Ready Signal Advantage</h2>
                </div>
                <p className="text-gray-600 mb-8">
                  Why use this data through Ready Signal instead of directly from the source?
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Pre-cleaned & Normalized</h4>
                      <p className="text-gray-600 text-sm">Data is cleaned, validated, and formatted for immediate use in models.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Multiple Grain Options</h4>
                      <p className="text-gray-600 text-sm">Convert between daily, weekly, monthly, or custom date grains.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Automatic Updates</h4>
                      <p className="text-gray-600 text-sm">Data refreshes automatically when new releases are published.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">API & Direct Integration</h4>
                      <p className="text-gray-600 text-sm">Access via REST API, Python SDK, R package, or direct BI tool connection.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords/Tags Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Tag className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-700">Related Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {feature.seoKeywords.map(keyword => (
                <span key={keyword} className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Related Features Section */}
        {relatedFeatures.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Related Data from {source?.shortName || feature.sourceName}</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedFeatures.map(related => (
                  <Link
                    key={related.slug}
                    to={`/data/${related.slug}/`}
                    className="p-6 bg-gray-50 rounded-xl hover:bg-blue-50 border-2 border-gray-100 hover:border-blue-200 transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-500 uppercase tracking-wide">{related.dateGrain}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {related.shortName || related.name}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{related.description}</p>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-10">
                <Link
                  to="/data-sources/"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
                >
                  View All Data Sources
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Use This Data?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get instant access to {feature.shortName || feature.name} and thousands of other data features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us/"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/plans/"
                className="inline-flex items-center gap-2 bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-all border-2 border-white"
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

