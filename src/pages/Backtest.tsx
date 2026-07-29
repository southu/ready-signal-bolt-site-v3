import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import BacktestCardPanel from '../components/BacktestCardPanel';
import { cornCard, computeMetrics } from '../data/backtests';

/**
 * Public demo route (/backtest) for the reusable BacktestChart component.
 *
 * Mounts the chart with the seeded corn dataset from the backtest data module.
 * The chart body is also prerendered into the raw HTML by the build (see
 * scripts/generate-backtest.mjs + scripts/generate-og-pages.mjs), so the SVG is
 * present for crawlers / no-JS clients as well as the live React render.
 */
function Backtest() {
  const metrics = computeMetrics(cornCard);

  return (
    <div className="min-h-screen bg-white font-sans">
      <SEO
        title="Backtest: Forecast Accuracy Demo | Ready Signal"
        description="See how Ready Signal's external signals cut forecast error versus a baseline model on a real commodity-price backtest, with confidence bands over the holdout window."
        canonical="https://www.readysignal.com/backtest"
      />
      <Navbar />

      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
              Backtest
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-rs-dark sm:text-4xl">
              Ready Signal vs. a baseline forecast
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-rs-dark/85 sm:text-lg">
              A backtest holds out the most recent months, forecasts them two
              ways, then scores each forecast against what actually happened.
              Adding Ready Signal&apos;s external signals reduced error against
              the {cornCard.subtitle} holdout.
            </p>

            <dl className="mt-8 flex flex-wrap gap-8 tabular-nums">
              <div>
                <dt className="text-sm text-rs-dark/60">Baseline MAPE</dt>
                <dd className="text-2xl font-bold text-rs-dark">
                  {metrics.baseline.mape.toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-sm text-rs-dark/60">Ready Signal MAPE</dt>
                <dd className="text-2xl font-bold text-rs-dark">
                  {metrics.readySignal.mape.toFixed(1)}%
                </dd>
              </div>
              <div>
                <dt className="text-sm text-rs-dark/60">Error reduction</dt>
                <dd className="text-2xl font-bold text-rs-dark">
                  {metrics.errorReductionPct.toFixed(0)}%
                </dd>
              </div>
            </dl>

            <BacktestCardPanel card={cornCard} className="mt-10" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Backtest;
