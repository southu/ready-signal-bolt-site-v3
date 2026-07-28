import { useEffect, useState } from 'react';
import SEO from '../../components/SEO';
import Footer from '../../components/Footer';
import ForecastingHero from './ForecastingHero';
import ForecastingTrustBar from './ForecastingTrustBar';
import ForecastingVariantSelector from './ForecastingVariantSelector';
import ForecastingGuideModal, { ForecastingGuideVariant } from './ForecastingGuideModal';
import ForecastingProcessTimeline from './ForecastingProcessTimeline';
import ForecastingExamples from './ForecastingExamples';
import ForecastingFeatureGrid from './ForecastingFeatureGrid';
import ForecastingIndustryTabs from './ForecastingIndustryTabs';
import ForecastingTestimonials from './ForecastingTestimonials';
import ForecastingFinalCTA from './ForecastingFinalCTA';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';
import { FORECASTING_LANDING_SCHEMA } from './forecastingLandingSchema';

const SCHEMA_SCRIPT_ID = 'forecasting-landing-jsonld';

/**
 * Forecasting landing experience at /forecasting-landing.
 * Route shell only — hero, trust, and variant content land in later passes.
 */
function ForecastingLanding() {
  const [openVariant, setOpenVariant] = useState<ForecastingGuideVariant | null>(null);

  useEffect(() => {
    let script = document.getElementById(SCHEMA_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = SCHEMA_SCRIPT_ID;
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(FORECASTING_LANDING_SCHEMA);

    return () => {
      document.getElementById(SCHEMA_SCRIPT_ID)?.remove();
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <SEO
        title={FORECASTING_LANDING_CONTENT.seo.title}
        description={FORECASTING_LANDING_CONTENT.seo.description}
        canonical={FORECASTING_LANDING_CONTENT.seo.canonical}
      />

      <main>
        <ForecastingHero content={FORECASTING_LANDING_CONTENT.hero} />
        <ForecastingTrustBar content={FORECASTING_LANDING_CONTENT.trustBar} />
        <ForecastingVariantSelector
          content={FORECASTING_LANDING_CONTENT.variantSelector}
          onSelectVariant={setOpenVariant}
        />
        <ForecastingProcessTimeline content={FORECASTING_LANDING_CONTENT.process} />
        <ForecastingExamples content={FORECASTING_LANDING_CONTENT.forecastExamples} />
        <ForecastingFeatureGrid content={FORECASTING_LANDING_CONTENT.featureGrid} />
        <ForecastingIndustryTabs
          content={FORECASTING_LANDING_CONTENT.industryTabs}
          onRequestGuide={(slug) =>
            setOpenVariant(
              FORECASTING_LANDING_CONTENT.variantSelector.cards.find((card) => card.slug === slug) ??
                null
            )
          }
        />
        <ForecastingTestimonials content={FORECASTING_LANDING_CONTENT.testimonials} />
        <ForecastingFinalCTA content={FORECASTING_LANDING_CONTENT.finalCta} />
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
