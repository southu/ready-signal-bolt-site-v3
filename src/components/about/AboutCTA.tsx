import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Mail } from 'lucide-react';

const AboutCTA = () => {
  return (
    <section className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Join the <span className="text-rs-yellow">Movement</span>
          </h2>

          <p className="text-2xl text-gray-300 mb-12">
            Stop wrangling data. Start telling the story of your future.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="/contact-us/#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-rs-cyan text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
            >
              <Briefcase className="w-5 h-5" />
              <span>Work With Us</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="/contact-us/#contact-form"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 bg-white text-rs-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <Mail className="w-5 h-5" />
              <span>Contact Us</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
