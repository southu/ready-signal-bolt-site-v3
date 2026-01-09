import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, Calendar, MapPin, Grid } from 'lucide-react';

export default function DataGrainsExplained() {
  return (
    <>
      <SEO
        title="Data Grains Explained | Ready Signal"
        description="Understand geographic and time grains in Ready Signal and how they affect your signal output."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                <Grid className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Data Grains Explained
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Understanding geographic and time granularity in your signals
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What are Data Grains?</h2>
            <p className="text-gray-700 mb-4">
              Data grains determine the level of detail in your signal output. There are two types:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Geographic Grain:</strong> The spatial resolution (Country, State, City, ZIP)</li>
              <li><strong>Time Grain:</strong> The temporal resolution (Day, Week, Month, Quarter, Year)</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-bold text-gray-900">Geographic Grains</h2>
            </div>
            <div className="space-y-4">
              {[
                { grain: 'Country', desc: 'Aggregate data at the national level. Smallest output size.', rows: '~1 row per time period' },
                { grain: 'State', desc: 'Data broken down by US state/territory.', rows: '~51 rows per time period' },
                { grain: 'DMA', desc: 'Designated Market Areas for media/advertising analysis.', rows: '~210 rows per time period' },
                { grain: 'City', desc: 'Major metropolitan areas and cities.', rows: '~1,000+ rows per time period' },
                { grain: 'County', desc: 'FIPS-coded county-level data.', rows: '~3,100+ rows per time period' },
                { grain: 'ZIP', desc: 'Most granular. ZIP code level data.', rows: '~41,000+ rows per time period' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{item.grain}</h4>
                    <span className="text-sm text-cyan-600 font-medium">{item.rows}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-6 h-6 text-cyan-500" />
              <h2 className="text-2xl font-bold text-gray-900">Time Grains</h2>
            </div>
            <div className="space-y-4">
              {[
                { grain: 'Day', desc: 'Daily data points. Most granular but largest output.', example: '365 rows per year per geo' },
                { grain: 'Week', desc: 'Weekly aggregated data.', example: '52 rows per year per geo' },
                { grain: 'Month', desc: 'Monthly data. Most common for business analysis.', example: '12 rows per year per geo' },
                { grain: 'Quarter', desc: 'Quarterly aggregated data.', example: '4 rows per year per geo' },
                { grain: 'Year', desc: 'Annual data. Smallest time-based output.', example: '1 row per year per geo' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{item.grain}</h4>
                    <span className="text-sm text-cyan-600 font-medium">{item.example}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-amber-800 mb-2">Understanding Output Size</h3>
            <p className="text-amber-700 mb-3">
              Your signal output size is approximately:
            </p>
            <div className="bg-white rounded-lg p-4 font-mono text-sm text-gray-700">
              # Rows = Geo Grain × (Date Range ÷ Time Grain)
            </div>
            <p className="text-amber-700 mt-3 text-sm">
              Example: State grain + Monthly + 2 years = 51 states × 24 months = 1,224 rows
            </p>
          </div>

          <div className="bg-cyan-50 border-l-4 border-cyan-500 p-6 rounded-r-lg mb-8">
            <h3 className="font-semibold text-cyan-800 mb-2">Best Practices</h3>
            <ul className="list-disc list-inside text-cyan-700 space-y-2">
              <li>Start with coarser grains and increase granularity as needed</li>
              <li>Match your signal grain to your model's requirements</li>
              <li>Consider feature availability at different grain levels</li>
              <li>ZIP-level signals may take longer to process</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/how-to-reduce-the-size-of-your-signal/"
              className="inline-flex items-center justify-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-all"
            >
              Reduce Signal Size
            </Link>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
