import { useState } from 'react';
import SEO from '../../components/SEO';
import Footer from '../../components/Footer';
import ForecastingHero from './ForecastingHero';
import ForecastingTrustBar from './ForecastingTrustBar';
import ForecastingVariantSelector from './ForecastingVariantSelector';
import ForecastingGuideModal, { ForecastingGuideVariant } from './ForecastingGuideModal';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

/**
 * Forecasting landing experience at /forecasting-landing.
 * Route shell only — hero, trust, and variant content land in later passes.
 */
function ForecastingLanding() {
  const [openVariant, setOpenVariant] = useState<ForecastingGuideVariant | null>(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <SEO
        title="Forecasting Signals | Ready Signal"
        description="Ready Signal helps forecasting teams find, validate, and maintain the external signals that explain demand."
        canonical="https://www.readysignal.com/forecasting-landing"
      />

      <main>
        <ForecastingHero content={FORECASTING_LANDING_CONTENT.hero} />
        <ForecastingTrustBar content={FORECASTING_LANDING_CONTENT.trustBar} />
        <ForecastingVariantSelector
          content={FORECASTING_LANDING_CONTENT.variantSelector}
          onSelectVariant={setOpenVariant}
        />
      </main>

      <ForecastingGuideModal
        isOpen={openVariant !== null}
        variant={openVariant}
        onClose={() => setOpenVariant(null)}
      />

      <Footer />
    </div>
  );
}

export default ForecastingLanding;
