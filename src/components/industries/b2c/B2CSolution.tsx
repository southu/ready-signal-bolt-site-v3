import { motion } from 'framer-motion';
import { Zap, TrendingUp, Cloud } from 'lucide-react';

const B2CSolution = () => {
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
            The Solution
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-10 space-y-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="text-2xl font-bold text-rs-dark">Macro-Thermostat for Media Mix</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75">
            Ready Signal acts as a "Macro-Thermostat" for your media mix. We tell you exactly when to push spend and when to pull back based on the financial health of your target geo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Contextual ROI</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                Realize that a drop in conversion wasn't "bad creative"—it was a drop in Consumer Sentiment.
              </p>
            </div>

            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Cloud className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Weather-Triggered Ad Buys</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                Automate campaign activation only when weather conditions statistically correlate with purchase behavior.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2CSolution;
