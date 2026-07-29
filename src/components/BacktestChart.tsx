import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { BacktestCard } from '../data/backtests';
import type { BacktestChartModel, BacktestPeriod } from '../data/backtestChart';
import { buildBacktestChartMarkup, buildBacktestChartModel } from '../data/backtestChart';

interface BacktestChartProps {
  /** The backtest dataset to render. All series and formatting come from here. */
  card: BacktestCard;
  /** Optional wrapper classes. */
  className?: string;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
/** Draw-in duration for the forecast lines (mission spec: ~600ms). */
const DRAW_DURATION_MS = 600;

/** Active tooltip: which period, and where to place it (px, relative to wrapper). */
interface ActiveTooltip {
  index: number;
  left: number;
  top: number;
}

// Tabular figures on every numeric value (mission requirement): applied as both
// a Tailwind class and an inline style so a computed-style check always sees it.
const NUM_CLASS = 'tabular-nums';
const NUM_STYLE = { fontVariantNumeric: 'tabular-nums' as const };

/** Absolute + percent error of a forecast versus the actual for one period. */
function forecastError(forecast: number, actual: number): { abs: number; pct: number } {
  const abs = Math.abs(forecast - actual);
  return { abs, pct: (abs / actual) * 100 };
}

/** A single "value + unit" cell, rendered with tabular numerals. */
function ValueCell({
  attr,
  children,
}: {
  attr: string;
  children: React.ReactNode;
}) {
  return (
    <span className={`font-semibold text-rs-dark ${NUM_CLASS}`} style={NUM_STYLE} {...{ [attr]: '' }}>
      {children}
    </span>
  );
}

/**
 * Tooltip for the hovered / tapped period. In the holdout window it shows the
 * Actual, Baseline and Ready Signal values plus each forecast's error vs Actual
 * (absolute + percent). In the history window — where the forecasts don't exist
 * — it shows just the period label and the Actual value.
 */
function Tooltip({
  period,
  model,
  left,
  top,
}: {
  period: BacktestPeriod;
  model: BacktestChartModel;
  left: number;
  top: number;
}) {
  const { formatValue, unitLabel } = model;
  const withUnit = (v: number) => `${formatValue(v)} ${unitLabel}`;

  const baselineErr =
    period.isHoldout && period.baseline !== null
      ? forecastError(period.baseline, period.actual)
      : null;
  const readySignalErr =
    period.isHoldout && period.readySignal !== null
      ? forecastError(period.readySignal, period.actual)
      : null;

  return (
    <div
      className="pointer-events-none absolute z-20 w-max max-w-[16rem]"
      style={{ left, top, transform: 'translate(-50%, calc(-100% - 14px))' }}
      role="tooltip"
      data-backtest-tooltip=""
    >
      <div className="rounded-lg border border-rs-dark/10 bg-white px-3 py-2 text-xs shadow-lg">
        <div className="font-semibold text-rs-dark" data-tooltip-period="">
          {period.label}
        </div>

        <dl className="mt-1.5 grid grid-cols-[auto_auto] items-center gap-x-3 gap-y-1">
          <dt className="text-rs-dark/60">Actual</dt>
          <dd className="justify-self-end">
            <ValueCell attr="data-tooltip-actual">{withUnit(period.actual)}</ValueCell>
          </dd>

          {period.isHoldout && period.baseline !== null && (
            <>
              <dt className="text-rs-dark/60">Baseline</dt>
              <dd className="justify-self-end">
                <ValueCell attr="data-tooltip-baseline">{withUnit(period.baseline)}</ValueCell>
              </dd>
            </>
          )}

          {period.isHoldout && period.readySignal !== null && (
            <>
              <dt className="text-rs-dark/60">Ready Signal</dt>
              <dd className="justify-self-end">
                <ValueCell attr="data-tooltip-ready-signal">
                  {withUnit(period.readySignal)}
                </ValueCell>
              </dd>
            </>
          )}
        </dl>

        {(baselineErr || readySignalErr) && (
          <div className="mt-2 border-t border-rs-dark/10 pt-1.5">
            <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-rs-dark/45">
              Error vs Actual
            </div>
            <dl className="grid grid-cols-[auto_auto] items-center gap-x-3 gap-y-1">
              {baselineErr && (
                <>
                  <dt className="text-rs-dark/60">Baseline</dt>
                  <dd className="justify-self-end">
                    <span
                      className={`text-rs-dark ${NUM_CLASS}`}
                      style={NUM_STYLE}
                      data-tooltip-baseline-error-abs=""
                    >
                      {withUnit(baselineErr.abs)}
                    </span>
                    <span className="mx-1 text-rs-dark/40">·</span>
                    <span
                      className={`font-semibold text-rs-dark ${NUM_CLASS}`}
                      style={NUM_STYLE}
                      data-tooltip-baseline-error-pct=""
                    >
                      {baselineErr.pct.toFixed(1)}%
                    </span>
                  </dd>
                </>
              )}
              {readySignalErr && (
                <>
                  <dt className="text-rs-dark/60">Ready Signal</dt>
                  <dd className="justify-self-end">
                    <span
                      className={`text-rs-dark ${NUM_CLASS}`}
                      style={NUM_STYLE}
                      data-tooltip-ready-signal-error-abs=""
                    >
                      {withUnit(readySignalErr.abs)}
                    </span>
                    <span className="mx-1 text-rs-dark/40">·</span>
                    <span
                      className={`font-semibold text-rs-dark ${NUM_CLASS}`}
                      style={NUM_STYLE}
                      data-tooltip-ready-signal-error-pct=""
                    >
                      {readySignalErr.pct.toFixed(1)}%
                    </span>
                  </dd>
                </>
              )}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Reusable backtest chart: renders a card's history, holdout actuals, and the
 * Baseline vs Ready Signal forecasts (with confidence bands) as inline SVG.
 *
 * The base SVG + legend markup is produced by the shared, pure
 * `buildBacktestChartMarkup` — the exact same builder the prebuild uses to
 * prerender the chart into raw HTML — so the browser render and the crawler /
 * no-JS render are byte-for-byte identical. No chart values are hard-coded in
 * the component; pass a different card to chart a different dataset.
 *
 * On top of that static base this component layers two client-only behaviours,
 * both driven by the shared `buildBacktestChartModel` geometry so they line up
 * exactly with the drawn chart:
 *   1. A hover (mouse) / tap (touch) tooltip for the nearest period.
 *   2. A one-shot left-to-right "draw" of the two forecast lines when the chart
 *      first scrolls into view, fully skipped under prefers-reduced-motion.
 */
export default function BacktestChart({ card, className }: BacktestChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const model = useMemo(() => buildBacktestChartModel(card), [card]);
  const markup = useMemo(() => buildBacktestChartMarkup(card), [card]);
  const [active, setActive] = useState<ActiveTooltip | null>(null);
  // Timestamp of the last touch, used to swallow the compatibility mouse events
  // (mousemove/mouseleave) the browser synthesizes after a tap — otherwise the
  // trailing mouseleave would instantly dismiss a tap-opened tooltip.
  const lastTouchAt = useRef(0);

  // ── Tooltip: find the nearest period to a client-x and place the tooltip ──
  const locate = (clientX: number, target: EventTarget | null): ActiveTooltip | null => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return null;
    const svg = wrapper.querySelector('svg');
    if (!svg) return null;
    // Only react over the chart itself, not the caption or legend below it.
    if (target instanceof Node && !svg.contains(target)) return null;

    const svgRect = svg.getBoundingClientRect();
    if (svgRect.width === 0) return null;
    const scaleX = svgRect.width / model.viewWidth;
    const scaleY = svgRect.height / model.viewHeight;
    const vx = (clientX - svgRect.left) / scaleX;

    let best = model.periods[0];
    let bestDist = Infinity;
    for (const p of model.periods) {
      const d = Math.abs(p.x - vx);
      if (d < bestDist) {
        bestDist = d;
        best = p;
      }
    }

    const wrapRect = wrapper.getBoundingClientRect();
    return {
      index: best.index,
      left: svgRect.left - wrapRect.left + best.x * scaleX,
      top: svgRect.top - wrapRect.top + best.actualY * scaleY,
    };
  };

  // Within this window after a tap, ignore synthesized compatibility mouse events.
  const TOUCH_GUARD_MS = 700;
  const recentlyTouched = () => Date.now() - lastTouchAt.current < TOUCH_GUARD_MS;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (recentlyTouched()) return;
    setActive(locate(e.clientX, e.target));
  };
  const handleMouseLeave = () => {
    if (recentlyTouched()) return;
    setActive(null);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    lastTouchAt.current = Date.now();
    const touch = e.touches[0] ?? e.changedTouches[0];
    if (!touch) return;
    const next = locate(touch.clientX, e.target);
    if (!next) return;
    // Tap the same point again to dismiss; otherwise move the tooltip.
    setActive((cur) => (cur && cur.index === next.index ? null : next));
  };

  // Dismiss the tooltip when tapping anywhere outside this chart (touch).
  useEffect(() => {
    if (!active) return;
    const onDocTouch = (e: TouchEvent) => {
      const wrapper = wrapperRef.current;
      if (wrapper && e.target instanceof Node && !wrapper.contains(e.target)) {
        setActive(null);
      }
    };
    document.addEventListener('touchstart', onDocTouch);
    return () => document.removeEventListener('touchstart', onDocTouch);
  }, [active]);

  // ── Draw animation: reveal the two forecast lines left-to-right, once ──
  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const baseline = wrapper.querySelector<SVGPathElement>('.backtest-forecast-baseline');
    const readySignal = wrapper.querySelector<SVGPathElement>('.backtest-forecast-ready-signal');
    const dot = wrapper.querySelector<SVGCircleElement>('.backtest-forecast-dot');
    if (!baseline || !readySignal) return;

    // prefers-reduced-motion: skip entirely; leave the lines fully drawn.
    if (window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      wrapper.setAttribute('data-draw-state', 'done');
      return;
    }

    // Hidden initial state (applied before paint so there is no flash of the
    // finished lines). Ready Signal (solid) uses stroke-dashoffset; Baseline
    // (dashed) uses a clip-path inset so its dash pattern is preserved.
    const rsLen = readySignal.getTotalLength();
    readySignal.style.strokeDasharray = `${rsLen}`;
    readySignal.style.strokeDashoffset = `${rsLen}`;
    readySignal.style.transition = 'none';
    baseline.style.clipPath = 'inset(0 100% 0 0)';
    baseline.style.transition = 'none';
    if (dot) {
      dot.style.opacity = '0';
      dot.style.transition = 'none';
    }
    wrapper.setAttribute('data-draw-state', 'idle');

    let played = false;
    let doneTimer = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || played) continue;
          played = true;
          observer.disconnect();
          // Next frame: turn transitions on and drive to the final state.
          requestAnimationFrame(() => {
            readySignal.style.transition = `stroke-dashoffset ${DRAW_DURATION_MS}ms ease-in-out`;
            readySignal.style.strokeDashoffset = '0';
            baseline.style.transition = `clip-path ${DRAW_DURATION_MS}ms ease-in-out`;
            baseline.style.clipPath = 'inset(0 0 0 0)';
            if (dot) {
              dot.style.transition = `opacity 200ms ease-in ${DRAW_DURATION_MS - 100}ms`;
              dot.style.opacity = '1';
            }
            wrapper.setAttribute('data-draw-state', 'drawing');
          });
          // Restore pristine final styling once the draw completes.
          doneTimer = window.setTimeout(() => {
            readySignal.style.strokeDasharray = '';
            readySignal.style.strokeDashoffset = '';
            readySignal.style.transition = '';
            baseline.style.transition = '';
            baseline.style.clipPath = '';
            if (dot) dot.style.transition = '';
            wrapper.setAttribute('data-draw-state', 'done');
          }, DRAW_DURATION_MS + 60);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(wrapper);

    return () => {
      observer.disconnect();
      if (doneTimer) window.clearTimeout(doneTimer);
    };
  }, [markup]);

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {active && (
        <Tooltip
          period={model.periods[active.index]}
          model={model}
          left={active.left}
          top={active.top}
        />
      )}
    </div>
  );
}
