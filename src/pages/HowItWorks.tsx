import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import HowItWorksHero from '../components/howitworks/HowItWorksHero';
import Philosophy from '../components/howitworks/Philosophy';
import StepIngest from '../components/howitworks/StepIngest';
import StepDiscover from '../components/howitworks/StepDiscover';
import StepGovern from '../components/howitworks/StepGovern';
import StepPredict from '../components/howitworks/StepPredict';
import InteractiveDemo from '../components/howitworks/InteractiveDemo';
import HowItWorksCTA from '../components/howitworks/HowItWorksCTA';

function HowItWorks() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="How It Works | Signal Discovery Process"
        description="Learn how Ready Signal's 4-step process transforms raw data into validated forecasts: Ingest, Discover, Govern, and Predict with Granger Causality testing."
      />
      <Navbar />

      <main>
        <HowItWorksHero />
        <Philosophy />
        <StepIngest />
        <StepDiscover />
        <StepGovern />
        <StepPredict />
        <InteractiveDemo />
        <HowItWorksCTA />
      </main>

      <Footer />
    </div>
  );
}

export default HowItWorks;
