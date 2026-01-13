import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import PlatformHero from '../components/platform/PlatformHero';
import TechnicalProblem from '../components/platform/TechnicalProblem';
import CoreCapabilities from '../components/platform/CoreCapabilities';
import SKUForecasting from '../components/platform/SKUForecasting';
import CaseStudy from '../components/platform/CaseStudy';
import DeveloperExperience from '../components/platform/DeveloperExperience';
import PlatformCTA from '../components/platform/PlatformCTA';
import PlatformFAQ from '../components/platform/PlatformFAQ';

function Platform() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Signal Discovery Engine | Automate Feature Engineering & Selection"
        description="Eliminate 80% of data wrangling time. Instantly test 3 million+ features from 40,000+ data sources for causality. Pipe results directly into Python, R, or Databricks."
      />
      <Navbar />

      <main>
        <PlatformHero />
        <TechnicalProblem />
        <CoreCapabilities />
        <SKUForecasting />
        <CaseStudy />
        <DeveloperExperience />
        <PlatformCTA />
        <PlatformFAQ />
      </main>

      <Footer />
    </div>
  );
}

export default Platform;
