/**
 * Pure SVG markup builder for the BacktestChart.
 *
 * Given a typed `BacktestCard` (see ./backtests), this produces the complete
 * `<figure>` markup — inline SVG chart plus legend — as a plain string. It is
 * the SINGLE source of truth shared by two consumers so their output can never
 * drift:
 *   1. The React `BacktestChart` component renders this string in the browser.
 *   2. The prebuild (scripts/generate-backtest.mjs, run via tsx) emits it to a
 *      static fragment that the postbuild prerenders into the raw /backtest HTML
 *      so crawlers / no-JS clients see a real chart, not an empty SPA shell.
 *
 * No hard-coded corn values live here — everything is derived from the card
 * passed in, keeping the component reusable across datasets.
 *
 * Style contract (mirrors the mission spec):
 *   - monotone-cubic interpolation on every line (no straight-segment kinks)
 *   - Actual  : solid slate #334155, no area fill beneath it
 *   - Baseline: dashed light-gray #94A3B8
 *   - Ready Signal: solid orange, thicker stroke, terminal dot on final point
 *   - orange appears ONLY on the Ready Signal line
 *   - faint semi-transparent confidence bands (RS band narrower than Baseline)
 *   - tabular numerals on all numeric labels
 */

import type { BacktestCard } from './backtests';
import { computeMetrics } from './backtests';

// ── Series colors ────────────────────────────────────────────────────────────
const ACTUAL_COLOR = '#334155'; // slate-700 — history + holdout actuals
const BASELINE_COLOR = '#94A3B8'; // slate-400 — dashed baseline forecast
// Tailwind orange-500, the warm accent already used across the marketing site
// (gradients, icons). It is the ONLY orange in this chart, reserved for the
// Ready Signal line per the mission's color contract.
const READY_SIGNAL_COLOR = '#F97316';

// Stroke widths — Ready Signal is deliberately the thickest line.
const ACTUAL_WIDTH = 2;
const BASELINE_WIDTH = 2;
const READY_SIGNAL_WIDTH = 3.5;

const BASELINE_DASH = '7 5';

// ── Layout ───────────────────────────────────────────────────────────────────
const WIDTH = 780;
const HEIGHT = 440;
const MARGIN = { top: 28, right: 96, bottom: 64, left: 70 };
const INNER_W = WIDTH - MARGIN.left - MARGIN.right;
const INNER_H = HEIGHT - MARGIN.top - MARGIN.bottom;
const GRIDLINE_COUNT = 5; // 5 gridlines = 4 equal intervals

// ── Responsive variants ──────────────────────────────────────────────────────
// The chart renders one of two windows of the SAME data. Desktop plots the full
// series; the compact "mobile" variant (used below the ~640px breakpoint) plots
// only the most-recent periods so the chart stays legible on narrow viewports.
export type BacktestChartVariant = 'desktop' | 'mobile';

export interface BacktestChartOptions {
  /** Which responsive window to render. Defaults to 'desktop'. */
  variant?: BacktestChartVariant;
}

/** Most-recent periods shown in the compact (mobile) window. */
const MOBILE_WINDOW = 12;
/** X-axis label stride per variant (mobile shows ~half the ticks: every other). */
const X_LABEL_STRIDE: Record<BacktestChartVariant, number> = { desktop: 3, mobile: 2 };

/**
 * Returns the card trimmed to the variant's plotted window. The mobile variant
 * keeps every holdout period plus the tail of history so the window is the
 * ~{@link MOBILE_WINDOW} most-recent periods; desktop returns the card unchanged.
 * The holdout series and forecasts are never trimmed, so computed metrics and the
 * holdout data table are identical across variants.
 */
function windowCard(card: BacktestCard, variant: BacktestChartVariant): BacktestCard {
  if (variant !== 'mobile') return card;
  const total = card.history.length + card.holdoutActuals.length;
  if (total <= MOBILE_WINDOW) return card;
  const keepHistory = Math.max(0, MOBILE_WINDOW - card.holdoutActuals.length);
  const removed = card.history.length - keepHistory;
  return {
    ...card,
    history: card.history.slice(removed),
    monthLabels: card.monthLabels.slice(removed),
  };
}

interface Point {
  x: number;
  y: number;
}

/** Round to 2 decimals to keep the emitted path strings compact. */
function fmt(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Minimal HTML-text escaping for user-facing labels embedded in the SVG. */
function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** "Nice" rounded number near `x`, for readable axis steps. */
function niceNum(x: number, round: boolean): number {
  if (x <= 0) return 1;
  const exp = Math.floor(Math.log10(x));
  const f = x / Math.pow(10, exp);
  let nf: number;
  if (round) {
    if (f < 1.5) nf = 1;
    else if (f < 3) nf = 2;
    else if (f < 7) nf = 5;
    else nf = 10;
  } else if (f <= 1) nf = 1;
  else if (f <= 2) nf = 2;
  else if (f <= 5) nf = 5;
  else nf = 10;
  return nf * Math.pow(10, exp);
}

/**
 * Builds exactly `GRIDLINE_COUNT` evenly spaced, nicely-rounded y ticks that
 * fully cover [dataMin, dataMax]. Guarantees 4-5 gridlines (never 6) so the
 * axis stays clean regardless of the data's magnitude.
 */
function computeYScale(dataMin: number, dataMax: number): {
  min: number;
  max: number;
  ticks: number[];
} {
  const intervals = GRIDLINE_COUNT - 1;
  let step = niceNum((dataMax - dataMin) / intervals, true);
  let min = Math.floor(dataMin / step) * step;
  let max = min + step * intervals;
  // Grow the step until 4 intervals span the whole data range.
  for (let guard = 0; guard < 24 && max < dataMax - 1e-9; guard++) {
    step = niceNum(step * 1.5, true);
    min = Math.floor(dataMin / step) * step;
    max = min + step * intervals;
  }
  const ticks: number[] = [];
  for (let k = 0; k <= intervals; k++) ticks.push(min + step * k);
  return { min, max, ticks };
}

/**
 * Monotone cubic interpolation (Fritsch–Carlson tangents, à la d3
 * curveMonotoneX). Returns an SVG path `d` string that passes through every
 * point with no overshoot — smooth curves that never wiggle past the data.
 */
function monotonePath(points: Point[]): string {
  const n = points.length;
  if (n === 0) return '';
  if (n === 1) return `M${fmt(points[0].x)},${fmt(points[0].y)}`;

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const dx: number[] = [];
  const slope: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx[i] = xs[i + 1] - xs[i];
    slope[i] = (ys[i + 1] - ys[i]) / dx[i];
  }

  // Tangents at each point.
  const t: number[] = new Array(n);
  t[0] = slope[0];
  t[n - 1] = slope[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) {
      t[i] = 0; // local extremum — flat tangent prevents overshoot
    } else {
      const w1 = 2 * dx[i] + dx[i - 1];
      const w2 = dx[i] + 2 * dx[i - 1];
      t[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]);
    }
  }

  let d = `M${fmt(xs[0])},${fmt(ys[0])}`;
  for (let i = 0; i < n - 1; i++) {
    const x1 = xs[i] + dx[i] / 3;
    const y1 = ys[i] + (t[i] * dx[i]) / 3;
    const x2 = xs[i + 1] - dx[i] / 3;
    const y2 = ys[i + 1] - (t[i + 1] * dx[i]) / 3;
    d += ` C${fmt(x1)},${fmt(y1)} ${fmt(x2)},${fmt(y2)} ${fmt(xs[i + 1])},${fmt(ys[i + 1])}`;
  }
  return d;
}

/**
 * Closed area between an upper and lower monotone boundary — used for the
 * confidence bands. Both edges use the same monotone interpolation as the
 * lines so the band hugs its forecast.
 */
function areaPath(upper: Point[], lower: Point[]): string {
  const top = monotonePath(upper);
  const bottom = monotonePath(lower.slice().reverse()).replace(/^M/, 'L');
  return `${top} ${bottom} Z`;
}

/** Shared plotted geometry (scales + derived series) for a card. */
interface ChartGeometry {
  /** Total plotted periods (history + holdout). */
  total: number;
  /** First holdout (forecast) index. */
  cut: number;
  /** Continuous Actual series: history flowing into holdout actuals. */
  actualValues: number[];
  /** Maps a timeline index to its x pixel in viewBox coordinates. */
  xAt: (i: number) => number;
  /** Maps a value to its y pixel in viewBox coordinates. */
  yAt: (v: number) => number;
  /** Resolved y-axis scale (min, max, ticks). */
  yScaleInfo: { min: number; max: number; ticks: number[] };
}

/**
 * Computes the shared plotting geometry (y domain, x/y scales, Actual series)
 * for a card. Single source of truth for coordinates so the rendered markup and
 * the interactive model (tooltip hit-targets) can never drift.
 */
function computeChartGeometry(card: BacktestCard): ChartGeometry {
  const {
    history,
    holdoutActuals,
    baselineForecast,
    readySignalForecast,
    baselineBandWidth,
    readySignalBandWidth,
  } = card;

  const total = history.length + holdoutActuals.length;
  const cut = history.length; // first holdout (forecast) index

  // Full ground-truth series: history flows straight into the holdout actuals
  // as one continuous Actual line.
  const actualValues = [...history, ...holdoutActuals];

  // ── Y domain across every plotted value, including band extents ──
  const bandExtents = (values: number[], bw: number) =>
    values.flatMap((v) => [v * (1 + bw), v * (1 - bw)]);
  const allValues = [
    ...actualValues,
    ...bandExtents(baselineForecast, baselineBandWidth),
    ...bandExtents(readySignalForecast, readySignalBandWidth),
  ];
  const dataMin = Math.min(...allValues);
  const dataMax = Math.max(...allValues);
  const yScaleInfo = computeYScale(dataMin, dataMax);

  const xAt = (i: number) => MARGIN.left + (i / (total - 1)) * INNER_W;
  const yAt = (v: number) =>
    MARGIN.top + (1 - (v - yScaleInfo.min) / (yScaleInfo.max - yScaleInfo.min)) * INNER_H;

  return { total, cut, actualValues, xAt, yAt, yScaleInfo };
}

/** A single hoverable/tappable period, with its plotted coordinates + values. */
export interface BacktestPeriod {
  /** Timeline index (0-based) across history + holdout. */
  index: number;
  /** X-axis label for this period, e.g. "Jan '22". */
  label: string;
  /** X pixel in viewBox coordinates. */
  x: number;
  /** Actual observed value at this period. */
  actual: number;
  /** Actual value's y pixel in viewBox coordinates. */
  actualY: number;
  /** True for holdout (forecast) periods; false for history. */
  isHoldout: boolean;
  /** Baseline forecast value (holdout only, else null). */
  baseline: number | null;
  /** Baseline value's y pixel in viewBox coordinates (holdout only). */
  baselineY: number | null;
  /** Ready Signal forecast value (holdout only, else null). */
  readySignal: number | null;
  /** Ready Signal value's y pixel in viewBox coordinates (holdout only). */
  readySignalY: number | null;
}

/**
 * Interactive model for the BacktestChart: the per-period data + coordinates the
 * React component needs to place tooltips and detect the hovered/tapped period.
 * Derived from the SAME geometry as the rendered SVG, so tooltip hit-targets and
 * values line up exactly with the drawn chart.
 */
export interface BacktestChartModel {
  /** viewBox width (SVG user units). */
  viewWidth: number;
  /** viewBox height (SVG user units). */
  viewHeight: number;
  /** Total plotted periods. */
  total: number;
  /** First holdout (forecast) index. */
  cut: number;
  /** Short unit label for the card, e.g. "$/bushel". */
  unitLabel: string;
  /** Formats a raw value into a display string in this card's unit. */
  formatValue: (value: number) => string;
  /** Every plotted period, in timeline order. */
  periods: BacktestPeriod[];
}

/**
 * Builds the interactive model (per-period coordinates + values) for a card.
 * Pure: all data comes from `card`, computed via the shared geometry.
 */
export function buildBacktestChartModel(
  card: BacktestCard,
  opts: BacktestChartOptions = {},
): BacktestChartModel {
  const wcard = windowCard(card, opts.variant ?? 'desktop');
  const geo = computeChartGeometry(wcard);
  const periods: BacktestPeriod[] = [];
  for (let i = 0; i < geo.total; i++) {
    const isHoldout = i >= geo.cut;
    const k = i - geo.cut;
    periods.push({
      index: i,
      label: wcard.monthLabels[i] ?? '',
      x: geo.xAt(i),
      actual: geo.actualValues[i],
      actualY: geo.yAt(geo.actualValues[i]),
      isHoldout,
      baseline: isHoldout ? wcard.baselineForecast[k] : null,
      baselineY: isHoldout ? geo.yAt(wcard.baselineForecast[k]) : null,
      readySignal: isHoldout ? wcard.readySignalForecast[k] : null,
      readySignalY: isHoldout ? geo.yAt(wcard.readySignalForecast[k]) : null,
    });
  }
  return {
    viewWidth: WIDTH,
    viewHeight: HEIGHT,
    total: geo.total,
    cut: geo.cut,
    unitLabel: wcard.unitLabel,
    formatValue: wcard.formatValue,
    periods,
  };
}

/**
 * Builds the full BacktestChart markup (SVG + legend) for a card.
 * Reusable: all data and formatting come from `card`.
 */
export function buildBacktestChartMarkup(
  card: BacktestCard,
  opts: BacktestChartOptions = {},
): string {
  const variant = opts.variant ?? 'desktop';
  const wcard = windowCard(card, variant);
  const {
    baselineForecast,
    readySignalForecast,
    baselineBandWidth,
    readySignalBandWidth,
    monthLabels,
    formatValue,
    unitLabel,
    title,
    subtitle,
  } = wcard;

  const { total, cut, actualValues, xAt, yAt, yScaleInfo } = computeChartGeometry(wcard);

  // Accessibility summary derived at render time from the SAME computed metrics
  // the card displays (never hardcoded). Metrics come from the full card — the
  // holdout window is identical across variants, so they can't drift.
  const metrics = computeMetrics(card);
  const ariaLabel = `${title} backtest: baseline forecast missed actuals by about ${metrics.baseline.mape.toFixed(
    1,
  )}%, Ready Signal forecast by about ${metrics.readySignal.mape.toFixed(1)}%`;

  const toPoints = (values: number[], startIndex: number): Point[] =>
    values.map((v, k) => ({ x: xAt(startIndex + k), y: yAt(v) }));

  // ── Confidence bands (drawn behind the lines) ──
  const band = (values: number[], bw: number) => {
    const upper = toPoints(values.map((v) => v * (1 + bw)), cut);
    const lower = toPoints(values.map((v) => v * (1 - bw)), cut);
    return areaPath(upper, lower);
  };
  const baselineBand = band(baselineForecast, baselineBandWidth);
  const readySignalBand = band(readySignalForecast, readySignalBandWidth);

  // ── Line paths ──
  const actualPath = monotonePath(toPoints(actualValues, 0));
  const baselinePath = monotonePath(toPoints(baselineForecast, cut));
  const readySignalPath = monotonePath(toPoints(readySignalForecast, cut));

  // ── Grid + y axis ──
  const gridlines = yScaleInfo.ticks
    .map((v) => {
      const y = fmt(yAt(v));
      return `      <line x1="${fmt(MARGIN.left)}" y1="${y}" x2="${fmt(
        MARGIN.left + INNER_W,
      )}" y2="${y}" stroke="#E2E8F0" stroke-width="1" />
      <text x="${fmt(MARGIN.left - 10)}" y="${fmt(
        y + 4,
      )}" text-anchor="end" font-size="12" fill="#64748B">${esc(formatValue(v))}</text>`;
    })
    .join('\n');

  // ── X axis month labels ──
  // Desktop shows ~every 3rd tick; the compact mobile window shows every other
  // tick (~half the ticks) so the labels stay readable on narrow viewports.
  const xLabels: string[] = [];
  for (let i = 0; i < total; i += X_LABEL_STRIDE[variant]) {
    const label = monthLabels[i];
    if (!label) continue;
    xLabels.push(
      `      <text x="${fmt(xAt(i))}" y="${fmt(
        MARGIN.top + INNER_H + 20,
      )}" text-anchor="middle" font-size="12" fill="#64748B">${esc(label)}</text>`,
    );
  }

  // ── Forecast divider + holdout shading ──
  const dividerX = fmt(xAt(cut));
  const holdoutX = fmt(xAt(cut));
  const holdoutW = fmt(xAt(total - 1) - xAt(cut));

  // ── Ready Signal terminal dot ──
  const lastIdx = total - 1;
  const termX = fmt(xAt(lastIdx));
  const termY = fmt(yAt(readySignalForecast[readySignalForecast.length - 1]));

  // font-variant-numeric:tabular-nums on the root <svg> inherits to every
  // <text>, so all numeric labels use tabular figures (mission requirement).
  const svg = `    <svg viewBox="0 0 ${WIDTH} ${HEIGHT}" width="100%" role="img" aria-label="${esc(
    ariaLabel,
  )}" style="font-variant-numeric:tabular-nums" class="tabular-nums h-auto w-full">
      <title>${esc(title)} — ${esc(subtitle)}</title>

      <!-- Subtle shaded holdout region (behind every series) -->
      <rect x="${holdoutX}" y="${fmt(MARGIN.top)}" width="${holdoutW}" height="${fmt(
        INNER_H,
      )}" fill="#334155" fill-opacity="0.05" />

      <!-- Horizontal gridlines + currency-formatted y ticks -->
${gridlines}

      <!-- Confidence bands: Baseline (wider) then Ready Signal (narrower) -->
      <path d="${baselineBand}" fill="${BASELINE_COLOR}" fill-opacity="0.16" stroke="none" />
      <path d="${readySignalBand}" fill="${READY_SIGNAL_COLOR}" fill-opacity="0.16" stroke="none" />

      <!-- Forecast start divider -->
      <line x1="${dividerX}" y1="${fmt(MARGIN.top)}" x2="${dividerX}" y2="${fmt(
        MARGIN.top + INNER_H,
      )}" stroke="#475569" stroke-width="1.5" stroke-dasharray="4 4" />
      <text x="${fmt(xAt(cut) + 6)}" y="${fmt(
        MARGIN.top + 12,
      )}" text-anchor="start" font-size="12" font-weight="600" fill="#475569">Forecast start</text>

      <!-- Axes -->
      <line x1="${fmt(MARGIN.left)}" y1="${fmt(MARGIN.top + INNER_H)}" x2="${fmt(
        MARGIN.left + INNER_W,
      )}" y2="${fmt(MARGIN.top + INNER_H)}" stroke="#CBD5E1" stroke-width="1" />
      <line x1="${fmt(MARGIN.left)}" y1="${fmt(MARGIN.top)}" x2="${fmt(MARGIN.left)}" y2="${fmt(
        MARGIN.top + INNER_H,
      )}" stroke="#CBD5E1" stroke-width="1" />

      <!-- X axis month labels -->
${xLabels.join('\n')}

      <!-- Y axis unit title -->
      <text transform="translate(${fmt(16)}, ${fmt(
        MARGIN.top + INNER_H / 2,
      )}) rotate(-90)" text-anchor="middle" font-size="12" font-weight="600" fill="#475569">${esc(
        unitLabel,
      )}</text>

      <!-- Actual: solid slate, continuous history + holdout, no fill -->
      <path d="${actualPath}" fill="none" stroke="${ACTUAL_COLOR}" stroke-width="${ACTUAL_WIDTH}" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Baseline: dashed light gray -->
      <path class="backtest-forecast-baseline" data-forecast="baseline" d="${baselinePath}" fill="none" stroke="${BASELINE_COLOR}" stroke-width="${BASELINE_WIDTH}" stroke-dasharray="${BASELINE_DASH}" stroke-linecap="round" stroke-linejoin="round" />

      <!-- Ready Signal: solid orange, thickest, terminal dot -->
      <path class="backtest-forecast-ready-signal" data-forecast="ready-signal" d="${readySignalPath}" fill="none" stroke="${READY_SIGNAL_COLOR}" stroke-width="${READY_SIGNAL_WIDTH}" stroke-linecap="round" stroke-linejoin="round" />
      <circle class="backtest-forecast-dot" cx="${termX}" cy="${termY}" r="5" fill="${READY_SIGNAL_COLOR}" stroke="#ffffff" stroke-width="1.5" />
    </svg>`;

  // ── Legend (below the chart): swatches distinguish dashed vs solid ──
  const swatch = (color: string, width: number, dash?: string) =>
    `<svg width="34" height="12" aria-hidden="true" class="shrink-0"><line x1="1" y1="6" x2="33" y2="6" stroke="${color}" stroke-width="${width}"${
      dash ? ` stroke-dasharray="${dash}"` : ''
    } stroke-linecap="round" /></svg>`;

  // On mobile the legend renders ABOVE the chart (before it in DOM order); a top
  // margin on desktop, a bottom margin on mobile keeps the spacing symmetric.
  const legend = `    <ul class="${
    variant === 'mobile' ? 'mb-4' : 'mt-4'
  } flex flex-wrap items-center justify-center gap-x-6 gap-y-2 list-none pl-0">
      <li class="flex items-center gap-2 text-sm text-rs-dark">${swatch(
        ACTUAL_COLOR,
        ACTUAL_WIDTH,
      )}<span>Actual</span></li>
      <li class="flex items-center gap-2 text-sm text-rs-dark">${swatch(
        BASELINE_COLOR,
        BASELINE_WIDTH,
        BASELINE_DASH,
      )}<span>Baseline</span></li>
      <li class="flex items-center gap-2 text-sm text-rs-dark">${swatch(
        READY_SIGNAL_COLOR,
        READY_SIGNAL_WIDTH,
      )}<span>Ready Signal</span></li>
    </ul>`;

  const body = variant === 'mobile' ? `${legend}\n${svg}` : `${svg}\n${legend}`;

  return `  <figure class="tabular-nums" style="font-variant-numeric:tabular-nums">
    <figcaption class="mb-2">
      <span class="block text-base font-bold text-rs-dark">${esc(title)}</span>
      <span class="block text-sm text-rs-dark/70">${esc(subtitle)}</span>
    </figcaption>
${body}
  </figure>`;
}
