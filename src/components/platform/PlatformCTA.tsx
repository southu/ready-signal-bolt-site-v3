import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import logoIcon from '../../assets/images/ready-signal-icon-gold.png';

const PlatformCTA = () => {
  return (
    <section className="bg-gradient-to-br from-rs-cyan to-blue-600 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <img src={logoIcon} alt="Ready Signal Icon" className="w-20 h-20 mx-auto" />
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Give Your Model the Data It Deserves.
          </h2>

          <motion.a
            href="https://app.readysignal.com/auth/sign-up"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-10 py-4 rounded-lg shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
          >
            <span>Get Your API Key</span>
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <p className="text-white text-lg">
            Free for individual developers. Enterprise plans for teams.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformCTA;
