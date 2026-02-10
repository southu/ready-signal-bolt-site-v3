import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import ManufacturingHero from '../../components/industries/manufacturing/ManufacturingHero';
import ManufacturingProblem from '../../components/industries/manufacturing/ManufacturingProblem';
import ManufacturingSolution from '../../components/industries/manufacturing/ManufacturingSolution';
import ManufacturingSignals from '../../components/industries/manufacturing/ManufacturingSignals';
import InsightsTeaserList from '../../components/InsightsTeaserList';
import { usePublishedArticles } from '../../hooks/useArticles';
import { getRelatedPosts } from '../../lib/blogHelpers';

function Manufacturing() {
  const { articles } = usePublishedArticles();
  const relatedPosts = getRelatedPosts(articles, 'manufacturing', 3);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Manufacturing Demand Forecasting | Production Planning Software"
        description="Optimize production planning with external demand signals. Track labor market indicators, commodity prices, and economic trends affecting manufacturing."
        canonical="https://readysignal.com/industries/manufacturing"
      />
      <Navbar />

      <main>
        <ManufacturingHero />
        <ManufacturingProblem />
        <ManufacturingSolution />
        <ManufacturingSignals />
        {relatedPosts.length > 0 && (
          <InsightsTeaserList
            title="Related Insights"
            posts={relatedPosts}
            maxItems={3}
            showViewAllLink
            bg="gray"
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Manufacturing;
