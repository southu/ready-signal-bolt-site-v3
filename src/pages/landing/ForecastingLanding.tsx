import SEO from '../../components/SEO';
import Footer from '../../components/Footer';
import ForecastingHero from './ForecastingHero';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

/**
 * Forecasting landing experience at /forecasting-landing.
 * Route shell only — hero, trust, and variant content land in later passes.
 */
function ForecastingLanding() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <SEO
        title="Forecasting Signals | Ready Signal"
        description="Ready Signal helps forecasting teams find, validate, and maintain the external signals that explain demand."
        canonical="https://www.readysignal.com/forecasting-landing"
      />

      <main>
        <ForecastingHero content={FORECASTING_LANDING_CONTENT.hero} />
      </main>

      <Footer />
    </div>
  );
}

export default ForecastingLanding;
