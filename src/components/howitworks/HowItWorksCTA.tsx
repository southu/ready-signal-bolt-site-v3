import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HowItWorksCTA = () => {
  return (
    <section className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to See How It Works
            <br />
            <span className="text-rs-yellow">On Your Data?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-10">
            Upload one target variable. See what drives it in minutes.
          </p>

          <motion.a
            href="https://app.readysignal.com/auth/sign-up"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 bg-rs-yellow text-rs-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            <span>Run a Free Discovery Test</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksCTA;
