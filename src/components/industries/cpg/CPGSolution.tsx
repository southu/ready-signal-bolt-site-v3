import { motion } from 'framer-motion';
import { Zap, TrendingUp } from 'lucide-react';

const CPGSolution = () => {
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
            <h3 className="text-2xl font-bold text-rs-dark">Ready Signal Connection</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75">
            Ready Signal connects your SKU-level demand data to over 40,000 external economic and demographic drivers.
          </p>

          <div className="bg-gradient-to-r from-rs-cyan to-blue-600 rounded-lg p-8 text-white">
            <div className="flex items-start space-x-4">
              <TrendingUp className="w-8 h-8 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-3">Predictive Insight</h4>
                <p className="text-lg">
                  We tell you when a household will switch from "Premium" to "Value" brands—months before they actually do.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CPGSolution;
