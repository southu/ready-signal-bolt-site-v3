import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

const ManufacturingProblem = () => {
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
            <h3 className="text-2xl font-bold text-rs-dark">Fragmented Forecasting</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75 mb-6">
            Procurement teams often rely on fragmented data and legacy spreadsheets to forecast commodity prices. But commodity prices are driven by complex global forces—inflation, trade flows, and logistics.
          </p>

          <div className="bg-white rounded-lg p-6 border-l-4 border-red-500">
            <p className="text-rs-dark opacity-75">
              When you rely on "gut feel" or last year's contract price, you leave margin on the table.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ManufacturingProblem;
