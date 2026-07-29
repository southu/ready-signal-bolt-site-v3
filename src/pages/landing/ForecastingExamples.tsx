import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';
import BacktestCardPanel from '../../components/BacktestCardPanel';
import { backtestCards } from '../../data/backtests';

type ForecastExamplesContent = typeof FORECASTING_LANDING_CONTENT.forecastExamples;

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

type ForecastingExamplesProps = {
  content: ForecastExamplesContent;
};

/**
 * Forecast example cards — the page's answer to "what does this actually look
 * like?". Three real backtests (Commodity Prices, Retail Demand, Energy Load),
 * each rendered through the SAME shared `BacktestCardPanel`; the only thing that
 * differs between them is the data/config in `backtestCards`. Every card scores
 * a baseline forecast against a Ready-Signal-enhanced forecast over a holdout
 * window, with its own shock story, signal chips, unit formatting, and MAPE
 * strip computed from the series (never hard-coded).
 */
function ForecastingExamples({ content }: ForecastingExamplesProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section fades upward once. Under reduced motion the props drop out entirely
  // so the cards paint visible, with no transform and nothing to scroll into.
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
      id="forecasting-examples"
      aria-labelledby="forecasting-examples-heading"
      className="bg-rs-light-gray py-16 sm:py-20"
    >
      <motion.div {...reveal} className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="forecasting-examples-heading"
            className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/85 sm:text-lg">
            {content.supportingCopy}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {backtestCards.map((card) => (
            <BacktestCardPanel key={card.id} card={card} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ForecastingExamples;
