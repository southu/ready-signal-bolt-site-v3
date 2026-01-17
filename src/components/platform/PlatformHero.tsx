import { motion } from 'framer-motion';
import { ArrowRight, Terminal, FileCode } from 'lucide-react';

const PlatformHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-rs-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rs-yellow rounded-full blur-3xl"></div>
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
              <Terminal className="w-4 h-4 text-rs-cyan" />
              <span className="text-sm font-medium">Signal Discovery Engine</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              The World's First Computational
              <br />
              <span className="text-rs-yellow">Signal Discovery Engine.</span>
            </h1>

            <p className="text-xl text-gray-300">
              The world's first Signal Discovery Engine that instantly tests 3 million+ features from 40,000+ data sources against your target variable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://app.readysignal.com/auth/sign-up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl inline-flex items-center justify-center space-x-2"
              >
                <span>Get API Key - Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.a
                href="https://www.readysignal.com/overview-of-data-science-treatments/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-10 backdrop-blur-sm text-white hover:bg-opacity-20 transition-all font-semibold px-8 py-4 rounded-lg inline-flex items-center justify-center space-x-2 border border-white border-opacity-20"
              >
                <FileCode className="w-5 h-5" />
                <span>Read Documentation</span>
              </motion.a>
            </div>

            <p className="text-sm text-gray-400">
              Compatible with Python, R, and Databricks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gray-900 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-white border-opacity-10 shadow-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400">terminal</span>
              </div>

              <div className="font-mono text-sm space-y-2">
                <div className="text-gray-400">
                  <span className="text-green-400">$</span> import readysignal as rs
                </div>
                <div className="text-gray-400">
                  <span className="text-green-400">$</span> signals = rs.discover(target='sales.csv')
                </div>
                <div className="text-rs-cyan mt-4">
                  ✓ Analyzing 3M+ features from 40,000+ sources...
                </div>
                <div className="text-rs-yellow">
                  ✓ Found 12 causal predictors
                </div>
                <div className="text-green-400">
                  ✓ Model R² improved: 0.24 → 0.78
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PlatformHero;
