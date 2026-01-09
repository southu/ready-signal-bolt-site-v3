import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import IntegrationsHero from '../components/integrations/IntegrationsHero';
import ModelAgnostic from '../components/integrations/ModelAgnostic';
import CodeFirst from '../components/integrations/CodeFirst';
import EnterprisePlatforms from '../components/integrations/EnterprisePlatforms';
import BusinessIntelligence from '../components/integrations/BusinessIntelligence';
import SecurityCompliance from '../components/integrations/SecurityCompliance';
import IntegrationsCTA from '../components/integrations/IntegrationsCTA';

function Integrations() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Integrations | Connect Ready Signal to Your Stack"
        description="Integrate Ready Signal with Python, R, Databricks, Snowflake, and BI tools. Model-agnostic API works with your existing data infrastructure."
      />
      <Navbar />

      <main>
        <IntegrationsHero />
        <ModelAgnostic />
        <CodeFirst />
        <EnterprisePlatforms />
        <BusinessIntelligence />
        <SecurityCompliance />
        <IntegrationsCTA />
      </main>

      <Footer />
    </div>
  );
}

export default Integrations;
