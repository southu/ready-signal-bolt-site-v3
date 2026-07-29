import type { BacktestCard } from '../data/backtests';
import { buildBacktestChartMarkup } from '../data/backtestChart';

interface BacktestChartProps {
  /** The backtest dataset to render. All series and formatting come from here. */
  card: BacktestCard;
  /** Optional wrapper classes. */
  className?: string;
}

/**
 * Reusable backtest chart: renders a card's history, holdout actuals, and the
 * Baseline vs Ready Signal forecasts (with confidence bands) as inline SVG.
 *
 * The SVG + legend markup is produced by the shared, pure
 * `buildBacktestChartMarkup` — the exact same builder the prebuild uses to
 * prerender the chart into raw HTML — so the browser render and the crawler /
 * no-JS render are byte-for-byte identical. No chart values are hard-coded in
 * the component; pass a different card to chart a different dataset.
 */
export default function BacktestChart({ card, className }: BacktestChartProps) {
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: buildBacktestChartMarkup(card) }}
    />
  );
}
