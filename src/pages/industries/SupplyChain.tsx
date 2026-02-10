import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import SupplyChainHero from '../../components/industries/supplychain/SupplyChainHero';
import SupplyChainProblem from '../../components/industries/supplychain/SupplyChainProblem';
import SupplyChainSolution from '../../components/industries/supplychain/SupplyChainSolution';
import SupplyChainIndices from '../../components/industries/supplychain/SupplyChainIndices';
import SupplyChainDifferentiation from '../../components/industries/supplychain/SupplyChainDifferentiation';
import SupplyChainUseCases from '../../components/industries/supplychain/SupplyChainUseCases';
import SupplyChainDecisions from '../../components/industries/supplychain/SupplyChainDecisions';
import SupplyChainOnboarding from '../../components/industries/supplychain/SupplyChainOnboarding';
import SupplyChainFAQ from '../../components/industries/supplychain/SupplyChainFAQ';

function SupplyChain() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Supply Chain Forecasting That Explains What Changed—and Why | Ready Signal"
        description="Supply chain forecasting that explains what changed—and why—by using external drivers to produce explainable forecasts your teams can trust and act on."
        canonical="https://readysignal.com/industries/supply-chain"
      />
      <Navbar />

      <main>
        <SupplyChainHero />
        <SupplyChainProblem />
        <SupplyChainSolution />
        <SupplyChainIndices />
        <SupplyChainDifferentiation />
        <SupplyChainUseCases />
        <SupplyChainDecisions />
        <SupplyChainOnboarding />
        <SupplyChainFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default SupplyChain;
