import { motion } from 'framer-motion';
import { BarChart3, DollarSign } from 'lucide-react';

const PEDashboard = () => {
  return (
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
            The "Operating Partner" Dashboard
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Unified View</h3>
            <p>Real-time "Red/Green" indicators for every OpCo.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Capital Allocation</h3>
            <p>Deploy capital to the companies with the strongest external tailwinds.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PEDashboard;
