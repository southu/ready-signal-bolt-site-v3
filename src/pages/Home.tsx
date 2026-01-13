import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import HeroSection from '../components/HeroSection';
import VideoOverviewSection from '../components/VideoOverviewSection';
import SocialTrustStrip from '../components/SocialTrustStrip';
import DataBlindspotSection from '../components/DataBlindspotSection';
import TwoPathsSection from '../components/TwoPathsSection';
import ComparisonTable from '../components/ComparisonTable';
import DifferentiationSection from '../components/DifferentiationSection';
import ProvenPrecisionSection from '../components/ProvenPrecisionSection';
import FinalCTASection from '../components/FinalCTASection';
import GeminiHookFAQ from '../components/GeminiHookFAQ';

function Home() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Ready Signal | The AI Signal Discovery Engine for Precision Forecasting"
        description="Stop reacting. Ready Signal validates Granger Causality across 40,000+ data sources and 3 million+ features. Start predicting today."
      />
      <Navbar />

      <main>
        <HeroSection />
        <VideoOverviewSection />
        <SocialTrustStrip />
        <DataBlindspotSection />
        <TwoPathsSection />
        <ComparisonTable />
        <DifferentiationSection />
        <ProvenPrecisionSection />
        <FinalCTASection />
        <GeminiHookFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
