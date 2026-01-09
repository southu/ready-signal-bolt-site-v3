import { motion } from 'framer-motion';
import { useState } from 'react';
import { TrendingDown, TrendingUp, Activity, AlertCircle } from 'lucide-react';

interface Indicator {
  name: string;
  value: number;
  impact: 'positive' | 'negative' | 'neutral';
}

const MarketIntelligenceGauge = () => {
  const [hoveredIndicator, setHoveredIndicator] = useState<string | null>(null);

  const indicators: Indicator[] = [
    { name: 'Inflation', value: -1, impact: 'positive' },
    { name: 'Labor Market', value: -1, impact: 'negative' },
    { name: 'Housing', value: 4, impact: 'positive' },
  ];

  const netSentiment = indicators.reduce((acc, ind) => acc + ind.value, 0);
  const sentimentAngle = (netSentiment / indicators.length) * 45;
  const sentimentLabel = 'Slight Tailwinds';

  const getIndicatorColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'negative':
        return 'from-red-50 to-rose-50 border-red-200';
      default:
        return 'from-gray-50 to-slate-50 border-gray-200';
    }
  };

  const getIndicatorIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTextColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-rs-dark mb-2">
          Market Intelligence
        </h3>
        <p className="text-sm text-rs-dark opacity-60">
          AI-powered market analysis
        </p>
      </div>

      {/* Gauge */}
      <div className="relative w-64 h-40 mx-auto mb-8">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
        >
          {/* Background Arc - Headwinds (Red) */}
          <motion.path
            d="M 30 100 A 70 70 0 0 1 85 30"
            fill="none"
            stroke="#FCA5A5"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          {/* Background Arc - Neutral (Gray) */}
          <motion.path
            d="M 85 30 A 70 70 0 0 1 115 30"
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
          />

          {/* Background Arc - Tailwinds (Green) */}
          <motion.path
            d="M 115 30 A 70 70 0 0 1 170 100"
            fill="none"
            stroke="#86EFAC"
            strokeWidth="16"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          />

          {/* Needle */}
          <motion.g
            initial={{ rotate: -90 }}
            animate={{ rotate: sentimentAngle }}
            transition={{ duration: 2, delay: 0.5, type: "spring", stiffness: 50 }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <line
              x1="100"
              y1="100"
              x2="100"
              y2="40"
              stroke="#0A2540"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="100" r="6" fill="#0A2540" />
          </motion.g>

          {/* Center Circle */}
          <circle cx="100" cy="100" r="4" fill="white" />
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-0 text-xs text-red-600 font-medium">
          Headwinds
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs text-gray-600 font-medium">
          Neutral
        </div>
        <div className="absolute bottom-0 right-0 text-xs text-green-600 font-medium">
          Tailwinds
        </div>
      </div>

      {/* Current Sentiment */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-2 rounded-full border border-rs-cyan border-opacity-20">
          <AlertCircle className="w-5 h-5 text-rs-cyan" />
          <span className="text-lg font-bold text-rs-dark">
            Current Outlook: <span className="text-rs-cyan">{sentimentLabel}</span>
          </span>
        </div>
      </motion.div>

      {/* Indicators Grid */}
      <div className="grid grid-cols-3 gap-4">
        {indicators.map((indicator, index) => (
          <motion.div
            key={indicator.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + index * 0.1 }}
            onMouseEnter={() => setHoveredIndicator(indicator.name)}
            onMouseLeave={() => setHoveredIndicator(null)}
            className={`relative bg-gradient-to-br ${getIndicatorColor(indicator.impact)} border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
              hoveredIndicator === indicator.name ? 'scale-105 shadow-lg' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-2xl font-bold ${getTextColor(indicator.impact)}`}>
                {indicator.value > 0 ? '+' : ''}{indicator.value}%
              </span>
              {getIndicatorIcon(indicator.impact)}
            </div>
            <div className="text-xs font-medium text-rs-dark opacity-75">
              {indicator.name}
            </div>

            {hoveredIndicator === indicator.name && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-rs-dark text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-10"
              >
                {indicator.impact === 'positive' ? 'Favorable trend' : 'Negative pressure'}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-rs-dark" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Update Timestamp */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="mt-6 text-center"
      >
        <div className="inline-flex items-center space-x-2 text-xs text-rs-dark opacity-50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Real-time data • Updated continuously</span>
        </div>
      </motion.div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="mt-6 pt-6 border-t border-gray-200"
      >
        <div className="flex items-start space-x-3 text-sm text-rs-dark opacity-75">
          <AlertCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
          <p>
            Our AI continuously monitors 40,000+ economic signals to provide actionable market intelligence.
            This real-time dashboard helps you anticipate market shifts before they impact your business.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketIntelligenceGauge;
