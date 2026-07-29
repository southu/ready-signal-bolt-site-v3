import { describe, it, expect } from 'vitest';
import {
  cornCard,
  retailCard,
  energyCard,
  backtestCards,
  computeMetrics,
  mape,
  rmse,
  percentErrorReduction,
} from './backtests';

describe('metric functions', () => {
  it('mape returns 0 for a perfect forecast', () => {
    expect(mape([1, 2, 3], [1, 2, 3])).toBe(0);
  });

  it('rmse returns 0 for a perfect forecast', () => {
    expect(rmse([1, 2, 3], [1, 2, 3])).toBe(0);
  });

  it('rmse computes the root mean squared error', () => {
    // errors 1, 1, 1 -> sqrt(mean(1,1,1)) = 1
    expect(rmse([2, 3, 4], [1, 2, 3])).toBeCloseTo(1, 10);
  });

  it('percentErrorReduction computes relative improvement', () => {
    expect(percentErrorReduction(10, 4)).toBeCloseTo(60, 10);
  });

  it('throws on mismatched lengths', () => {
    expect(() => mape([1, 2], [1])).toThrow();
    expect(() => rmse([1, 2], [1])).toThrow();
  });
});

describe('corn card', () => {
  it('has the exact seeded series', () => {
    expect(cornCard.history).toHaveLength(24);
    expect(cornCard.holdoutActuals).toEqual([5.35, 5.61, 6.12, 6.48, 6.3, 5.94, 5.61, 5.4]);
    expect(cornCard.baselineForecast).toHaveLength(8);
    expect(cornCard.readySignalForecast).toHaveLength(8);
    expect(cornCard.signalChips.length).toBeGreaterThanOrEqual(3);
    expect(cornCard.signalChips.length).toBeLessThanOrEqual(4);
  });

  it('computes roughly 10% baseline MAPE and roughly 3-4% Ready Signal MAPE', () => {
    const metrics = computeMetrics(cornCard);
    expect(metrics.baseline.mape).toBeGreaterThan(9);
    expect(metrics.baseline.mape).toBeLessThan(11.5);
    expect(metrics.readySignal.mape).toBeGreaterThan(2.5);
    expect(metrics.readySignal.mape).toBeLessThan(5);
  });

  it('Ready Signal RMSE is strictly better than baseline RMSE', () => {
    const metrics = computeMetrics(cornCard);
    expect(metrics.baseline.rmse).toBeGreaterThan(0);
    expect(metrics.readySignal.rmse).toBeGreaterThan(0);
    expect(metrics.readySignal.rmse).toBeLessThan(metrics.baseline.rmse);
  });

  it('error reduction is roughly 67%', () => {
    const metrics = computeMetrics(cornCard);
    expect(metrics.errorReductionPct).toBeGreaterThan(55);
    expect(metrics.errorReductionPct).toBeLessThan(80);
  });
});

// Sibling datasets share the card component; only their data/config differ.
// Target error bands (computed from the series, never hard-coded): baseline
// MAPE in [9, 12]%, Ready Signal MAPE in [3, 5]%, with an honest residual so
// 0 < Ready Signal MAPE < baseline MAPE.
const siblingCards = [
  { name: 'retail card', card: retailCard, chips: ['Heat Index', 'Foot Traffic', 'Promo Calendar'] },
  { name: 'energy card', card: energyCard, chips: ['HDD / Cold Snap Index', 'Nat Gas Spot', 'Grid Interchange'] },
];

describe.each(siblingCards)('$name', ({ card, chips }) => {
  it('has equal-length, non-empty forecast and holdout series', () => {
    expect(card.holdoutActuals.length).toBeGreaterThan(0);
    expect(card.baselineForecast).toHaveLength(card.holdoutActuals.length);
    expect(card.readySignalForecast).toHaveLength(card.holdoutActuals.length);
  });

  it('exposes the expected signal chips', () => {
    expect(card.signalChips).toEqual(chips);
  });

  it('baseline MAPE falls in the 9-12% target band', () => {
    const metrics = computeMetrics(card);
    expect(metrics.baseline.mape).toBeGreaterThanOrEqual(9);
    expect(metrics.baseline.mape).toBeLessThanOrEqual(12);
  });

  it('Ready Signal MAPE falls in the 3-5% target band', () => {
    const metrics = computeMetrics(card);
    expect(metrics.readySignal.mape).toBeGreaterThanOrEqual(3);
    expect(metrics.readySignal.mape).toBeLessThanOrEqual(5);
  });

  it('keeps an honest residual: 0 < Ready Signal MAPE < baseline MAPE', () => {
    const metrics = computeMetrics(card);
    expect(metrics.readySignal.mape).toBeGreaterThan(0);
    expect(metrics.readySignal.mape).toBeLessThan(metrics.baseline.mape);
  });
});

describe('backtestCards collection', () => {
  it('lists the three cards in narrative order', () => {
    expect(backtestCards.map((c) => c.title)).toEqual([
      'Commodity Prices',
      'Retail Demand',
      'Energy Load',
    ]);
  });

  it('gives every card a distinct forecast series', () => {
    const signatures = backtestCards.map((c) => JSON.stringify(c.readySignalForecast));
    expect(new Set(signatures).size).toBe(backtestCards.length);
  });
});
