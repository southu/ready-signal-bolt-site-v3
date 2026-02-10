import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import B2BHero from '../../components/industries/b2b/B2BHero';
import B2BProblem from '../../components/industries/b2b/B2BProblem';
import B2BSolution from '../../components/industries/b2b/B2BSolution';
import InsightsTeaserList from '../../components/InsightsTeaserList';
import { usePublishedArticles } from '../../hooks/useArticles';
import { getRelatedPosts } from '../../lib/blogHelpers';

function B2BMarketing() {
  const { articles } = usePublishedArticles();
  const relatedPosts = getRelatedPosts(articles, 'b2b-marketing', 3);

  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="B2B Marketing Forecasting | Predict Business Demand Signals"
        description="Leverage external economic signals to forecast B2B demand. Track leading indicators for business purchasing decisions and market shifts."
        canonical="https://readysignal.com/industries/b2b-marketing"
      />
      <Navbar />

      <main>
        <B2BHero />
        <B2BProblem />
        <B2BSolution />
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

export default B2BMarketing;
