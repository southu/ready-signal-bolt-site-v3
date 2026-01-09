import { motion } from 'framer-motion';
import { Cloud, Search, Shield, TrendingUp } from 'lucide-react';

const HowItWorksHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-rs-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rs-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            From <span className="text-rs-yellow">Chaos</span> to{' '}
            <span className="text-rs-cyan">Clarity</span> in 4 Steps.
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            How we turn the noise of the global economy into a precise, causal business signal.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-rs-yellow via-rs-cyan to-rs-yellow transform -translate-y-1/2"
              style={{ transformOrigin: 'left' }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: Cloud, label: 'INGEST', delay: 0.2 },
                { icon: Search, label: 'DISCOVER', delay: 0.4 },
                { icon: Shield, label: 'GOVERN', delay: 0.6 },
                { icon: TrendingUp, label: 'PREDICT', delay: 0.8 },
              ].map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: step.delay }}
                  className="flex flex-col items-center"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 flex items-center justify-center shadow-2xl">
                      <step.icon className="w-10 h-10 text-rs-yellow" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-rs-cyan flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-bold tracking-wider">{step.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksHero;
