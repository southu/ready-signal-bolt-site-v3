import { motion } from 'framer-motion';
import { Database, Zap, Code2, FileSpreadsheet } from 'lucide-react';

const IntegrationsHero = () => {
  return (
    <section className="bg-white pt-32 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-rs-dark mb-6">
              Connect the World to{' '}
              <span className="text-rs-cyan">Your Workflow</span>.
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              No new dashboards to learn. No rip-and-replace. Just a high-performance pipe delivering{' '}
              <span className="font-semibold text-rs-cyan">40,000+ signals</span> directly into your existing stack.
            </p>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href="https://www.readysignal.com/ready-signal-api-documentation/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-cyan text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                Read API Docs
              </motion.a>
              <motion.a
                href="https://www.readysignal.com/ready-signal-api-documentation-python-sdk/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-dark text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
              >
                View Python Library
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rs-light-gray to-white rounded-2xl p-12 shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-rs-yellow rounded-full animate-pulse opacity-20"></div>
                </div>

                <div className="relative flex items-center justify-center mb-8">
                  <div className="w-24 h-24 bg-rs-yellow rounded-2xl flex items-center justify-center shadow-xl transform rotate-6">
                    <Database className="w-12 h-12 text-rs-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-rs-cyan"
                  >
                    <Code2 className="w-8 h-8 text-rs-cyan mb-2" />
                    <p className="text-sm font-bold text-rs-dark">Python & R</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-rs-cyan"
                  >
                    <Database className="w-8 h-8 text-rs-cyan mb-2" />
                    <p className="text-sm font-bold text-rs-dark">Snowflake</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-rs-cyan"
                  >
                    <Zap className="w-8 h-8 text-rs-cyan mb-2" />
                    <p className="text-sm font-bold text-rs-dark">Databricks</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-rs-cyan"
                  >
                    <FileSpreadsheet className="w-8 h-8 text-rs-cyan mb-2" />
                    <p className="text-sm font-bold text-rs-dark">Excel</p>
                  </motion.div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-full h-full" style={{ width: '400px', height: '400px' }}>
                    <motion.line
                      x1="200"
                      y1="200"
                      x2="80"
                      y2="280"
                      stroke="#00B8D4"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />
                    <motion.line
                      x1="200"
                      y1="200"
                      x2="320"
                      y2="280"
                      stroke="#00B8D4"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationsHero;
