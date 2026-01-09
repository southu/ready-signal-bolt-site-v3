import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import CPGHero from '../../components/industries/cpg/CPGHero';
import CPGProblem from '../../components/industries/cpg/CPGProblem';
import CPGSolution from '../../components/industries/cpg/CPGSolution';
import CPGCustomerStory from '../../components/industries/cpg/CPGCustomerStory';

const CPGFAQ = () => (
  <section className="bg-rs-light-gray py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-rs-dark mb-2">
          How does Ready Signal improve CPG forecast accuracy?
        </h3>
        <p className="text-rs-dark opacity-75 leading-relaxed">
          Ready Signal improves CPG forecast accuracy by tracking Truck Transportation Employment as a leading
          indicator for consumer demand, often leading sales by 11 months.
        </p>
      </div>
    </div>
  </section>
);

function CPGRetail() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="CPG Demand Forecasting | Predict Consumer Shifts with External Data"
        description="Improve CPG forecast accuracy by tracking Truck Transportation Employment and other leading indicators. Predict consumer demand up to 11 months in advance."
        canonical="https://readysignal.com/industries/cpg-retail"
      />
      <Navbar />

      <main>
        <CPGHero />
        <CPGProblem />
        <CPGSolution />
        <CPGCustomerStory />
        <CPGFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default CPGRetail;
