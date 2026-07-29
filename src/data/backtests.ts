/**
 * Backtest chart card data module.
 *
 * Provides a typed schema for backtest chart cards, pure metric functions
 * (MAPE, RMSE, percent error reduction) computed from the series data, and a
 * seeded Commodity Prices (corn) card.
 *
 * All headline metrics are COMPUTED from the series via the pure functions
 * below — never hardcoded — so the numbers can never drift from the chart data.
 */

/** A single backtest chart card. */
export interface BacktestCard {
  /** Stable identifier / slug for the card. */
  id: string;
  /** Human-readable card title, e.g. "Commodity Prices". */
  title: string;
  /** Secondary descriptor, e.g. "Corn — $/bushel, monthly". */
  subtitle: string;
  /** Short unit label for axes/legends, e.g. "$/bushel". */
  unitLabel: string;
  /** Formats a raw value into a display string in this card's unit. */
  formatValue: (value: number) => string;
  /** X-axis labels spanning the full timeline (history + holdout). */
  monthLabels: string[];
  /** Observed history series (~24 monthly periods). */
  history: number[];
  /** Actual observed values over the holdout window (~8 periods). */
  holdoutActuals: number[];
  /** Baseline model forecast over the holdout window. */
  baselineForecast: number[];
  /** Ready Signal forecast over the holdout window. */
  readySignalForecast: number[];
  /** Confidence band half-width as a fraction, e.g. 0.08 = ±8%. */
  baselineBandWidth: number;
  /** Confidence band half-width as a fraction, e.g. 0.03 = ±3%. */
  readySignalBandWidth: number;
  /** Names of the external signals powering the Ready Signal forecast. */
  signalChips: string[];
}

/** Accuracy metrics for a single forecast against the holdout actuals. */
export interface ForecastMetrics {
  /** Mean Absolute Percentage Error, expressed as a percentage. */
  mape: number;
  /** Root Mean Squared Error, in the card's native units. */
  rmse: number;
}

/** Full metrics summary for a backtest card. */
export interface BacktestMetrics {
  baseline: ForecastMetrics;
  readySignal: ForecastMetrics;
  /** Relative reduction in MAPE from baseline to Ready Signal, as a percent. */
  errorReductionPct: number;
}

/**
 * Mean Absolute Percentage Error of a forecast versus the actuals, as a
 * percentage. Pure: depends only on its arguments.
 */
export function mape(forecast: number[], actual: number[]): number {
  if (forecast.length !== actual.length || actual.length === 0) {
    throw new Error('mape: forecast and actual must be non-empty and equal length');
  }
  const sum = actual.reduce((acc, a, i) => acc + Math.abs((forecast[i] - a) / a), 0);
  return (sum / actual.length) * 100;
}

/**
 * Root Mean Squared Error of a forecast versus the actuals, in native units.
 * Pure: depends only on its arguments.
 */
export function rmse(forecast: number[], actual: number[]): number {
  if (forecast.length !== actual.length || actual.length === 0) {
    throw new Error('rmse: forecast and actual must be non-empty and equal length');
  }
  const sumSq = actual.reduce((acc, a, i) => acc + (forecast[i] - a) ** 2, 0);
  return Math.sqrt(sumSq / actual.length);
}

/**
 * Relative reduction in error from a baseline metric to an improved metric,
 * as a percentage. Pure: depends only on its arguments.
 */
export function percentErrorReduction(baseline: number, improved: number): number {
  if (baseline === 0) {
    throw new Error('percentErrorReduction: baseline must be non-zero');
  }
  return ((baseline - improved) / baseline) * 100;
}

/**
 * Computes the full metrics summary for a card by running the pure metric
 * functions over the card's series. Never returns hardcoded numbers.
 */
export function computeMetrics(card: BacktestCard): BacktestMetrics {
  const baseline: ForecastMetrics = {
    mape: mape(card.baselineForecast, card.holdoutActuals),
    rmse: rmse(card.baselineForecast, card.holdoutActuals),
  };
  const readySignal: ForecastMetrics = {
    mape: mape(card.readySignalForecast, card.holdoutActuals),
    rmse: rmse(card.readySignalForecast, card.holdoutActuals),
  };
  return {
    baseline,
    readySignal,
    errorReductionPct: percentErrorReduction(baseline.mape, readySignal.mape),
  };
}

/** Formats a corn price as US dollars per bushel, e.g. 5.19 -> "$5.19". */
export function formatUsdPerBushel(value: number): string {
  return `$${value.toFixed(2)}`;
}

/**
 * Builds `count` sequential monthly labels (e.g. "Jan '22") starting from the
 * given month/year. Keeps the x-axis labels deterministic and in sync with the
 * series lengths.
 */
function buildMonthLabels(startMonth: number, startYear: number, count: number): string[] {
  const names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labels: string[] = [];
  for (let i = 0; i < count; i++) {
    const monthIndex = (startMonth - 1 + i) % 12;
    const year = startYear + Math.floor((startMonth - 1 + i) / 12);
    labels.push(`${names[monthIndex]} '${String(year).slice(-2)}`);
  }
  return labels;
}

const CORN_HISTORY = [
  4.42, 4.51, 4.38, 4.6, 4.85, 5.1, 4.95, 4.72, 4.55, 4.48, 4.61, 4.79,
  4.9, 5.22, 5.48, 5.31, 5.05, 4.88, 4.7, 4.59, 4.66, 4.81, 5.02, 5.19,
];

const CORN_HOLDOUT_ACTUALS = [5.35, 5.61, 6.12, 6.48, 6.3, 5.94, 5.61, 5.4];

/** Seeded Commodity Prices (corn, $/bushel, monthly) backtest card. */
export const cornCard: BacktestCard = {
  id: 'commodity-prices-corn',
  title: 'Commodity Prices',
  subtitle: 'Corn — $/bushel, monthly',
  unitLabel: '$/bushel',
  formatValue: formatUsdPerBushel,
  monthLabels: buildMonthLabels(1, 2022, CORN_HISTORY.length + CORN_HOLDOUT_ACTUALS.length),
  history: CORN_HISTORY,
  holdoutActuals: CORN_HOLDOUT_ACTUALS,
  baselineForecast: [5.28, 5.34, 5.41, 5.38, 5.29, 5.18, 5.06, 4.98],
  readySignalForecast: [5.29, 5.48, 5.82, 6.1, 6.02, 5.72, 5.48, 5.3],
  baselineBandWidth: 0.08,
  readySignalBandWidth: 0.03,
  signalChips: [
    'Drought Index',
    'Diesel Spot',
    'Port Throughput',
    'FX (USD/BRL)',
  ],
};

/** All backtest cards, keyed by id for lookup. */
export const backtestCards: BacktestCard[] = [cornCard];
