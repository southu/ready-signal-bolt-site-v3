import SEO from '../../components/SEO';
import Hero from './Hero';
import TrustBanner from './TrustBanner';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import LandingAttributionFields from './LandingAttributionFields';
import MetaPixelPlaceholder from './MetaPixelPlaceholder';

/**
 * Ad-only landing page (campaign LP). Composes standalone Hero + TrustBanner
 * without touching the live home page or organic nav/sitemap discovery.
 *
 * Landing-route-only: UTM/query-param capture + Meta Pixel placeholder.
 * Does not touch sitewide GTM/HubSpot tags in index.html.
 *
 * Primary path: /lp/campaign-preview (also mounted at /landing-preview).
 */
function LandingPreview() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Stop Reacting. Start Predicting. | Ready Signal"
        description="Reduce forecast error by ~50% with 40,000+ validated external data signals. Discover Granger-tested economic, weather, and labor indicators that anticipate market shifts before they hit your P&L."
        canonical="https://www.readysignal.com/lp/campaign-preview"
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
