import SEO from '../../components/SEO';
import Footer from '../../components/Footer';

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
        <h1>Forecasting Landing — Coming Soon</h1>
      </main>

      <Footer />
    </div>
  );
}

export default ForecastingLanding;
