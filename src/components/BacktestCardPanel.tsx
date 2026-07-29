import type { BacktestCard } from '../data/backtests';
import { computeMetrics } from '../data/backtests';
import BacktestChart from './BacktestChart';

interface BacktestCardPanelProps {
  /** The backtest dataset to render. All series, metrics and chips come from here. */
  card: BacktestCard;
  /** Optional wrapper classes. */
  className?: string;
}

/**
 * Card chrome around a {@link BacktestChart}: a white, soft-bordered, rounded
 * panel with a title, one-line subtitle, the top-right "Illustrative Example"
 * badge (the backtest series are synthetic), the "Signals added" chip row, and
 * a metrics strip whose numbers are all COMPUTED from the card's series via
 * {@link computeMetrics} — never hardcoded, so they can never drift from the
 * chart data. The error-reduction delta is derived from the two MAPE values.
 */
export default function BacktestCardPanel({ card, className }: BacktestCardPanelProps) {
  const metrics = computeMetrics(card);
  const baselineMape = `${metrics.baseline.mape.toFixed(1)}%`;
  const readySignalMape = `${metrics.readySignal.mape.toFixed(1)}%`;
  const deltaPill = `−${metrics.errorReductionPct.toFixed(0)}% forecast error`;

  return (
    <div
      className={`relative rounded-2xl border border-rs-dark/10 bg-white p-6 shadow-sm sm:p-8 ${className ?? ''}`}
    >
      {/* Synthetic-data disclosure — must stay pinned top-right. */}
      <span className="absolute right-4 top-4 rounded-full bg-rs-light-gray px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-rs-dark/55 ring-1 ring-inset ring-rs-dark/10">
        Illustrative Example
      </span>

      <h3 className="pr-36 text-xl font-bold text-rs-dark">{card.title}</h3>
      <p className="mt-1 text-sm text-rs-dark/70">{card.subtitle}</p>

      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-rs-dark/50">
          Signals added
        </p>
        <ul className="mt-2 flex flex-wrap gap-2 list-none pl-0">
          {card.signalChips.map((chip) => (
            <li
              key={chip}
              className="rounded-md bg-rs-light-gray px-2.5 py-1 text-xs font-medium text-rs-dark/75"
            >
              {chip}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm tabular-nums">
        <span className="text-rs-dark/60">Baseline MAPE</span>{' '}
        <span className="font-semibold text-rs-dark">{baselineMape}</span>{' '}
        <span className="text-rs-dark/40" aria-hidden="true">&rarr;</span>{' '}
        <span className="text-rs-dark/60">With Ready Signal</span>{' '}
        <span className="font-semibold text-rs-dark">{readySignalMape}</span>
        <span className="ml-1 inline-flex items-center rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-semibold text-white tabular-nums">
          {deltaPill}
        </span>
      </div>

      <div className="mt-6">
        <BacktestChart card={card} />
      </div>
    </div>
  );
}
