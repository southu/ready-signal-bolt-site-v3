import SEO from '../../components/SEO';
import Hero from './Hero';
import TrustBanner from './TrustBanner';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import FinalCTA from './FinalCTA';

/**
 * Marketing landing page at /ai-marketing-data.
 * Strictly additive: composes landing-only sections; does not touch Home.tsx
 * or other previously-shipping pages.
 *
 * Sections (in order): Hero → Trust Banner → How It Works → Benefits → Final CTA
 * (HubSpot form embed + Start Free Trial).
 */
function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Stop Reacting. Start Predicting. | Ready Signal"
        description="Reduce forecast error by ~50% with 40,000+ validated external data signals. Discover Granger-tested economic, weather, and labor indicators that anticipate market shifts before they hit your P&L."
        canonical="https://www.readysignal.com/ai-marketing-data"
      />

      <main>
        <Hero />
        <TrustBanner />
        <HowItWorks />
        <Benefits />
        <FinalCTA />
      </main>
    </div>
  );
}

export default Landing;
