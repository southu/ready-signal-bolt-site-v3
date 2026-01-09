import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import b2bMarketingImg from '../../../assets/images/b2b_marketing.jpeg';

const B2BHero = () => {
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
              <Target className="w-4 h-4 text-rs-yellow" />
              <span className="text-sm font-medium">B2B Marketing</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Your Leads Are
              <br />
              <span className="text-rs-yellow">Active.</span>
              <br />
              But Are Their
              <br />
              <span className="text-rs-cyan">Budgets?</span>
            </h1>

            <p className="text-xl text-gray-300">
              Intent data tells you who wants to buy. Ready Signal tells you who can buy.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={b2bMarketingImg}
                alt="B2B Marketing"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default B2BHero;
