#!/usr/bin/env node
/**
 * Generate the static backtest JSON artifact(s) served under /backtest/.
 *
 * Imports the typed data module and its pure metric functions and emits
 * public/backtest/corn.json. All metrics are COMPUTED here from the series via
 * the metric functions — the JSON is never hand-written, so it can never drift
 * from the module data.
 *
 * Run with tsx so the TypeScript module can be imported directly:
 *   tsx scripts/generate-backtest.mjs
 *
 * This runs automatically as a prebuild step.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cornCard, computeMetrics } from '../src/data/backtests.ts';
import { buildBacktestChartMarkup } from '../src/data/backtestChart.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'public', 'backtest');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'corn.json');

const metrics = computeMetrics(cornCard);

const payload = {
  id: cornCard.id,
  title: cornCard.title,
  subtitle: cornCard.subtitle,
  unitLabel: cornCard.unitLabel,
  monthLabels: cornCard.monthLabels,
  history: cornCard.history,
  holdoutActuals: cornCard.holdoutActuals,
  baselineForecast: cornCard.baselineForecast,
  readySignalForecast: cornCard.readySignalForecast,
  baselineBandWidth: cornCard.baselineBandWidth,
  readySignalBandWidth: cornCard.readySignalBandWidth,
  signalChips: cornCard.signalChips,
  metrics: {
    baseline: {
      mape: metrics.baseline.mape,
      rmse: metrics.baseline.rmse,
    },
    readySignal: {
      mape: metrics.readySignal.mape,
      rmse: metrics.readySignal.rmse,
    },
    errorReductionPct: metrics.errorReductionPct,
  },
};

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(payload, null, 2) + '\n');
console.log(`[generate-backtest] Wrote ${OUTPUT_FILE}`);

// Emit the prerendered chart markup fragment. The postbuild
// (scripts/generate-og-pages.mjs, run via plain node) reads this and injects it
// into the raw /backtest HTML so crawlers / no-JS clients get a real SVG chart.
// Built from the SAME pure builder the React component uses, so the two renders
// can never drift.
const CHART_FILE = path.join(OUTPUT_DIR, 'corn-chart.html');
fs.writeFileSync(CHART_FILE, buildBacktestChartMarkup(cornCard) + '\n');
console.log(`[generate-backtest] Wrote ${CHART_FILE}`);
