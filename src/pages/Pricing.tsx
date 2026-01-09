import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PricingHero from '../components/pricing/PricingHero';
import ValueProposition from '../components/pricing/ValueProposition';
import PricingTable from '../components/pricing/PricingTable';
import PlanDetails from '../components/pricing/PlanDetails';
import PricingFAQ from '../components/pricing/PricingFAQ';

function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Pricing | Ready Signal Plans & Packages"
        description="Flexible pricing for signal discovery and precision forecasting. Start free with API access or choose managed forecasting services for enterprise."
      />
      <Navbar />

      <main>
        <PricingHero />
        <ValueProposition />
        <PricingTable />
        <PlanDetails />
        <PricingFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Pricing;
