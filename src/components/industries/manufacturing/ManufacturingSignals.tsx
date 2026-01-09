import { motion } from 'framer-motion';
import { BarChart3, DollarSign, Truck } from 'lucide-react';

const ManufacturingSignals = () => {
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
            Key Signals
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
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
            <h3 className="text-xl font-bold">Global Commodity Indices</h3>
            <p>Steel, Oil, Grain pricing trends and predictions</p>
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
            <h3 className="text-xl font-bold">Producer Price Index</h3>
            <p>Leading indicator for input cost changes</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Freight & Logistics Costs</h3>
            <p>Transportation cost predictions and trends</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingSignals;
