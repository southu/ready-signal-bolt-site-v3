import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const PricingHero = () => {
  return (
    <section className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-rs-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rs-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-yellow rounded-full mb-6">
            <TrendingUp className="w-8 h-8 text-rs-dark" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-rs-yellow">Precision</span> at Every Scale.
          </h1>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto">
            Whether you need the raw engine or the finished forecast, we have a plan for you.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingHero;
