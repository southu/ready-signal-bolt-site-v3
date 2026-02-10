import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { ReadySignalInteractiveDemo } from '../components/ReadySignalInteractiveDemo';

export default function Demo() {
  return (
    <>
      <SEO
        title="Interactive Demo | Ready Signal"
        description="Experience the Ready Signal workflow in this interactive demo. See how external data enhancement improves forecasting accuracy."
      />
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-br from-slate-50 to-white min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <ReadySignalInteractiveDemo />
        </div>
      </div>

      <Footer />
    </>
  );
}
