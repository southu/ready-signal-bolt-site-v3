import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

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

/**
 * Per-example chart data and explanation, keyed by the example title in
 * `forecastingLandingContent`. The series are invented, readable shapes — the
 * card labels them as illustrative — and both are on a shared 0-100 scale so
 * the two lines are directly comparable.
 */
const EXAMPLE_DETAIL: Record<
  string,
  { explanation: string; baseline: number[]; withSignals: number[] }
> = {
  'Revenue Forecast': {
    explanation:
      'A simplified revenue forecast enhanced with external economic and market signals.',
    baseline: [38, 41, 43, 46, 48, 51, 53, 56, 58, 61, 63, 66],
    withSignals: [37, 45, 41, 53, 48, 59, 55, 67, 61, 73, 70, 83],
  },
  'Commodity Prices': {
    explanation:
      'A simplified commodity price forecast enhanced with external supply, trade, and energy signals.',
    baseline: [61, 60, 58, 57, 55, 54, 52, 51, 49, 48, 46, 45],
    withSignals: [63, 55, 67, 53, 62, 45, 59, 41, 53, 35, 47, 29],
  },
};

// Deliberately wide: the SVG scales to the card width, so a wide viewBox is
// what keeps the rendered chart a shallow band rather than a tall block.
const CHART_WIDTH = 440;
const CHART_HEIGHT = 150;
const CHART_INSET = { top: 16, right: 22, bottom: 16, left: 16 };

function toPoints(values: number[]) {
  const innerWidth = CHART_WIDTH - CHART_INSET.left - CHART_INSET.right;
  const innerHeight = CHART_HEIGHT - CHART_INSET.top - CHART_INSET.bottom;

  return values.map((value, index) => ({
    x: CHART_INSET.left + (innerWidth * index) / (values.length - 1),
    y: CHART_INSET.top + innerHeight * (1 - value / 100),
  }));
}

function toPath(values: number[]) {
  return toPoints(values)
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
    .join(' ');
}

type ForecastChartProps = {
  title: string;
  baseline: number[];
  withSignals: number[];
};

/**
 * Two-series line chart drawn inline so the card carries no image weight.
 *
 * Nothing here animates on its own — the only motion is a transition on the
 * most-recent data point, driven by `group-hover` from the card. The series are
 * distinguished by dash pattern as well as colour so the chart still reads
 * without colour perception.
 */
function ForecastChart({ title, baseline, withSignals }: ForecastChartProps) {
  const baselineEnd = toPoints(baseline)[baseline.length - 1];
  const signalsEnd = toPoints(withSignals)[withSignals.length - 1];

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-auto w-full"
      role="img"
      aria-label={`Illustrative ${title.toLowerCase()} chart comparing a baseline forecast with a forecast that adds external signals.`}
    >
      {[25, 50, 75].map((value) => {
        const y = CHART_INSET.top + (CHART_HEIGHT - CHART_INSET.top - CHART_INSET.bottom) * (1 - value / 100);

        return (
          <line
            key={value}
            x1={0}
            x2={CHART_WIDTH}
            y1={y}
            y2={y}
            className="stroke-rs-dark/10"
            strokeWidth={1}
          />
        );
      })}

      <path
        d={toPath(baseline)}
        fill="none"
        className="stroke-rs-dark/50"
        strokeWidth={2}
        strokeDasharray="5 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={toPath(withSignals)}
        fill="none"
        className="stroke-rs-yellow"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <circle cx={baselineEnd.x} cy={baselineEnd.y} r={2.5} className="fill-rs-dark/50" />
      <circle cx={signalsEnd.x} cy={signalsEnd.y} r={3.5} className="fill-rs-yellow" />

      {/* Most-recent point emphasis. Hidden until the card is hovered, per the
          spec's "highlight changed values" rather than a looping animation. */}
      <g className="opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
        <line
          x1={signalsEnd.x}
          x2={signalsEnd.x}
          y1={CHART_INSET.top}
          y2={CHART_HEIGHT - CHART_INSET.bottom}
          className="stroke-rs-dark/20"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        <circle
          cx={signalsEnd.x}
          cy={signalsEnd.y}
          r={7}
          fill="none"
          className="stroke-rs-yellow"
          strokeWidth={2}
        />
        <text
          x={signalsEnd.x - 14}
          y={signalsEnd.y - 12}
          textAnchor="end"
          className="fill-rs-dark text-[11px] font-semibold"
        >
          Most recent period
        </text>
      </g>
    </svg>
  );
}

type ForecastingExamplesProps = {
  content: ForecastExamplesContent;
};

/**
 * Forecast example cards — the page's answer to "what does this actually look
 * like?". Two cards side by side from `lg` up, stacked below it, each pairing a
 * signal list with a small illustrative chart of the same forecast.
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
      <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="forecasting-examples-heading"
            className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/75 sm:text-lg">
            {content.supportingCopy}
          </p>
        </div>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-5 lg:grid-cols-2">
          {content.examples.map((example) => {
            const detail = EXAMPLE_DETAIL[example.title];

            return (
              <article
                key={example.title}
                className="group flex h-full flex-col rounded-2xl border-2 border-rs-dark/10 bg-white p-5 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-rs-dark/30 hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold leading-snug text-rs-dark sm:text-xl">
                    {example.title}
                  </h3>
                  <span className="shrink-0 pt-1 text-xs font-medium text-rs-dark/50">
                    {example.illustrativeLabel}
                  </span>
                </div>

                <p className="mt-2 text-sm leading-relaxed text-rs-dark/75">{detail.explanation}</p>

                <div className="mt-5">
                  <ForecastChart
                    title={example.title}
                    baseline={detail.baseline}
                    withSignals={detail.withSignals}
                  />
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-rs-dark/70">
                    {/* Swatches repeat the dash pattern used in the chart, so the
                        legend matches the lines it describes. */}
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 4" className="h-1 w-6 shrink-0" aria-hidden="true">
                        <line
                          x1={0}
                          x2={24}
                          y1={2}
                          y2={2}
                          className="stroke-rs-dark/50"
                          strokeWidth={2}
                          strokeDasharray="5 4"
                        />
                      </svg>
                      Baseline forecast
                    </span>
                    <span className="flex items-center gap-2">
                      <svg viewBox="0 0 24 4" className="h-1 w-6 shrink-0" aria-hidden="true">
                        <line
                          x1={0}
                          x2={24}
                          y1={2}
                          y2={2}
                          className="stroke-rs-yellow"
                          strokeWidth={2.5}
                        />
                      </svg>
                      Forecast with external signals
                    </span>
                  </div>
                </div>

                <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-rs-dark/50">
                  Potential Signals
                </p>
                <ul role="list" className="mt-2 space-y-1">
                  {example.signals.map((signal) => (
                    <li key={signal} className="flex items-start gap-2 text-sm text-rs-dark/85">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rs-cyan"
                        aria-hidden="true"
                      />
                      {signal}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

export default ForecastingExamples;
