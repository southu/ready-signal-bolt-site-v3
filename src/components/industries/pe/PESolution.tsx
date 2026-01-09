import { motion } from 'framer-motion';
import { Zap, PieChart, TrendingUp } from 'lucide-react';

const PESolution = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            The Solution
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-10 space-y-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-rs-dark">Standardized Signal Discovery</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75">
            Ready Signal deploys a standardized "Signal Discovery" layer across your portfolio. We map the specific sensitivities of each company to the same global macro-economic baseline.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <PieChart className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Driver Decomposition</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                We tell you: "Revenue is up $850k. 48% is Seasonality, 9% is Trend, but 21% is CPI-Related Demand." This distinguishes temporary cyclical bumps from structural growth.
              </p>
            </div>

            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Shared Intelligence</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                See how a single factor (e.g., "Housing Starts") creates a tailwind for your Construction holding but a headwind for your Home Goods holding.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PESolution;
