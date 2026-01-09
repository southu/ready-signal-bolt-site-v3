import { motion } from 'framer-motion';
import { Factory, TrendingUp } from 'lucide-react';

const ManufacturingHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-rs-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rs-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Factory className="w-4 h-4 text-rs-yellow" />
              <span className="text-sm font-medium">Manufacturing & Procurement</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Strategy Doesn't
              <br />
              <span className="text-rs-yellow">Forecast Commodity</span>
              <br />
              Prices.
              <br />
              <span className="text-rs-cyan">Data Does.</span>
            </h1>

            <p className="text-xl text-gray-300">
              Stop reacting to price spikes. Predict them 3 months out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-2xl p-12 shadow-2xl">
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <Factory className="w-8 h-8 text-white opacity-60" />
                    <div className="flex-1 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingHero;
