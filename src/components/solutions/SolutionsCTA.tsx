import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const SolutionsCTA = () => {
  return (
    <section className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Don't Let Volatility Catch You Off Guard.
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <Calendar className="w-5 h-5" />
            <span>Book a Strategy Consultation</span>
          </motion.button>

          <p className="text-white text-lg">
            Speak directly with a Lead Data Scientist, not a salesperson.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionsCTA;
