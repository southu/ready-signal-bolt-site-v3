import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, Zap, BarChart3, Lightbulb } from 'lucide-react';

const TreatmentCard = ({
  name,
  description,
  link
}: {
  name: string;
  description: string;
  link?: string;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
    <h4 className="font-semibold text-gray-900 mb-2">{name}</h4>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    {link && (
      <Link to={link} className="text-amber-600 hover:text-amber-700 text-sm font-medium">
        Learn more
      </Link>
    )}
  </div>
);

export default function DataScienceTreatments() {
  const treatments = {
    temporal: [
      { name: 'Lead/Lag', description: 'Forward shift and backshift operators that offset time series data' },
      { name: 'Ad Stock Decayed', description: 'Models the prolonged or lagged effect of advertising on consumer purchase behavior', link: '/what-does-advertising-adstock-mean/' },
      { name: 'Differencing', description: 'Removes temporal dependence from time series datasets' },
      { name: 'Seasonal Differencing', description: 'Removes seasonal dependence from time series', link: '/what-is-seasonal-adjustment/' },
    ],
    ladder: [
      { name: 'Natural Log (-10 to 10)', description: 'Strong transformation reducing right skewness', link: '/what-is-a-logarithmic-transformation/' },
      { name: 'Exponential', description: 'Strong transformation for growth modeling' },
      { name: 'Inversion', description: 'Very strong transformation (reciprocal x to 1/x)' },
      { name: 'Square Root', description: 'Moderate transformation for reducing right skewness, works with zero values' },
      { name: 'Arcsine', description: 'Arcsine square root transformation for proportions' },
      { name: 'Cube Root', description: 'Fairly strong transformation, works with zero and negative values' },
      { name: 'Squared', description: 'Moderate transformation for quadratic functions' },
      { name: 'Box-Cox', description: 'Uses optimal lambda value (-5 to 5) for normal distribution approximation', link: '/what-is-a-box-cox-transformation/' },
      { name: 'Order-Norm', description: 'Rank-based procedure mapping values to percentile of normal distribution', link: '/what-is-an-order-norm-transformation/' },
      { name: 'Yeo-Johnson', description: 'Power transformation allowing zero and negative values', link: '/what-is-a-yeo-johnson-power-transformation/' },
    ],
    indexing: [
      { name: 'Standardized', description: 'Scaling using (V - min V)/(max V - min V)' },
      { name: 'Seasonally Adjusted', description: 'Removes predictable seasonal patterns', link: '/what-is-seasonal-adjustment/' },
      { name: 'Min Max Scaling', description: 'Divides each value by the range' },
    ],
  };

  return (
    <>
      <SEO
        title="Overview of Data Science Treatments | Ready Signal"
        description="Learn about the variety of Data Science Treatments that can be applied to features within a signal to improve data usefulness."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Data Science Treatments
                </h1>
                <p className="text-xl text-gray-600 mt-2">Transform and optimize your data</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <p className="text-gray-700 mb-4">
              Ready Signal provides a variety of Data Science Treatments that can be applied to features within a signal to improve data usefulness for your models.
            </p>
            <p className="text-gray-700">
              Treatments are applied at the <strong>individual feature level</strong>, allowing you to customize transformations for each data source.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-1">Pro Tip: Duplicate Features</p>
                <p className="text-amber-700">
                  Duplicate features to test different treatments and compare results. This allows you to see which transformation works best for your specific use case.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How to Add a Data Science Treatment</h2>
            <p className="text-gray-700 mb-4">
              From the Signal management page, click on any feature to open its details panel. You'll find the Data Science Treatments section where you can select and configure transformations.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-900">Temporal Treatments</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {treatments.temporal.map((t, i) => (
                <TreatmentCard key={i} {...t} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-900">Ladder Transformations</h2>
            </div>
            <p className="text-gray-600 mb-6">
              Ladder transformations help normalize data distributions and reduce skewness.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {treatments.ladder.map((t, i) => (
                <TreatmentCard key={i} {...t} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900">Indexing</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {treatments.indexing.map((t, i) => (
                <TreatmentCard key={i} {...t} />
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-300 mb-6">
              Create your first signal and start applying data science treatments to optimize your forecasting models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/how-to-create-a-signal/"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all"
              >
                Create a Signal
              </Link>
              <a
                href="https://app.readysignal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Go to Platform
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
