import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PEHero from '../../components/industries/pe/PEHero';
import PEProblem from '../../components/industries/pe/PEProblem';
import PESolution from '../../components/industries/pe/PESolution';
import PEDashboard from '../../components/industries/pe/PEDashboard';
import PEDifferentiation from '../../components/industries/pe/PEDifferentiation';
import PECaseStudy from '../../components/industries/pe/PECaseStudy';
import PEDecisions from '../../components/industries/pe/PEDecisions';
import PEFAQ from '../../components/industries/pe/PEFAQ';

function PrivateEquity() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Explainable Forecasting for Private Equity Portfolios | Ready Signal"
        description="Driver-level, externally enriched forecasting for private equity portfolios. Improve portfolio company performance visibility, strengthen PE valuation support, and explain macro-driven variance with defensible, repeatable models."
        canonical="https://readysignal.com/industries/private-equity"
      />
      <Navbar />

      <main>
        <PEHero />
        <PEProblem />
        <PESolution />
        <PEDashboard />
        <PEDifferentiation />
        <PECaseStudy />
        <PEDecisions />
        <PEFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default PrivateEquity;
