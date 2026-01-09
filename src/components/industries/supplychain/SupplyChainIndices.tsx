import { motion } from 'framer-motion';
import { Truck, Cloud, Factory } from 'lucide-react';

const SupplyChainIndices = () => {
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
            Key Indices We Monitor
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
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Freight & Transportation</h3>
            <p>Predict shipping rate volatility.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Severe Weather Events</h3>
            <p>Re-route logistics based on probabilistic weather risk.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">Industrial Production</h3>
            <p>Gauge supplier capacity before bottlenecks occur.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainIndices;
