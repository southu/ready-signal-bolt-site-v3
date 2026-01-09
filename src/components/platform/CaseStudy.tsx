import { motion } from 'framer-motion';
import { Lightbulb, TrendingUp, Target } from 'lucide-react';

const CaseStudy = () => {
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
            Anatomy of a Breakthrough Forecast
          </h2>
          <p className="text-lg text-rs-dark opacity-75">
            The "Hidden Signal" Case Study
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-10 space-y-8 shadow-xl"
          >
            <div className="flex items-center justify-center">
              <div className="w-32 h-48 bg-gradient-to-b from-rs-cyan to-blue-600 rounded-3xl shadow-lg relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-32 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm"></div>
                </div>
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white bg-opacity-30 rounded-full"></div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rs-dark mb-2">The Setup</h3>
                  <p className="text-rs-dark opacity-75">
                    A major CPG brand was forecasting demand for a sports drink. Their internal model (Price + Marketing Spend) flatlined at an R-Squared of 0.24. They were missing 76% of the variance.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-rs-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rs-dark mb-2">The Discovery</h3>
                  <p className="text-rs-dark opacity-75">
                    They ran the data through Ready Signal. The engine tested 4,000 economic indicators and flagged "Total Consumer Credit (Lag 6)" as a high-causality feature.
                  </p>
                </div>
              </div>

              <div className="bg-rs-light-gray rounded-xl p-6">
                <h4 className="font-bold text-rs-dark mb-3">The Why</h4>
                <p className="text-rs-dark opacity-75">
                  It wasn't just seasonality. As credit tightened, consumers traded down from premium sports drinks to water or generic alternatives. The lag showed this behavior happened 6 months after credit shifted.
                </p>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rs-dark mb-2">The Outcome</h3>
                  <p className="text-rs-dark opacity-75 mb-4">
                    By adding that single feature, the model's R-Squared jumped to 0.78. They predicted a sales dip 6 months in advance.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-rs-dark">R² Improvement</span>
                      <span className="text-2xl font-bold text-green-600">0.24 → 0.78</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudy;
