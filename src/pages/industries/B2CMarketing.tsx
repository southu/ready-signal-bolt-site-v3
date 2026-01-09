import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SEO from '../../components/SEO';
import B2CHero from '../../components/industries/b2c/B2CHero';
import B2CProblem from '../../components/industries/b2c/B2CProblem';
import B2CSolution from '../../components/industries/b2c/B2CSolution';

function B2CMarketing() {
  return (
    <div className="min-h-screen bg-white">
      <SEO
        title="B2C Marketing Forecasting | Predict Consumer Behavior Trends"
        description="Forecast consumer demand with external signals. Track economic indicators, weather patterns, and labor stats that influence consumer purchasing."
        canonical="https://readysignal.com/industries/b2c-marketing"
      />
      <Navbar />

      <main>
        <B2CHero />
        <B2CProblem />
        <B2CSolution />
      </main>

      <Footer />
    </div>
  );
}

export default B2CMarketing;
