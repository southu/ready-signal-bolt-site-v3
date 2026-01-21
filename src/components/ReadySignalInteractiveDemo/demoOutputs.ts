/**
 * Hard-coded regression outputs for the interactive demo
 * These values are authoritative and displayed verbatim in the UI
 */

// ============ TYPES ============

export interface RegressionStats {
  multipleR: number;
  rSquare: number;
  adjustedRSquare: number;
  standardError: number;
  observations: number;
}

export interface ANOVARow {
  source: 'Regression' | 'Residual' | 'Total';
  df: number;
  ss: number;
  ms?: number;
  f?: number;
  significanceF?: number;
}

export interface Coefficient {
  name: string;
  coefficient: number;
  standardError: number;
  tStat: number;
  pValue: number;
  lower95: number;
  upper95: number;
  isExternal?: boolean;
}

export interface ModelOutput {
  stats: RegressionStats;
  anova: ANOVARow[];
  coefficients: Coefficient[];
}

// ============ INTERNAL-ONLY MODEL OUTPUT ============

export const internalOnlyOutput: ModelOutput = {
  stats: {
    multipleR: 0.51981601,
    rSquare: 0.270208685,
    adjustedRSquare: 0.240421284,
    standardError: 4408.454485,
    observations: 52,
  },
  anova: [
    { source: 'Regression', df: 2, ss: 352589532.4, ms: 176294766.2, f: 9.071240823, significanceF: 0.000445008 },
    { source: 'Residual', df: 49, ss: 952289076.3, ms: 19434470.95 },
    { source: 'Total', df: 51, ss: 1304878609 },
  ],
  coefficients: [
    {
      name: 'Intercept',
      coefficient: -57644.11615,
      standardError: 22351.6233,
      tStat: -2.578967772,
      pValue: 0.012963123,
      lower95: -102561.3848,
      upper95: -12726.84745,
      isExternal: false,
    },
    {
      name: 'Price per Unit',
      coefficient: -109.7078971,
      standardError: 30.17519112,
      tStat: -3.6356985,
      pValue: 0.000664433,
      lower95: -170.347214,
      upper95: -49.06858025,
      isExternal: false,
    },
    {
      name: 'Marketing Spend',
      coefficient: 16.94684995,
      standardError: 4.066081196,
      tStat: 4.167858225,
      pValue: 0.000124618,
      lower95: 8.775753872,
      upper95: 25.11794604,
      isExternal: false,
    },
  ],
};

// ============ WITH-EXTERNAL MODEL OUTPUT ============

export const withExternalOutput: ModelOutput = {
  stats: {
    multipleR: 0.90482683,
    rSquare: 0.818711591,
    adjustedRSquare: 0.789870254,
    standardError: 2318.695589,
    observations: 52,
  },
  anova: [
    { source: 'Regression', df: 7, ss: 1068319242, ms: 152617034.6, f: 28.38674126, significanceF: 2.48085e-14 },
    { source: 'Residual', df: 44, ss: 236559366.3, ms: 5376349.233 },
    { source: 'Total', df: 51, ss: 1304878609 },
  ],
  coefficients: [
    {
      name: 'Intercept',
      coefficient: 23588.58699,
      standardError: 16718.81729,
      tStat: 1.410900459,
      pValue: 0.165305605,
      lower95: -10105.97525,
      upper95: 57283.14923,
      isExternal: false,
    },
    {
      name: 'Price per Unit',
      coefficient: -35.3205249,
      standardError: 18.1931278,
      tStat: -1.941421249,
      pValue: 0.058628287,
      lower95: -71.98636475,
      upper95: 1.34531495,
      isExternal: false,
    },
    {
      name: 'Marketing Spend',
      coefficient: 0.377979925,
      standardError: 2.936031026,
      tStat: 0.128738396,
      pValue: 0.898151319,
      lower95: -5.539201803,
      upper95: 6.295161653,
      isExternal: false,
    },
    {
      name: 'actual-minimum-temperature_Lag4',
      coefficient: 402.0808866,
      standardError: 119.6569897,
      tStat: 3.360279141,
      pValue: 0.001617699,
      lower95: 160.9280695,
      upper95: 643.2337037,
      isExternal: true,
    },
    {
      name: 'housing-inventory-average-listing-price-month-over-month_Lag4',
      coefficient: -505.3805244,
      standardError: 292.7570931,
      tStat: -1.72627935,
      pValue: 0.091313624,
      lower95: -1095.393677,
      upper95: 84.63262824,
      isExternal: true,
    },
    {
      name: 'total-consumer-credit-owned-by-nonfinancial-business_Lag6',
      coefficient: 0.086595788,
      standardError: 0.071444031,
      tStat: 1.212078698,
      pValue: 0.231950927,
      lower95: -0.057390195,
      upper95: 0.230581771,
      isExternal: true,
    },
    {
      name: 'ppi-by-commodity-farm-products-strawberries',
      coefficient: 18.36492638,
      standardError: 8.550711262,
      tStat: 2.147765937,
      pValue: 0.037279036,
      lower95: 1.132100167,
      upper95: 35.5977526,
      isExternal: true,
    },
    {
      name: 'other-separations-state-and-local_Lag4',
      coefficient: 90.00676458,
      standardError: 24.36983489,
      tStat: 3.693367845,
      pValue: 0.000608197,
      lower95: 40.89258954,
      upper95: 139.1209396,
      isExternal: true,
    },
  ],
};

// ============ FEATURE IMPORTANCE (derived from |t-stat|) ============

export interface FeatureImportance {
  name: string;
  importance: number;
  isExternal: boolean;
  displayName: string;
}

export function computeFeatureImportance(coefficients: Coefficient[]): FeatureImportance[] {
  // Filter out intercept and compute importance from |t-stat|
  const features = coefficients.filter(c => c.name !== 'Intercept');
  
  // Get max |t-stat| for normalization
  const maxTStat = Math.max(...features.map(f => Math.abs(f.tStat)));
  
  return features
    .map(c => ({
      name: c.name,
      importance: Math.abs(c.tStat) / maxTStat,
      isExternal: c.isExternal ?? false,
      displayName: formatFeatureName(c.name),
    }))
    .sort((a, b) => b.importance - a.importance);
}

function formatFeatureName(name: string): string {
  // Convert slug-style names to readable format
  return name
    .replace(/_Lag(\d+)$/, ' (Lag $1)')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// ============ HELPER FUNCTIONS ============

export function formatPValue(p: number): string {
  if (p < 0.001) return '< 0.001';
  if (p < 0.01) return `${p.toFixed(4)}`;
  return p.toFixed(3);
}

export function getPValueBadge(p: number): { label: string; color: string } {
  if (p <= 0.01) return { label: 'Strong', color: 'emerald' };
  if (p <= 0.05) return { label: 'Significant', color: 'amber' };
  if (p <= 0.10) return { label: 'Borderline', color: 'orange' };
  return { label: 'Weak', color: 'gray' };
}

export function formatNumber(n: number, decimals: number = 2): string {
  if (Math.abs(n) >= 1e6) {
    return (n / 1e6).toFixed(1) + 'M';
  }
  if (Math.abs(n) >= 1e3) {
    return (n / 1e3).toFixed(1) + 'K';
  }
  return n.toFixed(decimals);
}

export function formatPercent(n: number): string {
  return (n * 100).toFixed(1) + '%';
}
