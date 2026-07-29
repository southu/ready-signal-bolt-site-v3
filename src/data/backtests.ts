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
 * Formats a whole-number count with thousands separators, e.g. 13000 ->
 * "13,000". Deterministic (no locale dependency) so browser and prebuild
 * renders stay byte-identical. The dataset's unit (units/wk, MWh) is carried by
 * the card's `unitLabel` axis title rather than baked into every tick.
 */
export function formatCount(value: number): string {
  return Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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

// ── Retail Demand (units/week, monthly) ──────────────────────────────────────
// Upward trend + annual (summer) seasonality + noise. A late-summer heat wave
// spikes demand across the holdout window (indices 3-6): the naive baseline
// follows the smooth seasonal curve and misses it entirely, while Ready Signal
// partially anticipates the surge — visibly closer to actuals, still short of
// the peak (honest residual).
const RETAIL_HISTORY = [
  11200, 11600, 12000, 12300, 12200, 11700, 11300, 11000, 11200, 10900, 11000, 11400,
  12000, 12400, 12800, 13100, 13000, 12500, 12100, 11800, 12000, 11800, 12200, 12600,
];

const RETAIL_HOLDOUT_ACTUALS = [13000, 13400, 14200, 18200, 19200, 17600, 15400, 14000];

/** Retail Demand (weekly units sold, monthly cadence) backtest card. */
export const retailCard: BacktestCard = {
  id: 'retail-demand',
  title: 'Retail Demand',
  subtitle: 'Weekly units sold — units/week, monthly',
  unitLabel: 'units/wk',
  formatValue: formatCount,
  monthLabels: buildMonthLabels(4, 2022, RETAIL_HISTORY.length + RETAIL_HOLDOUT_ACTUALS.length),
  history: RETAIL_HISTORY,
  holdoutActuals: RETAIL_HOLDOUT_ACTUALS,
  // Smooth seasonal baseline — never sees the heat wave.
  baselineForecast: [13100, 13500, 14100, 14300, 14450, 14350, 14150, 14000],
  // Partially anticipates the surge; undershoots the peak, leaving a residual.
  readySignalForecast: [13020, 13420, 14500, 16700, 17600, 16300, 14900, 14050],
  baselineBandWidth: 0.08,
  readySignalBandWidth: 0.035,
  signalChips: ['Heat Index', 'Foot Traffic', 'Promo Calendar'],
};

// ── Energy Load (MWh, monthly) ───────────────────────────────────────────────
// Winter-peaking load with an upward trend. A mid-winter cold snap spikes load
// across the holdout window (indices 3-6): the baseline misses it, Ready Signal
// partially anticipates it via HDD / cold-snap and gas-market signals, keeping
// an honest residual short of the peak.
const ENERGY_HISTORY = [
  8100, 8500, 9000, 9300, 9100, 8600, 8200, 7900, 8000, 8400, 8500, 8100,
  8300, 8700, 9200, 9500, 9300, 8800, 8400, 8100, 8200, 8600, 8700, 8300,
];

const ENERGY_HOLDOUT_ACTUALS = [8200, 8600, 9200, 12200, 12900, 11500, 9700, 8800];

/** Energy Load (system load, MWh, monthly cadence) backtest card. */
export const energyCard: BacktestCard = {
  id: 'energy-load',
  title: 'Energy Load',
  subtitle: 'System load — MWh, monthly',
  unitLabel: 'MWh',
  formatValue: formatCount,
  monthLabels: buildMonthLabels(10, 2021, ENERGY_HISTORY.length + ENERGY_HOLDOUT_ACTUALS.length),
  history: ENERGY_HISTORY,
  holdoutActuals: ENERGY_HOLDOUT_ACTUALS,
  // Smooth winter baseline — misses the cold snap.
  baselineForecast: [8300, 8700, 9100, 9400, 9550, 9400, 9200, 8850],
  // Partially anticipates the cold snap; undershoots the peak (honest residual).
  readySignalForecast: [8250, 8650, 9450, 11100, 11700, 10600, 9450, 8820],
  baselineBandWidth: 0.07,
  readySignalBandWidth: 0.03,
  signalChips: ['HDD / Cold Snap Index', 'Nat Gas Spot', 'Grid Interchange'],
};

/**
 * All backtest cards, rendered through the same shared card component. Order is
 * the marketing narrative: Commodity Prices, Retail Demand, Energy Load.
 */
export const backtestCards: BacktestCard[] = [cornCard, retailCard, energyCard];
