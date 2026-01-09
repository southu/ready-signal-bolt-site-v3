import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import SupplyChainHero from '../../components/industries/supplychain/SupplyChainHero';
import SupplyChainProblem from '../../components/industries/supplychain/SupplyChainProblem';
import SupplyChainSolution from '../../components/industries/supplychain/SupplyChainSolution';
import SupplyChainIndices from '../../components/industries/supplychain/SupplyChainIndices';

const SupplyChainFAQ = () => (
  <section className="bg-rs-light-gray py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-rs-dark mb-2">
          How does Ready Signal help with commodity price forecasting?
        </h3>
        <p className="text-rs-dark opacity-75 leading-relaxed">
          Ready Signal helps procurement teams hedge against inflation by validating leading indicators for Global
          Commodity Indices (Steel, Resin, Grain) up to 3 months in advance.
        </p>
      </div>
    </div>
  </section>
);

function SupplyChain() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Commodity Price Forecasting | Raw Material Cost Prediction Software"
        description="Hedge against inflation with leading indicators for Global Commodity Indices. Predict Steel, Resin, and Grain prices up to 3 months in advance."
        canonical="https://readysignal.com/industries/supply-chain"
      />
      <Navbar />

      <main>
        <SupplyChainHero />
        <SupplyChainProblem />
        <SupplyChainSolution />
        <SupplyChainIndices />
        <SupplyChainFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default SupplyChain;
