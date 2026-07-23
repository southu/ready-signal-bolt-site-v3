import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HubSpotForm from './contact/HubSpotForm';

const FinalCTASection = () => {
  return (
    <section className="bg-rs-dark py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white text-center">
            Ready to upgrade your business forecasts?
          </h2>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
              <HubSpotForm />
            </div>

            <div className="flex flex-col items-center justify-center">
              <motion.a
                href="https://app.readysignal.com/auth/sign-up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
