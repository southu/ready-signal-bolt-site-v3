import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const SupplyChainSolution = () => {
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
            The Solution
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-10 space-y-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-rs-dark">Upstream Monitoring</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75">
            Ready Signal monitors the "Upstream" indicators that predict your costs. We validate Granger Causality to ensure a signal (like "Oil Futures") actually leads your metric (like "Transport Costs") by a proven time lag.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SupplyChainSolution;
