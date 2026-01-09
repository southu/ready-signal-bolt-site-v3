import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import SolutionsHero from '../components/solutions/SolutionsHero';
import BlackBoxLiability from '../components/solutions/BlackBoxLiability';
import ManagedForecasting from '../components/solutions/ManagedForecasting';
import MarketOutlook from '../components/solutions/MarketOutlook';
import PrivateEquity from '../components/solutions/PrivateEquity';
import CustomerTestimonial from '../components/solutions/CustomerTestimonial';
import EngagementRoadmap from '../components/solutions/EngagementRoadmap';
import SolutionsSecurity from '../components/solutions/SolutionsSecurity';
import SolutionsCTA from '../components/solutions/SolutionsCTA';
import SolutionsFAQ from '../components/solutions/SolutionsFAQ';

function Solutions() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Managed Precision Forecasting | Human-in-the-Loop Predictive AI"
        description="A fully managed forecasting service for CFOs and Supply Chain leaders. We provide expert governance, narrative explainability, and risk scenario modeling."
      />
      <Navbar />

      <main>
        <SolutionsHero />
        <BlackBoxLiability />
        <ManagedForecasting />
        <MarketOutlook />
        <PrivateEquity />
        <CustomerTestimonial />
        <EngagementRoadmap />
        <SolutionsSecurity />
        <SolutionsCTA />
        <SolutionsFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Solutions;
