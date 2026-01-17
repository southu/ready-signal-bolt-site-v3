import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import logoIcon from '../../assets/images/ready-signal-icon-gold.png';

const IntegrationsCTA = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark rounded-3xl shadow-2xl overflow-hidden relative"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 right-10 w-64 h-64 bg-rs-yellow rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-rs-cyan rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-12 lg:p-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center justify-center mb-8"
            >
              <img src={logoIcon} alt="Ready Signal Icon" className="w-20 h-20" />
            </motion.div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Stop Coding Scrapers.
              <br />
              <span className="text-rs-yellow">Start Coding Models.</span>
            </h2>

            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Your time is too valuable to waste on data plumbing. Get instant access to production-ready signals and focus on what matters: building better predictions.
            </p>

            <motion.a
              href="https://app.readysignal.com/auth/sign-up"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rs-yellow text-rs-dark px-10 py-5 rounded-xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-2xl inline-flex items-center space-x-3"
            >
              <span>Get Your API Key</span>
              <ArrowRight className="w-6 h-6" />
            </motion.a>

            <div className="mt-8 flex items-center justify-center space-x-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-rs-cyan rounded-full"></div>
                <span>Free Trial Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-rs-cyan rounded-full"></div>
                <span>No Credit Card Required</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationsCTA;
