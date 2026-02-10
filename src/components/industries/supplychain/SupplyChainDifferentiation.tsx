import { motion } from 'framer-motion';
import { Eye, Radar, ShieldCheck } from 'lucide-react';

const differentiators = [
  {
    icon: Eye,
    title: 'Driver-first transparency',
    description: 'Ready Signal emphasizes driver-level explanations so teams can see which signals moved the forecast and how much they contributed.',
  },
  {
    icon: Radar,
    title: 'Systematic signal discovery',
    description: 'Rather than relying only on a fixed library of indicators, Ready Signal evaluates signals at scale and selects the ones that demonstrate predictive value for the specific demand, pricing, or materials problem.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance over "model worship"',
    description: 'Planning teams can review, permit, and constrain signals—so the forecasting process remains auditable and aligned with operating realities.',
  },
];

const SupplyChainDifferentiation = () => {
  return (
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
            Explainability That Survives Real Planning Meetings
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto mb-4">
            "Advanced forecasting" is a crowded label. In practice, most approaches fall into one of two failure modes:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-5 border-l-4 border-red-400">
              <p className="text-rs-dark opacity-75">
                <strong className="text-rs-dark">1.</strong> Sophisticated models with limited business traceability—accuracy may improve, but the reasoning behind shifts is hard to defend.
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 border-l-4 border-red-400">
              <p className="text-rs-dark opacity-75">
                <strong className="text-rs-dark">2.</strong> Manual "external adjustments" layered on top of ERP—external context exists, but it's applied inconsistently and is difficult to audit or reproduce.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xl font-semibold text-rs-dark max-w-2xl mx-auto">
            Ready Signal is built around a different premise: a forecast that cannot explain itself is not operationally complete.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {differentiators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-rs-yellow to-amber-500 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-rs-dark mb-3">{item.title}</h3>
              <p className="text-rs-dark opacity-75 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainDifferentiation;
