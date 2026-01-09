import { motion } from 'framer-motion';
import { Building2, BarChart3, TrendingUp } from 'lucide-react';

const PrivateEquity = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            For Private Equity
          </h2>
          <p className="text-2xl text-rs-dark font-semibold">
            The "Operating Partner" Dashboard
          </p>
          <p className="text-lg text-rs-dark opacity-75 mt-2">
            One Standard for Your Entire Portfolio.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-rs-dark">The Problem</h3>
              <p className="text-rs-dark opacity-75">
                You have 15 portfolio companies. They all forecast differently. You have no unified view of macro-risk.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-rs-dark">The Solution</h3>
              <p className="text-rs-dark opacity-75 mb-4">
                We deploy a standardized "Signal Discovery Layer" across every OpCo.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-rs-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-rs-dark mb-1">Unified Heatmap</h4>
                    <p className="text-sm text-rs-dark opacity-75">
                      See immediately which companies are facing macro-headwinds (Red) and which have tailwinds (Green).
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-rs-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-rs-dark mb-1">Driver Decomposition</h4>
                    <p className="text-sm text-rs-dark opacity-75">
                      We tell you: "Revenue is up across the portfolio. 10% is organic growth, but 15% is just inflationary pricing power." Knowing the difference dictates your exit strategy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 shadow-xl">
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
                  const isGreen = [0, 2, 6].includes(index);
                  const isRed = [1, 4, 7].includes(index);
                  return (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`aspect-square rounded-lg flex items-center justify-center ${
                        isGreen
                          ? 'bg-green-500 bg-opacity-20 border-2 border-green-500'
                          : isRed
                          ? 'bg-red-500 bg-opacity-20 border-2 border-red-500'
                          : 'bg-gray-300 bg-opacity-30'
                      }`}
                    >
                      <Building2
                        className={`w-8 h-8 ${
                          isGreen ? 'text-green-600' : isRed ? 'text-red-600' : 'text-gray-400'
                        }`}
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PrivateEquity;
