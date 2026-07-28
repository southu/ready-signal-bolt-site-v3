import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { logEvent } from '../../lib/analytics';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type FinalCtaContent = typeof FORECASTING_LANDING_CONTENT.finalCta;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setPrefersReducedMotion(query.matches);

    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

const VARIANT_SELECTOR_ID = 'forecasting-variant-selector';

type ForecastingFinalCTAProps = {
  content: FinalCtaContent;
};

/**
 * Closing panel. The primary CTA sends the reader back up to the variant
 * selector — the page's one real conversion step — rather than into a generic
 * contact form, so it is a button that scrolls in place, not a link.
 */
function ForecastingFinalCTA({ content }: ForecastingFinalCTAProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const scrollToVariantSelector = () => {
    logEvent('ForecastingLanding', 'Final CTA Click', content.primaryCta);

    const target = document.getElementById(VARIANT_SELECTOR_ID);
    if (!target) return;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  };

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      };

  return (
    <section
      id="forecasting-final-cta"
      aria-labelledby="forecasting-final-cta-heading"
      className="border-t border-rs-dark/10 bg-rs-light-gray py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <h2
            id="forecasting-final-cta-heading"
            className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/85 sm:text-lg">
            {content.supportingCopy}
          </p>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={scrollToVariantSelector}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-rs-yellow px-6 py-3 font-semibold text-rs-dark shadow-md transition-all hover:bg-yellow-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:px-8"
            >
              {content.primaryCta}
              <ArrowUp className="h-5 w-5 shrink-0" aria-hidden="true" />
            </button>
            {/* Part 9's "Footer CTA" maps to this secondary link, not the primary
                button: it is the page's last, footer-adjacent outbound control,
                and the primary button only scrolls back up (Final CTA Click). */}
            <a
              href="/contact-us/"
              onClick={() => logEvent('ForecastingLanding', 'Footer CTA Click', content.secondaryCta)}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-rs-dark/25 bg-white px-6 py-3 font-semibold text-rs-dark transition-colors hover:border-rs-dark/50 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:px-8"
            >
              {content.secondaryCta}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default ForecastingFinalCTA;
