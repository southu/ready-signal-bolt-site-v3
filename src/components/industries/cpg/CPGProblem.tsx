import { motion } from 'framer-motion';
import { AlertTriangle, DollarSign, Cloud, Users } from 'lucide-react';

const CPGProblem = () => {
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
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            You have perfect data on your own activities—marketing spend, pricing, and inventory. But you have zero visibility into the factors that actually determine if a customer buys: Disposable Income, Consumer Sentiment, and Weather.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-rs-light-gray rounded-xl p-10 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-rs-dark">The "Internal Data" Trap</h3>
          </div>
          <p className="text-rs-dark opacity-75 text-lg">
            Relying solely on sales history assumes the future will look like the past. In a volatile economy, that assumption costs millions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-rs-cyan" />
            </div>
            <h4 className="font-bold text-rs-dark">Disposable Income</h4>
            <p className="text-sm text-rs-dark opacity-75">
              External economic factors that determine purchasing power
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Users className="w-6 h-6 text-rs-cyan" />
            </div>
            <h4 className="font-bold text-rs-dark">Consumer Sentiment</h4>
            <p className="text-sm text-rs-dark opacity-75">
              The confidence level that drives spending decisions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-rs-cyan" />
            </div>
            <h4 className="font-bold text-rs-dark">Weather</h4>
            <p className="text-sm text-rs-dark opacity-75">
              Environmental factors that influence purchase behavior
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CPGProblem;
