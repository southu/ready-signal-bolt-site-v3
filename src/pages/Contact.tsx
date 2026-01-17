import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import ContactHero from '../components/contact/ContactHero';
import PathOptions from '../components/contact/PathOptions';
import HubSpotForm from '../components/contact/HubSpotForm';

function Contact() {
  const location = useLocation();

  // Scroll to hash anchor on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

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
        
        {/* Contact Form Section */}
        <section id="contact-form" className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-rs-dark mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and our team will reach out within 24 hours.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <HubSpotForm />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
