import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { TrendingUp, Activity } from 'lucide-react';

interface DataPoint {
  date: string;
  actual: number;
  predicted: number | null;
  confidenceUpper: number;
  confidenceLower: number;
}

const InteractiveForecastChart = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const data: DataPoint[] = [
    { date: 'Jan 2023', actual: 720, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Mar 2023', actual: 850, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'May 2023', actual: 780, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Jul 2023', actual: 920, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Sep 2023', actual: 860, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Nov 2023', actual: 1050, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Jan 2024', actual: 980, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Mar 2024', actual: 890, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'May 2024', actual: 950, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Jul 2024', actual: 820, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Sep 2024', actual: 740, predicted: null, confidenceUpper: 0, confidenceLower: 0 },
    { date: 'Nov 2024', actual: 680, predicted: 670, confidenceUpper: 720, confidenceLower: 620 },
    { date: 'Jan 2025', actual: null, predicted: 720, confidenceUpper: 800, confidenceLower: 640 },
    { date: 'Mar 2025', actual: null, predicted: 750, confidenceUpper: 840, confidenceLower: 660 },
    { date: 'May 2025', actual: null, predicted: 780, confidenceUpper: 880, confidenceLower: 680 },
  ];

  const width = 600;
  const height = 280;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map(d => Math.max(d.actual || 0, d.predicted || 0, d.confidenceUpper)));
  const minValue = Math.min(...data.map(d => Math.min(d.actual || Infinity, d.confidenceLower)));

  const xScale = (index: number) => (index / (data.length - 1)) * chartWidth;
  const yScale = (value: number) => chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight;

  const actualPath = data
    .map((d, i) => d.actual !== null ? `${i === 0 || data[i - 1].actual === null ? 'M' : 'L'}${xScale(i)},${yScale(d.actual)}` : '')
    .join(' ');

  const predictedPath = data
    .map((d, i) => d.predicted !== null ? `${i === 0 || data[i - 1].predicted === null ? 'M' : 'L'}${xScale(i)},${yScale(d.predicted)}` : '')
    .join(' ');

  const confidenceArea = data
    .filter(d => d.predicted !== null)
    .map((d, i) => {
      const actualIndex = data.indexOf(d);
      return { x: xScale(actualIndex), upper: yScale(d.confidenceUpper), lower: yScale(d.confidenceLower) };
    });

  const confidencePath = confidenceArea.length > 0
    ? `M${confidenceArea[0].x},${confidenceArea[0].upper} ` +
      confidenceArea.map(p => `L${p.x},${p.upper}`).join(' ') +
      ` L${confidenceArea[confidenceArea.length - 1].x},${confidenceArea[confidenceArea.length - 1].lower} ` +
      confidenceArea.reverse().map(p => `L${p.x},${p.lower}`).join(' ') +
      ' Z'
    : '';

  useEffect(() => {
    setTimeout(() => setAnimationComplete(true), 2000);
  }, []);

  return (
    <div className="relative bg-white rounded-2xl p-8 shadow-xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-rs-dark mb-2">
            Intelligent Forecasting
          </h3>
          <p className="text-sm text-rs-dark opacity-60">
            Adaptive predictions with confidence intervals
          </p>
        </div>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          className="flex items-center space-x-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
        >
          <Activity className="w-4 h-4" />
          <span>Live</span>
        </motion.div>
      </div>

      <svg
        ref={svgRef}
        width="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="overflow-visible"
        style={{ maxWidth: '100%', height: 'auto' }}
      >
        <g transform={`translate(${padding.left},${padding.top})`}>
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i} opacity="0.1">
              <line
                x1={0}
                y1={chartHeight * ratio}
                x2={chartWidth}
                y2={chartHeight * ratio}
                stroke="#0A2540"
                strokeWidth="1"
              />
              <text
                x={-10}
                y={chartHeight * ratio + 4}
                textAnchor="end"
                fontSize="12"
                fill="#0A2540"
                opacity="0.6"
              >
                {Math.round(maxValue - (maxValue - minValue) * ratio)}
              </text>
            </g>
          ))}

          {/* Confidence Interval Area */}
          <motion.path
            d={confidencePath}
            fill="rgba(251, 191, 36, 0.15)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />

          {/* Predicted Line */}
          <motion.path
            d={predictedPath}
            stroke="#FBBF24"
            strokeWidth="3"
            strokeDasharray="8 4"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Actual Line */}
          <motion.path
            d={actualPath}
            stroke="#0891B2"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* Data Points with Hover Effects */}
          {data.map((point, index) => {
            if (point.actual === null && point.predicted === null) return null;

            const isActual = point.actual !== null;
            const value = isActual ? point.actual : point.predicted!;
            const cx = xScale(index);
            const cy = yScale(value);
            const isHovered = hoveredPoint === index;

            return (
              <g key={index}>
                {animationComplete && (
                  <>
                    <motion.circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 8 : 5}
                      fill={isActual ? "#0891B2" : "#FBBF24"}
                      stroke="white"
                      strokeWidth={2}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                      style={{ cursor: 'pointer' }}
                    />

                    {isHovered && (
                      <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <rect
                          x={cx - 50}
                          y={cy - 60}
                          width={100}
                          height={45}
                          rx={8}
                          fill="#0A2540"
                          opacity={0.95}
                        />
                        <text
                          x={cx}
                          y={cy - 40}
                          textAnchor="middle"
                          fill="white"
                          fontSize="11"
                          fontWeight="600"
                        >
                          {point.date}
                        </text>
                        <text
                          x={cx}
                          y={cy - 25}
                          textAnchor="middle"
                          fill={isActual ? "#06B6D4" : "#FBBF24"}
                          fontSize="14"
                          fontWeight="bold"
                        >
                          {value}
                        </text>
                        <text
                          x={cx}
                          y={cy - 12}
                          textAnchor="middle"
                          fill="white"
                          fontSize="9"
                          opacity={0.8}
                        >
                          {isActual ? "Actual" : "Predicted"}
                        </text>
                      </motion.g>
                    )}
                  </>
                )}
              </g>
            );
          })}

          {/* X-axis labels */}
          {['2023', '2024', '2025'].map((year, i) => (
            <text
              key={year}
              x={(chartWidth / 2) * i}
              y={chartHeight + 25}
              textAnchor="middle"
              fontSize="12"
              fill="#0A2540"
              opacity="0.7"
            >
              {year}
            </text>
          ))}
        </g>
      </svg>

      <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-0.5 bg-cyan-600"></div>
            <span className="text-xs text-rs-dark opacity-60">Actual Data</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-0.5 bg-yellow-500 border-dashed border-t-2 border-yellow-500"></div>
            <span className="text-xs text-rs-dark opacity-60">Predicted</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-3 bg-yellow-500 opacity-20 rounded"></div>
            <span className="text-xs text-rs-dark opacity-60">Confidence Interval</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8 }}
          className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4"
        >
          <div className="text-3xl font-bold text-rs-cyan mb-1">4.2%</div>
          <div className="text-xs text-rs-dark opacity-60 font-medium">MAPE</div>
          <div className="text-xs text-rs-dark opacity-50">Mean Absolute Percentage Error</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4"
        >
          <div className="text-3xl font-bold text-green-600 mb-1">87%</div>
          <div className="text-xs text-rs-dark opacity-60 font-medium">Hit Rate</div>
          <div className="text-xs text-rs-dark opacity-50">Directional Accuracy</div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="mt-6 flex items-center justify-center space-x-2 text-sm text-rs-dark opacity-60"
      >
        <TrendingUp className="w-4 h-4 text-rs-cyan" />
        <span>Hover over data points for details</span>
      </motion.div>
    </div>
  );
};

export default InteractiveForecastChart;
