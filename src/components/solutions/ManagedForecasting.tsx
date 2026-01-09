import { motion } from 'framer-motion';
import { Shield, FileText, TrendingUp, Users } from 'lucide-react';
import humanInLoopImg from '../../assets/images/humanintheloop.jpeg';

const ManagedForecasting = () => {
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
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Users className="w-20 h-20 text-rs-cyan" />
              <div className="absolute -right-2 -bottom-2 w-10 h-10 bg-rs-yellow rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-rs-dark" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            Managed Precision Forecasting
          </h2>
          <p className="text-2xl text-rs-dark font-semibold mb-2">
            An Extension of Your Data Science Team.
          </p>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            Ready Signal Managed Solutions functions as a specialized "SWAT Team" for your most critical forecasts. We wrap our Signal Discovery Engine in a layer of expert human governance.
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-10"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">Layer 1: Methodological Governance</h3>
                <p className="text-sm text-rs-dark opacity-60">The Guardrails</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-rs-dark mb-2">Spurious Correlation Filtering</h4>
                <p className="text-rs-dark opacity-75">
                  A machine might find that "Rainfall in Seattle" correlates with "Software Sales in Boston." Mathematically, it fits. Logically, it's noise. Our senior data scientists review every signal to ensure it passes the "Common Sense Test" before it enters your production model.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-rs-dark mb-2">Granger Causality Validation</h4>
                <p className="text-rs-dark opacity-75">
                  We don't just look for patterns; we statistically prove that the external signal leads your metric by a specific time lag.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-10"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">Layer 2: Narrative Intelligence</h3>
                <p className="text-sm text-rs-dark opacity-60">The Story</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={humanInLoopImg}
                  alt="Human-in-the-Loop Governance"
                  className="w-full h-64 object-cover"
                />
              </div>

              <div>
                <h4 className="font-bold text-rs-dark mb-3">The "Plain English" Report</h4>
                <p className="text-rs-dark opacity-75 mb-4">
                  We translate complex statistical outputs into business briefs.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                    <div className="text-sm font-semibold text-rs-dark mb-2">Before:</div>
                    <p className="text-sm text-rs-dark opacity-75">"Model predicts -4.2% variance."</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                    <div className="text-sm font-semibold text-rs-dark mb-2">After:</div>
                    <p className="text-sm text-rs-dark opacity-75">
                      "Demand is softening due to a tightening in Consumer Credit (Lag 6) and a dip in Regional Housing Starts, creating a headwind for Q3."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-rs-light-gray rounded-lg p-6">
                <h5 className="font-semibold text-rs-dark mb-2">Benefit:</h5>
                <p className="text-rs-dark opacity-75">
                  You walk into your S&OP meeting with answers, not just spreadsheets.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-10"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">Layer 3: Risk Scenario Modeling</h3>
                <p className="text-sm text-rs-dark opacity-60">The Defense</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-rs-dark mb-3">Stress Testing</h4>
                <p className="text-rs-dark opacity-75 mb-4">
                  We don't just predict the likely future; we prepare you for the volatility.
                </p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-rs-light-gray rounded-lg p-4">
                    <h5 className="font-semibold text-rs-dark mb-2">Scenario A:</h5>
                    <p className="text-sm text-rs-dark opacity-75">What if Inflation stays above 4%?</p>
                  </div>
                  <div className="bg-rs-light-gray rounded-lg p-4">
                    <h5 className="font-semibold text-rs-dark mb-2">Scenario B:</h5>
                    <p className="text-sm text-rs-dark opacity-75">What if a hurricane disrupts Gulf logistics?</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                  <h5 className="font-semibold text-rs-dark mb-2">Outcome:</h5>
                  <p className="text-rs-dark opacity-75">
                    We quantify the impact of these "What Ifs" on your bottom line so you can hedge appropriately.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManagedForecasting;
