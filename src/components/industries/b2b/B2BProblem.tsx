import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const B2BProblem = () => {
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
            The Problem
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-rs-light-gray rounded-xl p-10"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-rs-dark">Intent Without Context</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75 mb-4">
            You rely on "Intent Data" (clicks, downloads, site visits) to score leads. But in B2B, a prospect can download every whitepaper and still have a frozen budget.
          </p>

          <div className="bg-white rounded-lg p-6 border-l-4 border-red-500">
            <p className="text-rs-dark opacity-75">
              Internal engagement data fails to capture the macro-economic pressure (e.g., rising interest rates) that kills deals at the CFO level.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BProblem;
