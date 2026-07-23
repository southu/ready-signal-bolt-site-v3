import SEO from '../../components/SEO';
import Hero from './Hero';
import TrustBanner from './TrustBanner';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';

/**
 * Additive preview page for the future landing redesign.
 * Composes standalone Hero + TrustBanner without touching the live home page.
 */
function LandingPreview() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Landing Preview | Ready Signal"
        description="Preview of the Ready Signal landing hero and trust banner components."
        canonical="https://www.readysignal.com/landing-preview"
      />

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
