import { motion } from 'framer-motion';
import { TrendingUp, GitBranch, Building2, Layers, Monitor, RefreshCw, FileText } from 'lucide-react';

const decisionChanges = [
  {
    icon: TrendingUp,
    role: 'Investment Teams',
    description: 'Stop treating forecasting as an after-action justification exercise. With driver attribution, the discussion becomes: Is the thesis intact under current conditions? Which parts of performance are macro-driven, and which reflect company execution? That supports cleaner underwriting updates, tighter risk framing, and more defensible valuation support.',
  },
  {
    icon: GitBranch,
    role: 'Operating Partners',
    description: 'Gain a common diagnostic language across holdings. Instead of chasing disconnected explanations, identify which exposures are shared (and therefore portfolio-relevant) versus which are idiosyncratic. Interventions—pricing, hiring, inventory posture, capex timing—become more targeted because the "why" is explicit.',
  },
  {
    icon: Building2,
    role: 'Portfolio Company Leaders',
    description: 'Get a forecast that updates with the world, not just with the close. That improves planning discipline without forcing a corporate template that doesn\'t fit the business, and it strengthens communication with boards because the narrative is anchored in measurable drivers.',
  },
];

const integrationPoints = [
  {
    icon: Monitor,
    text: 'Integrates with common BI stacks and analytics environments',
  },
  {
    icon: FileText,
    text: 'Supports portfolio reporting, operating reviews, and board materials',
  },
  {
    icon: RefreshCw,
    text: 'Enables repeatable forecasting governance across holdings (refresh cadence, scenarios, monitoring)',
  },
];

const PEDecisions = () => {
  return (
    <>
      {/* How Decision-Making Changes */}
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
              How Decision-Making Changes Across the Firm
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              A forecasting system earns its keep when it changes behavior.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {decisionChanges.map((item, i) => (
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
                <h3 className="text-xl font-bold text-rs-dark mb-4">{item.role}</h3>
                <p className="text-rs-dark opacity-75 leading-relaxed text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center"
          >
            <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
              At the portfolio level, the firm moves from reconciling divergent forecasts to managing a <strong>unified view of reality</strong>—one that remains specific at the company level.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Integration and Workflow */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl font-bold text-rs-dark mb-4">
              Integration & Workflow
            </h2>
            <p className="text-lg text-rs-dark opacity-75">
              Ready Signal is designed to fit existing PE operating cadence:
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {integrationPoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-rs-light-gray rounded-xl p-6 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center mx-auto mb-3">
                  <point.icon className="w-5 h-5 text-rs-cyan" />
                </div>
                <p className="text-rs-dark opacity-75 text-sm">{point.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PEDecisions;
