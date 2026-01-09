import { motion } from 'framer-motion';
import { Box, Eye, CheckCircle, Users, TrendingUp } from 'lucide-react';

const Philosophy = () => {
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
          <h2 className="text-4xl font-bold text-rs-dark mb-4">The Explainability Mandate</h2>
          <p className="text-2xl text-rs-dark opacity-75 font-medium">
            A Forecast You Can't Explain is a Liability.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-gray-800 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600 opacity-20 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <Box className="w-12 h-12 text-red-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">"Black Box"</h3>
              <div className="space-y-3">
                <p className="opacity-75">Executive: "Why did the forecast change?"</p>
                <p className="text-red-400 font-medium">Data Scientist: "The algorithm did it."</p>
                <p className="opacity-75 italic">Confused Executive 😕</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rs-yellow opacity-20 rounded-full -mr-16 -mt-16"></div>
            <div className="relative">
              <Eye className="w-12 h-12 text-rs-yellow mb-4" />
              <h3 className="text-2xl font-bold mb-4">"Glass Box"</h3>
              <div className="space-y-3">
                <p className="opacity-90">Executive: "Why did the forecast change?"</p>
                <p className="text-rs-yellow font-medium">
                  Data Scientist: "Housing Starts dropped in the Midwest."
                </p>
                <p className="opacity-90 italic">Nodding Executive ✓</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 lg:p-12"
        >
          <h3 className="text-3xl font-bold text-rs-dark mb-6">The Core Belief</h3>
          <p className="text-lg text-rs-dark opacity-75 mb-8">
            In the era of AI, accuracy is table stakes. <strong>Explainability is the currency of trust.</strong>
          </p>
          <p className="text-lg text-rs-dark opacity-75 mb-8">
            We believe that "The Algorithm Did It" is not an acceptable strategy. If you can't explain the
            drivers of your forecast—if you can't say "We are down because Housing Starts dropped in the
            Midwest"—then you aren't a strategic partner to your business; you're just a calculator.
          </p>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="text-2xl font-bold text-rs-dark mb-6">We Stand For:</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-rs-dark mb-2">Causality over Correlation</h5>
                  <p className="text-rs-dark opacity-75">
                    We reject "spurious correlations." We only trust signals that make business sense.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Users className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-rs-dark mb-2">Human-in-the-Loop</h5>
                  <p className="text-rs-dark opacity-75">
                    Algorithms are powerful, but they lack context. We believe the best models combine
                    machine speed with human wisdom.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <TrendingUp className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h5 className="font-bold text-rs-dark mb-2">Democratization</h5>
                  <p className="text-rs-dark opacity-75">
                    Precision external data shouldn't be the exclusive weapon of hedge funds. It should be
                    available to every demand planner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
