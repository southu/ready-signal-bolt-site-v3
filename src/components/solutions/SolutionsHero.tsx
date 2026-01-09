import { motion } from 'framer-motion';
import { Calendar, Layers } from 'lucide-react';

const SolutionsHero = () => {
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
              <Layers className="w-4 h-4 text-rs-yellow" />
              <span className="text-sm font-medium">Managed Precision Forecasting</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Forecasts You Can Actually
              <br />
              <span className="text-rs-yellow">Explain to the Board.</span>
            </h1>

            <p className="text-xl text-gray-300">
              We don't just deliver data. We deliver the "Human-in-the-Loop" confidence your strategy requires.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Consultation</span>
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-2xl p-12 shadow-2xl">
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="col-span-3 h-32 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <Layers className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="h-24 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg"></div>
                <div className="h-24 bg-rs-yellow bg-opacity-30 backdrop-blur-sm rounded-lg"></div>
                <div className="h-24 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 backdrop-blur-sm"></div>
                <div className="flex-1 mx-4 h-1 bg-white bg-opacity-20"></div>
                <div className="w-12 h-12 rounded-lg bg-rs-yellow bg-opacity-30"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsHero;
