import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-rs-cyan bg-opacity-10 text-rs-cyan rounded-full text-sm font-semibold">
                  Predictive Intelligence Platform
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-rs-dark leading-tight">
                Stop Reacting to Market Shifts.
                <br />
                <span className="text-rs-cyan">Start Predicting Them.</span>
              </h1>

              <p className="text-xl text-rs-dark opacity-75 leading-relaxed">
                Transform your business operations with AI-powered predictive analytics.
                Anticipate challenges before they arise and make data-driven decisions with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rs-dark hover:bg-rs-light-gray transition-all font-semibold px-8 py-4 rounded-lg border-2 border-rs-dark flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-rs-dark">40,000+</div>
                <div className="text-sm text-rs-dark opacity-75">External Signals</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-rs-dark">50%+</div>
                <div className="text-sm text-rs-dark opacity-75">Error Reduction</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-rs-dark">100%</div>
                <div className="text-sm text-rs-dark opacity-75">Explainable</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-rs-cyan to-blue-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-white rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-rs-dark">Predictive Analytics Dashboard</h3>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Live
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-rs-dark">System Performance</span>
                      <span className="font-semibold text-rs-cyan">98.5%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '98.5%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="bg-rs-cyan h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-rs-dark">Prediction Accuracy</span>
                      <span className="font-semibold text-rs-cyan">97.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '97.2%' }}
                        transition={{ duration: 1.5, delay: 0.7 }}
                        className="bg-rs-cyan h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-rs-dark">Data Processing</span>
                      <span className="font-semibold text-rs-cyan">95.8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '95.8%' }}
                        transition={{ duration: 1.5, delay: 0.9 }}
                        className="bg-rs-cyan h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-rs-light-gray rounded-lg">
                    <div className="text-2xl font-bold text-rs-dark">1.2M</div>
                    <div className="text-xs text-rs-dark opacity-75">Data Points</div>
                  </div>
                  <div className="text-center p-4 bg-rs-light-gray rounded-lg">
                    <div className="text-2xl font-bold text-rs-dark">54</div>
                    <div className="text-xs text-rs-dark opacity-75">Active Models</div>
                  </div>
                  <div className="text-center p-4 bg-rs-light-gray rounded-lg">
                    <div className="text-2xl font-bold text-rs-dark">99.9%</div>
                    <div className="text-xs text-rs-dark opacity-75">Uptime</div>
                  </div>
                </div>
              </div>

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-rs-yellow rounded-full blur-2xl"
              ></motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-rs-cyan rounded-full blur-2xl"
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
