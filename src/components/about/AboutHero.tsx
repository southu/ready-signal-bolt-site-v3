import { motion } from 'framer-motion';
import { Code2, MapPin } from 'lucide-react';

const AboutHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-rs-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rs-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Built by <span className="text-rs-yellow">Data Scientists</span>,
              <br />
              For <span className="text-rs-cyan">Data Scientists</span>.
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              We didn't build Ready Signal because we wanted to start a software company. We built it
              because we were tired of being wrong.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <MapPin className="w-5 h-5" />
              <span>Founded in 2019 in Ann Arbor by Jason Harper, an economist and data scientist with nearly 3 decades of building econometric models for businesses of all sizes.</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
              <div className="absolute top-4 left-4 flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="mt-8 space-y-3 font-mono text-sm">
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">import</span>
                  <span className="text-yellow-300">pandas</span>
                  <span className="text-purple-400">as</span>
                  <span className="text-yellow-300">pd</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-purple-400">from</span>
                  <span className="text-yellow-300">ready_signal</span>
                  <span className="text-purple-400">import</span>
                  <span className="text-yellow-300">SignalEngine</span>
                </div>
                <div className="h-4"></div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400">engine</span>
                  <span className="text-white">=</span>
                  <span className="text-yellow-300">SignalEngine</span>
                  <span className="text-white">()</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400">signals</span>
                  <span className="text-white">=</span>
                  <span className="text-blue-400">engine</span>
                  <span className="text-white">.</span>
                  <span className="text-yellow-300">discover</span>
                  <span className="text-white">(</span>
                </div>
                <div className="pl-8 flex items-start space-x-2">
                  <span className="text-gray-400">target=</span>
                  <span className="text-green-400">'sales'</span>
                  <span className="text-white">,</span>
                </div>
                <div className="pl-8 flex items-start space-x-2">
                  <span className="text-gray-400">test_causality=</span>
                  <span className="text-orange-400">True</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-white">)</span>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-2 text-rs-cyan">
                <Code2 className="w-5 h-5" />
                <span className="text-sm">Real tools, built by practitioners</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
