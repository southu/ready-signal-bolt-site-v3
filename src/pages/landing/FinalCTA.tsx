import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Landing-page final CTA: HubSpot form embed + Start Free Trial button.
 * Self-contained under src/pages/landing/ (does not modify shared components).
 */
const HUBSPOT_PORTAL_ID = '3894723';
const HUBSPOT_FORM_ID = '17d74227-1cac-49f2-923f-de99a49b6aa1';
const HUBSPOT_REGION = 'na1';

const FinalCTA = () => {
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;

    const existingScript = document.querySelector(
      `script[src*="hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}"]`
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://js.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`;
      script.defer = true;
      document.body.appendChild(script);
    }

    scriptLoaded.current = true;
  }, []);

  return (
    <section
      id="final-cta"
      aria-label="Final call to action"
      className="bg-rs-dark py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-sans">
              Ready to upgrade your business forecasts?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto font-sans">
              Get in touch with our team or start a free trial — discover the
              external signals that lead your outcomes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-rs-dark mb-4 font-sans">
                Get in Touch
              </h3>
              <div
                className="hs-form-frame hubspot-form-container"
                data-region={HUBSPOT_REGION}
                data-form-id={HUBSPOT_FORM_ID}
                data-portal-id={HUBSPOT_PORTAL_ID}
              />
            </div>

            <div className="flex flex-col items-center justify-center space-y-4">
              <a
                href="https://app.readysignal.com/auth/sign-up"
                className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <p className="text-sm text-white/70 font-sans text-center">
                No credit card required. Explore 40,000+ validated signals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
