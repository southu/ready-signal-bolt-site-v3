import { motion } from 'framer-motion';
import { Factory } from 'lucide-react';
import manufacturingImage from '../../../assets/images/manufacturing_forecasting_supplychain_readysignal.png';

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
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={manufacturingImage}
                alt="Modern manufacturing facility with automated systems"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rs-dark via-transparent to-transparent opacity-40"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingHero;
