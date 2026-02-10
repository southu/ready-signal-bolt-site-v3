import { motion } from 'framer-motion';
import { AlertTriangle, Clock, EyeOff, TrendingDown, ShieldOff, Timer, MessageSquare, Zap } from 'lucide-react';

const erpFailures = [
  {
    icon: Clock,
    title: 'Backward-looking by design',
    description: 'It learns patterns from the past—then assumes the same structure holds tomorrow.',
  },
  {
    icon: EyeOff,
    title: 'Can\'t see external drivers',
    description: 'Inflation, labor availability, weather, trade flows, and logistics capacity aren\'t reliably encoded in internal transaction data.',
  },
  {
    icon: TrendingDown,
    title: 'Misses inflection points',
    description: 'When the world changes first and orders reflect it later, internal-only models respond after the fact.',
  },
];

const whyGapConsequences = [
  {
    icon: ShieldOff,
    label: 'Mistrust',
    description: 'Planners override the forecast or ignore it',
  },
  {
    icon: Timer,
    label: 'Inaction',
    description: 'Teams wait for "more data" instead of committing',
  },
  {
    icon: Zap,
    label: 'Reactive decisions',
    description: 'Procurement rushes buys, or delays until it\'s too late',
  },
  {
    icon: MessageSquare,
    label: 'Meeting-driven planning',
    description: 'Consensus replaces causality',
  },
];

const SupplyChainProblem = () => {
  return (
    <>
      {/* Why ERP-Only Forecasting Breaks */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-rs-dark mb-4">
              Why ERP-Only Forecasting Breaks in Volatile Supply Chains
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Traditional forecasting approaches—often embedded in ERP and planning workflows—are built on internal data: order history, shipments, inventory positions, and historical consumption patterns. That works in stable conditions. But in volatile markets, the drivers of demand and supply risk sit outside your four walls.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {erpFailures.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-rs-light-gray rounded-xl p-8"
              >
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-rs-dark mb-3">{item.title}</h3>
                <p className="text-rs-dark opacity-75 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-rs-light-gray rounded-xl p-8 border-l-4 border-rs-cyan"
          >
            <p className="text-rs-dark opacity-75 leading-relaxed text-lg">
              Industry research broadly points to the same conclusion: conventional, static historical forecasting may fail to reflect sudden market shifts, while incorporating external and more timely data can improve agility and responsiveness—sometimes producing <strong>double-digit percentage reductions in forecast error</strong>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The "Why Gap" */}
      <section className="bg-rs-light-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl font-bold text-rs-dark mb-4">
              The "Why Gap"
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Even when a forecast is statistically "better," it's not operationally useful if planning teams can't explain it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="bg-white rounded-xl p-8 space-y-3">
              <p className="text-rs-dark opacity-60 text-sm font-semibold uppercase tracking-wide mb-4">The questions teams can't answer:</p>
              <p className="text-rs-dark opacity-75 italic">"Why did demand shift this month—what changed?"</p>
              <p className="text-rs-dark opacity-75 italic">"Why are supplier lead times diverging from plan?"</p>
              <p className="text-rs-dark opacity-75 italic">"Why is the model calling for a buy when the business context says to hold?"</p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyGapConsequences.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-lg font-bold text-rs-dark mb-2">{item.label}</h3>
                <p className="text-rs-dark opacity-75 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-rs-dark opacity-75 max-w-2xl mx-auto">
              Black-box predictions don't solve this problem—they often intensify it. Ready Signal is designed to produce <strong>explainable forecasts</strong> so leaders can understand what moved, validate assumptions, and act with confidence.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SupplyChainProblem;
