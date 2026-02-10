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
import InsightsTeaserList from '../components/InsightsTeaserList';
import { usePublishedArticles } from '../hooks/useArticles';
import { getLatestPosts } from '../lib/blogHelpers';

function Home() {
  const { articles } = usePublishedArticles();
  const latestPosts = getLatestPosts(articles, 3);

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
        {latestPosts.length > 0 && (
          <InsightsTeaserList
            title="Latest Thinking"
            posts={latestPosts}
            maxItems={3}
            showViewAllLink
            bg="gray"
          />
        )}
        <FinalCTASection />
        <GeminiHookFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
