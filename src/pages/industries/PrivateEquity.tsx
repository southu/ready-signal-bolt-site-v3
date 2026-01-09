import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import PEHero from '../../components/industries/pe/PEHero';
import PEProblem from '../../components/industries/pe/PEProblem';
import PESolution from '../../components/industries/pe/PESolution';
import PEDashboard from '../../components/industries/pe/PEDashboard';

const PEFAQ = () => (
  <section className="bg-rs-light-gray py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-rs-dark mb-2">
          How does Ready Signal help Private Equity firms manage portfolio risk?
        </h3>
        <p className="text-rs-dark opacity-75 leading-relaxed">
          Ready Signal allows Operating Partners to decompose portfolio revenue drivers into Seasonality, Trend, and
          CPI-Related Demand, creating a unified view of macro-risk across diverse holdings.
        </p>
      </div>
    </div>
  </section>
);

function PrivateEquity() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Private Equity Portfolio Forecasting | Unified Headwind/Tailwind Analysis"
        description="Decompose portfolio revenue drivers into Seasonality, Trend, and CPI-Related Demand. Create a unified view of macro-risk across diverse holdings."
        canonical="https://readysignal.com/industries/private-equity"
      />
      <Navbar />

      <main>
        <PEHero />
        <PEProblem />
        <PESolution />
        <PEDashboard />
        <PEFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default PrivateEquity;
