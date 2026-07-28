import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Database, Plug, Search } from 'lucide-react';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type FeatureGridContent = typeof FORECASTING_LANDING_CONTENT.featureGrid;

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

/**
 * One outlined icon per feature, keyed by the feature title in
 * `forecastingLandingContent`. Each icon restates the capability the card
 * describes: collection, discovery, validation, integration.
 */
const FEATURE_ICON = {
  'Replace weeks of manual data collection.': Database,
  'Discover signals worth testing.': Search,
  'Validate before modeling.': CheckCircle,
  'Work with your existing tools.': Plug,
} as const;

type ForecastingFeatureGridProps = {
  content: FeatureGridContent;
};

/**
 * Feature grid — the page's answer to "why is this better?". Four equal cards,
 * four across from `lg` up, two across on tablet, stacked on mobile.
 */
function ForecastingFeatureGrid({ content }: ForecastingFeatureGridProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Heading then cards fade upward once, 40ms apart. Under reduced motion the
  // props drop out entirely so everything paints visible, with no transform,
  // no delay, and nothing to scroll into.
  const reveal = (index: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
          transition: {
            duration: 0.4,
            ease: 'easeOut' as const,
            delay: index * 0.04,
          },
        };

  return (
    <section
      id="forecasting-features"
      aria-labelledby="forecasting-features-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal(0)} className="mx-auto max-w-3xl text-center">
          <h2
            id="forecasting-features-heading"
            className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
        </motion.div>

        {/* auto-rows-fr keeps every card in a row the same height, so the four
            match at each breakpoint regardless of how the copy wraps. */}
        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.features.map((feature, index) => {
            const Icon = FEATURE_ICON[feature.title as keyof typeof FEATURE_ICON];

            return (
              <motion.div key={feature.title} {...reveal(index + 1)} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border-2 border-rs-dark/10 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-rs-dark/30 hover:shadow-md sm:p-6">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rs-cyan/10">
                    <Icon className="h-6 w-6 text-rs-cyan" aria-hidden="true" strokeWidth={2} />
                  </span>

                  <h3 className="mt-5 text-lg font-bold leading-snug text-rs-dark sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-rs-dark/75">{feature.body}</p>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ForecastingFeatureGrid;
