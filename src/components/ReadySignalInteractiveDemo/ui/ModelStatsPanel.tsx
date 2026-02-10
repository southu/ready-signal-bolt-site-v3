import { motion } from 'framer-motion';
import { RegressionStats, Coefficient, formatPValue, getPValueBadge, formatNumber } from '../demoOutputs';

interface ModelStatsPanelProps {
  stats: RegressionStats;
  coefficients: Coefficient[];
  variant?: 'baseline' | 'enhanced';
}

export default function ModelStatsPanel({
  stats,
  coefficients,
  variant = 'baseline',
}: ModelStatsPanelProps) {
  const accentColor = variant === 'enhanced' ? 'teal' : 'slate';

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Adjusted R²"
          value={stats.adjustedRSquare.toFixed(3)}
          subtext="Explained variance"
          highlight={variant === 'enhanced'}
        />
        <StatCard
          label="R²"
          value={stats.rSquare.toFixed(3)}
          subtext="Goodness of fit"
        />
        <StatCard
          label="Std. Error"
          value={formatNumber(stats.standardError, 0)}
          subtext="Prediction error"
        />
        <StatCard
          label="Observations"
          value={stats.observations.toString()}
          subtext="Data points"
        />
      </div>

      {/* Coefficient Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className={`px-4 py-3 border-b border-slate-200 bg-${accentColor}-50`}>
          <h4 className="font-semibold text-slate-800">Coefficients</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-2 text-left font-medium text-slate-600">Variable</th>
                <th className="px-4 py-2 text-right font-medium text-slate-600">Coefficient</th>
                <th className="px-4 py-2 text-right font-medium text-slate-600">t-Stat</th>
                <th className="px-4 py-2 text-right font-medium text-slate-600">P-Value</th>
                <th className="px-4 py-2 text-center font-medium text-slate-600">Significance</th>
              </tr>
            </thead>
            <tbody>
              {coefficients.map((coef, idx) => {
                const badge = getPValueBadge(coef.pValue);
                
                return (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-slate-100 hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-800 truncate max-w-[200px]" title={coef.name}>
                          {formatCoefficientName(coef.name)}
                        </span>
                        {coef.isExternal && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-teal-100 text-teal-700 rounded shrink-0">
                            RS
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-600">
                      {coef.coefficient >= 0 ? '+' : ''}{formatNumber(coef.coefficient, 2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-600">
                      {coef.tStat.toFixed(2)}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-600">
                      {formatPValue(coef.pValue)}
                    </td>
                    <td className="px-4 py-2.5 text-center">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getBadgeClasses(badge.color)}`}>
                        {badge.label}
                      </span>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtext,
  highlight = false,
}: {
  label: string;
  value: string;
  subtext: string;
  highlight?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${
        highlight
          ? 'bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200'
          : 'bg-white border-slate-200'
      }`}
    >
      <div className="text-sm font-medium text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${highlight ? 'text-teal-700' : 'text-slate-800'}`}>
        {value}
      </div>
      <div className="text-xs text-slate-400 mt-1">{subtext}</div>
    </motion.div>
  );
}

function formatCoefficientName(name: string): string {
  if (name === 'Intercept') return 'Intercept';
  return name
    .replace(/_Lag(\d+)$/, ' (Lag $1)')
    .replace(/-/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function getBadgeClasses(color: string): string {
  switch (color) {
    case 'emerald':
      return 'bg-emerald-100 text-emerald-700';
    case 'amber':
      return 'bg-amber-100 text-amber-700';
    case 'orange':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}
