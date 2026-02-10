import { motion } from 'framer-motion';
import { Package, ShoppingCart, DollarSign, Shield } from 'lucide-react';

const decisionAreas = [
  {
    icon: Package,
    title: 'Demand & Inventory Planning',
    points: [
      'Detect earlier turning points by separating true demand movement from temporary fulfillment distortion.',
      'Stabilize inventory plans by distinguishing weather-driven spikes from structural shifts in pricing and purchasing power.',
      'Reduce service risk by aligning safety stock changes with measurable external volatility, not just recent order variance.',
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Procurement & Buying Decisions',
    points: [
      'Connect buy recommendations to input cost pressure and availability risk from trade flows and logistics constraints.',
      'Avoid reactive purchasing triggered by surprises by identifying external drivers that historically precede shortages.',
      'Justify buys with traceable market context that finance and operations can audit.',
    ],
  },
  {
    icon: DollarSign,
    title: 'Pricing, Cost & Materials Planning',
    points: [
      'Link material needs to upstream drivers such as producer pricing dynamics, energy and freight inputs, and labor capacity.',
      'Detect emerging cost pressure earlier than invoice history alone—supporting better timing on hedging or re-sourcing.',
      'Improve cross-functional alignment by tying forecast movements to drivers that finance already monitors.',
    ],
  },
  {
    icon: Shield,
    title: 'Risk Sensing & Operational Agility',
    points: [
      'Incorporate timely external context into planning cadence so teams can act before internal transactions fully reflect the change.',
      'Reduce time spent reconciling unexplained deviations by grounding debates in driver-level evidence.',
      'Move from reactive firefighting to proactive decision-making supported by measurable indicators.',
    ],
  },
];

const SupplyChainDecisions = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            Where External Signals Improve Supply Chain Decisions
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Externally enriched, explainable forecasting supports the decisions that matter most in volatile environments.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {decisionAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rs-cyan to-blue-600 flex items-center justify-center">
                  <area.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rs-dark">{area.title}</h3>
              </div>
              <ul className="space-y-3">
                {area.points.map((point, j) => (
                  <li key={j} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-rs-cyan mt-2.5 flex-shrink-0"></div>
                    <p className="text-rs-dark opacity-75 leading-relaxed text-sm">{point}</p>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainDecisions;
