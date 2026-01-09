import { motion } from 'framer-motion';
import { AlertTriangle, Zap } from 'lucide-react';

const Philosophy = () => {
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
            The <span className="text-red-600">"Correlational"</span> Trap
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-6"
          >
            <p className="text-lg text-rs-dark opacity-75">
              Most data teams fail because they look for simple correlations in raw data. They find that
              "Rainfall" correlates with "Software Sales" and put it in the model.
            </p>

            <div className="bg-white rounded-lg p-6 border-l-4 border-red-500">
              <div className="flex items-center space-x-3 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <h3 className="font-bold text-rs-dark">The Problem</h3>
              </div>
              <p className="text-rs-dark opacity-75">
                That's a coincidence, not a cause. When the coincidence stops, the model breaks.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white space-y-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-8 h-8 text-rs-yellow" />
              <h3 className="text-2xl font-bold">The Ready Signal Difference</h3>
            </div>

            <p className="text-lg">
              We don't just look for patterns; we test for <strong>Causality</strong>,{' '}
              <strong>Lead Time</strong>, and <strong>Stationarity</strong>.
            </p>

            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-medium">
                We treat forecasting as a physics problem, not just a math problem.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
