import { motion } from 'framer-motion';
import { DataRow } from '../dataLoader';
import { FeatureImportance } from '../demoOutputs';

// ============ SALES LINE CHART ============

interface SalesChartProps {
  data: DataRow[];
  showBaseline?: boolean;
  showEnhanced?: boolean;
  title?: string;
}

export function SalesLineChart({
  data,
  showBaseline = false,
  showEnhanced = false,
  title = 'Unit Sales Over Time',
}: SalesChartProps) {
  const values = data.map(d => d.unitSales);
  const maxVal = Math.max(...values) * 1.1;
  const minVal = Math.min(...values) * 0.9;
  const range = maxVal - minVal;

  const width = 600;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (i: number) => padding.left + (i / (data.length - 1)) * chartWidth;
  const getY = (val: number) => padding.top + ((maxVal - val) / range) * chartHeight;

  // Create path for actual sales
  const actualPath = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.unitSales)}`)
    .join(' ');

  // Simulated baseline fit (smoothed with more error)
  const baselinePath = data
    .map((d, i) => {
      const smoothed = d.unitSales * 0.85 + (values[Math.max(0, i - 1)] || d.unitSales) * 0.15;
      const withNoise = smoothed + (Math.sin(i * 0.5) * 2000);
      return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(withNoise)}`;
    })
    .join(' ');

  // Simulated enhanced fit (closer to actual)
  const enhancedPath = data
    .map((d, i) => {
      const smoothed = d.unitSales * 0.95 + (values[Math.max(0, i - 1)] || d.unitSales) * 0.05;
      const withNoise = smoothed + (Math.sin(i * 0.3) * 500);
      return `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(withNoise)}`;
    })
    .join(' ');

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-800">{title}</h4>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-slate-800" />
            <span className="text-slate-600">Actual</span>
          </div>
          {showBaseline && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-orange-400" />
              <span className="text-slate-600">Baseline fit</span>
            </div>
          )}
          {showEnhanced && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-teal-500" />
              <span className="text-slate-600">Enhanced fit</span>
            </div>
          )}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
          const val = minVal + range * (1 - pct);
          return (
            <g key={i}>
              <line
                x1={padding.left}
                y1={padding.top + pct * chartHeight}
                x2={width - padding.right}
                y2={padding.top + pct * chartHeight}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={padding.left - 8}
                y={padding.top + pct * chartHeight + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400"
              >
                {(val / 1000).toFixed(0)}K
              </text>
            </g>
          );
        })}

        {/* X-axis labels */}
        {[0, Math.floor(data.length / 2), data.length - 1].map((idx) => (
          <text
            key={idx}
            x={getX(idx)}
            y={height - 10}
            textAnchor="middle"
            className="text-[10px] fill-slate-400"
          >
            {data[idx]?.date || ''}
          </text>
        ))}

        {/* Baseline fit line */}
        {showBaseline && (
          <motion.path
            d={baselinePath}
            fill="none"
            stroke="#fb923c"
            strokeWidth="2"
            strokeDasharray="4,4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}

        {/* Enhanced fit line */}
        {showEnhanced && (
          <motion.path
            d={enhancedPath}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        )}

        {/* Actual sales line */}
        <motion.path
          d={actualPath}
          fill="none"
          stroke="#1e293b"
          strokeWidth="2.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
      </svg>

      {(showBaseline || showEnhanced) && (
        <p className="text-xs text-slate-400 text-center mt-2 italic">
          Illustrative fit (demo). Metrics shown separately are authoritative.
        </p>
      )}
    </div>
  );
}

// ============ FEATURE IMPORTANCE BAR CHART ============

interface FeatureImportanceChartProps {
  features: FeatureImportance[];
  showOnlyExternal?: boolean;
}

export function FeatureImportanceChart({
  features,
  showOnlyExternal = false,
}: FeatureImportanceChartProps) {
  const displayFeatures = showOnlyExternal
    ? features.filter(f => f.isExternal)
    : features;

  const maxImportance = Math.max(...displayFeatures.map(f => f.importance));

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-slate-800">Feature Importance</h4>
        <p className="text-xs text-slate-400">Based on |t-statistic|</p>
      </div>

      <div className="space-y-3">
        {displayFeatures.map((feature, idx) => (
          <motion.div
            key={feature.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex items-center justify-between text-sm mb-1">
              <div className="flex items-center gap-2">
                <span className="text-slate-700 truncate max-w-[200px]" title={feature.displayName}>
                  {feature.displayName}
                </span>
                {feature.isExternal && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 rounded">
                    RS
                  </span>
                )}
              </div>
              <span className="text-slate-500 font-mono text-xs">
                {(feature.importance * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${
                  feature.isExternal
                    ? 'bg-gradient-to-r from-teal-400 to-teal-500'
                    : 'bg-gradient-to-r from-slate-400 to-slate-500'
                }`}
                initial={{ width: 0 }}
                animate={{ width: `${(feature.importance / maxImportance) * 100}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-400 text-center mt-4 italic">
        Importance indicates contribution to predictiveness, not business causality.
      </p>
    </div>
  );
}

// ============ COMPARISON CHART ============

interface ComparisonChartProps {
  data: DataRow[];
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  return (
    <SalesLineChart
      data={data}
      showBaseline={true}
      showEnhanced={true}
      title="Baseline vs Enhanced Fit"
    />
  );
}
