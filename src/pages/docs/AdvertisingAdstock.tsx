import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import { ArrowLeft, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function AdvertisingAdstock() {
  return (
    <>
      <SEO
        title="What does Advertising Adstock Mean? | Ready Signal"
        description="Advertising adstock models an advertisement's build and decay throughout its lifecycle."
      />
      <Navbar />

      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            to="/help-center/"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Help Center
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              What does Advertising Adstock Mean?
            </h1>
            <p className="text-xl text-gray-600">
              Advertising adstock models an advertisement's build and decay throughout its lifecycle
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is the Business Challenge?</h2>
            <p className="text-gray-700 mb-4">
              In saturated advertising mediums (constant TV ads, online ads), it's critical to understand and model advertisement lifecycle to optimize campaign reach and budget allocation.
            </p>
            <p className="text-gray-700">
              The effect of advertising doesn't disappear immediately - awareness builds over time and then gradually decays. Understanding this pattern is essential for accurate marketing mix modeling.
            </p>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Adstock?</h2>
            <p className="text-gray-700 mb-4">
              Adstock is a model to understand how an advertisement builds and decays in the consumer market. Advertising builds awareness that slowly falls (decays) back to a pre-defined base level.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mt-6 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">The Adstock Formula:</h4>
              <p className="text-gray-700 mb-2">
                <code className="bg-gray-200 px-2 py-1 rounded">A(t) = T(t) + λ * A(t-1)</code>
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 mt-4">
                <li><strong>A(t)</strong> = Adstock value at time t</li>
                <li><strong>T(t)</strong> = Amount of advertising at time t</li>
                <li><strong>λ (lambda)</strong> = Decay rate of advertisement value (0 to 1)</li>
              </ul>
            </div>
            <p className="text-gray-700">
              The <strong>half-life</strong> concept is key: it represents how long it takes for consumer awareness to decay by 50%. A proper adstock decay model can accurately depict this consumer awareness decay.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-800 mb-2">How will Ready Signal Help?</p>
                <p className="text-amber-700">
                  Ready Signal allows you to apply adstock transformations to your advertising data with one click. Configure the decay rate to match your industry benchmarks and see the transformed data immediately.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">References</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Munich Personal RePEc Archive - Joseph Joy</li>
              <li>RStudio resource - Gabriel Mohanna</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/overview-of-data-science-treatments/"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              View All Treatments
            </Link>
            <Link
              to="/help-center/"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Help Center
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
