import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ContactHero from '../components/contact/ContactHero';
import PathOptions from '../components/contact/PathOptions';

function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="Contact Ready Signal | Get Started with Precision Forecasting"
        description="Contact Ready Signal to discuss your forecasting needs. Choose between self-service API access or fully managed forecasting services."
      />
      <Navbar />

      <main>
        <ContactHero />
        <PathOptions />
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
