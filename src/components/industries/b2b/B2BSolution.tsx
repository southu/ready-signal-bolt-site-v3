import { motion } from 'framer-motion';
import { Zap, TrendingUp, Target } from 'lucide-react';

const B2BSolution = () => {
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
            <h3 className="text-2xl font-bold text-rs-dark">Sector-Specific Economic Health</h3>
          </div>

          <p className="text-lg text-rs-dark opacity-75">
            Ready Signal overlays your pipeline with Sector-Specific Economic Health. We identify which accounts are in tailwind industries (e.g., "Tech is freezing, but Manufacturing is spending").
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Predict Deal Velocity</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                Know which opportunities will stall based on their sector's "Business Lending" access.
              </p>
            </div>

            <div className="bg-rs-light-gray rounded-lg p-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-rs-cyan" />
                <h4 className="font-bold text-rs-dark">Dynamic Lead Scoring</h4>
              </div>
              <p className="text-sm text-rs-dark opacity-75">
                Downgrade leads from sectors facing headwinds; upgrade leads from sectors with expanding CapEx.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default B2BSolution;
