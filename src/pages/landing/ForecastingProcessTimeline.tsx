import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type ProcessContent = typeof FORECASTING_LANDING_CONTENT.process;

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

type ForecastingProcessTimelineProps = {
  content: ProcessContent;
};

/**
 * Four-step process timeline. One markup tree serves both orientations: the
 * step list is a column below `md` and a row from `md` up, and each step's
 * connector rotates from a vertical rule into a horizontal one with the same
 * breakpoint.
 */
function ForecastingProcessTimeline({ content }: ForecastingProcessTimelineProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section fades upward once. Under reduced motion the props drop out entirely
  // so the steps paint visible, with no transform and nothing to scroll into.
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
      id="forecasting-process"
      aria-labelledby="forecasting-process-heading"
      className="bg-white py-16 sm:py-20"
    >
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-rs-light-gray px-4 py-2 text-sm font-semibold text-rs-dark/80">
            {content.eyebrow}
          </span>
          <h2
            id="forecasting-process-heading"
            className="mt-4 text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/75 sm:text-lg">
            {content.intro}
          </p>
        </div>

        <ol className="mt-12 flex flex-col gap-10 md:flex-row md:gap-0">
          {content.steps.map((step, index) => {
            const isLast = index === content.steps.length - 1;

            return (
              <li
                key={step.title}
                className="relative flex gap-4 md:flex-1 md:flex-col md:gap-0 md:pr-8 md:last:pr-0"
              >
                {/* Connector runs from just past this step's marker to just
                    short of the next one: down the column on mobile (reaching
                    into the 40px list gap), across the row from md up. The
                    last step has nothing to point at. */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 left-5 top-12 w-px bg-rs-dark/15 md:bottom-auto md:left-12 md:right-3 md:top-5 md:h-px md:w-auto"
                  >
                    <ChevronRight
                      className="absolute -right-1 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-rs-dark/30 md:block"
                      strokeWidth={2}
                    />
                  </span>
                )}

                {/* The list element already conveys position, so the numeral is
                    decorative for assistive tech. */}
                <span
                  aria-hidden="true"
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-rs-cyan bg-white text-base font-bold text-rs-cyan"
                >
                  {index + 1}
                </span>

                <div className="md:mt-5">
                  <h3 className="text-lg font-bold leading-snug text-rs-dark sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-dark/75">{step.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </section>
  );
}

export default ForecastingProcessTimeline;
