import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import AboutHero from '../components/about/AboutHero';
import OriginStory from '../components/about/OriginStory';
import Philosophy from '../components/about/Philosophy';
import Team from '../components/about/Team';
import NorthStar from '../components/about/NorthStar';
import AboutCTA from '../components/about/AboutCTA';

function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="About Ready Signal | Precision Forecasting Experts"
        description="Learn about Ready Signal's mission to transform forecasting through signal discovery and causal validation. Meet our team of data scientists and economists."
      />
      <Navbar />

      <main>
        <AboutHero />
        <OriginStory />
        <Philosophy />
        <Team />
        <NorthStar />
        <AboutCTA />
      </main>

      <Footer />
    </div>
  );
}

export default AboutUs;
