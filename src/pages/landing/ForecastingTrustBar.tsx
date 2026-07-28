import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type TrustBarContent = typeof FORECASTING_LANDING_CONTENT.trustBar;

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

type ForecastingTrustBarProps = {
  content: TrustBarContent;
};

/**
 * Trust strip below the forecasting hero. The three names are the only
 * campaign-approved ones (docs/landing-page-social-proof.md) and render as text
 * tiles — the site has no customer logo assets, so none are invented here.
 */
function ForecastingTrustBar({ content }: ForecastingTrustBarProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Under reduced motion the props drop out entirely so the strip paints
  // visible, with nothing to scroll into.
  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        whileInView: { opacity: 1 },
        viewport: { once: true, amount: 0.2, margin: '0px 0px 25% 0px' },
        transition: { duration: 0.5, ease: 'easeOut' as const },
      };

  return (
    <section
      aria-labelledby="forecasting-trust-bar-heading"
      className="border-y border-rs-dark/10 bg-white py-10 sm:py-12"
    >
      {/* Opacity-only entrance: the strip already occupies its full height on
          paint, so the fade cannot shift anything above or below it. The bottom
          margin starts the reveal just before the strip reaches the viewport,
          so it is never left blank for a reader who lands mid-scroll. */}
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="forecasting-trust-bar-heading"
            className="text-lg font-bold text-rs-dark sm:text-xl"
          >
            {content.headline}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-rs-dark/85 sm:text-base">
            {content.supportingCopy}
          </p>
        </div>

        {/* One per row on narrow widths so every name stays legible and present;
            all three sit in a single row from the sm breakpoint up. */}
        <ul className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {content.companies.map((company) => (
            <li
              key={company}
              className="flex h-16 items-center justify-center rounded-xl border border-rs-dark/10 bg-rs-light-gray px-5 text-lg font-bold tracking-wide text-rs-dark sm:h-20 sm:text-xl"
            >
              {company}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

export default ForecastingTrustBar;
