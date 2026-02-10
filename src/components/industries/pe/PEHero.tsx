import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';
import privateEquityImg from '../../../assets/images/private_equity.jpeg';

const PEHero = () => {
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
              <Building2 className="w-4 h-4 text-rs-yellow" />
              <span className="text-sm font-medium">Private Equity</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Explainable Forecasting for{' '}
              <span className="text-rs-yellow">Private Equity</span>{' '}
              <span className="text-rs-cyan">Portfolios</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Private equity firms don't manage a single P&L—they manage a portfolio of operating companies with different demand engines, cost structures, and macro sensitivities.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              The problem isn't that forecasting is impossible. It's that forecasting becomes <em>non-comparable</em>: each holding develops its own model, its own definitions, and its own narrative. By the time forecasts reach the board or investment committee, leaders are debating the <em>inputs and methodology</em> instead of the <em>decision</em>.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              Ready Signal delivers externally enriched, driver-level forecasting that scales across a portfolio without forcing a one-size-fits-all model.
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
                src={privateEquityImg}
                alt="Explainable forecasting for private equity portfolios"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PEHero;
