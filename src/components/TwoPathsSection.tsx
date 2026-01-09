import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Award, ArrowRight } from 'lucide-react';

const TwoPathsSection = () => {
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
            Data for the Analyst. Governance for the Executive.
          </h2>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            We recognized that Data Scientists and Executives need different things, so we built one platform that delivers both.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-10 space-y-6 border-2 border-rs-cyan border-opacity-20"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <Zap className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">
                  The Signal Discovery Engine
                </h3>
                <p className="text-sm text-rs-dark opacity-60">Self-Service</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-rs-dark mb-2">For</h4>
                <p className="text-rs-dark opacity-75">
                  Data Scientists, Analysts, Developers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-rs-dark mb-2">The Value</h4>
                <p className="text-rs-dark opacity-75">
                  Speed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-rs-dark mb-2">The Promise</h4>
                <p className="text-rs-dark opacity-75">
                  Connect your target variable and let our engine mathematically test 40,000 signals to find the features that matter. Pipe them directly into Python, R, or Databricks.
                </p>
              </div>
            </div>

            <Link to="/platform">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-rs-cyan text-white hover:bg-blue-700 transition-all font-semibold px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Explore the Engine</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-10 space-y-6 border-2 border-rs-yellow border-opacity-30"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-rs-yellow bg-opacity-20 flex items-center justify-center">
                <Award className="w-6 h-6 text-rs-dark" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">
                  Managed Precision Forecasting
                </h3>
                <p className="text-sm text-rs-dark opacity-60">Enterprise</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-rs-dark mb-2">For</h4>
                <p className="text-rs-dark opacity-75">
                  VPs of Supply Chain, CFOs, Private Equity Partners.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-rs-dark mb-2">The Value</h4>
                <p className="text-rs-dark opacity-75">
                  Trust.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-rs-dark mb-2">The Promise</h4>
                <p className="text-rs-dark opacity-75">
                  We act as an extension of your team. Our experts validate every signal for causality and provide the "Plain English" narrative reports you need for the Board.
                </p>
              </div>
            </div>

            <Link to="/solutions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-6 py-3 rounded-lg flex items-center justify-center space-x-2"
              >
                <span>Explore Managed Solutions</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TwoPathsSection;
