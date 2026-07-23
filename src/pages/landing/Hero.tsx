import { ArrowRight } from 'lucide-react';

/**
 * Standalone landing-page Hero for future redesign work.
 * Not wired into the live home page — used only by the /landing-preview route.
 */
const Hero = () => {
  return (
    <section className="relative bg-rs-light-gray py-16 sm:py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-rs-dark leading-tight font-sans">
              Stop Reacting. Start Predicting.
            </h1>

            <p className="text-lg sm:text-xl text-rs-dark leading-relaxed font-sans max-w-2xl mx-auto">
              Reduce forecast error by ~50% with access to 40,000+ validated
              external data signals — anticipate market shifts before they hit
              your P&amp;L.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Start Free Trial CTA — same href and styles as HeroSection.tsx */}
            <a
              href="https://app.readysignal.com/auth/sign-up"
              className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
