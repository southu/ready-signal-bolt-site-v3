import SEO from '../../components/SEO';
import Hero from './Hero';
import TrustBanner from './TrustBanner';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import LandingAttributionFields from './LandingAttributionFields';
import MetaPixelPlaceholder from './MetaPixelPlaceholder';

/**
 * Additive preview page for the future landing redesign.
 * Composes standalone Hero + TrustBanner without touching the live home page.
 *
 * Landing-route-only: UTM/query-param capture + Meta Pixel placeholder.
 * Does not touch sitewide GTM/HubSpot tags in index.html.
 */
function LandingPreview() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Landing Preview | Ready Signal"
        description="Preview of the Ready Signal landing hero and trust banner components."
        canonical="https://www.readysignal.com/landing-preview"
      />

      {/* Meta Pixel placeholder — PENDING_PIXEL_ID, inert (no live tracking) */}
      <MetaPixelPlaceholder />

      {/* UTM / gclid / referrer capture for HubSpot form + analytics */}
      <LandingAttributionFields />

      <main>
        <Hero />
        <TrustBanner />
        <HowItWorks />
        <Benefits />
      </main>
    </div>
  );
}

export default LandingPreview;
