import { motion } from 'framer-motion';
import { Zap, Brain } from 'lucide-react';

const DifferentiationSection = () => {
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
            Why We Are Different: Causality, Not Just Correlation.
          </h2>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            Any tool can find a correlation. (e.g., "Ice cream sales correlate with shark attacks"). Relying on simple correlation is dangerous.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-5 h-5 text-rs-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rs-dark mb-2">
                    Granger Causality
                  </h3>
                  <p className="text-rs-dark opacity-75">
                    We apply rigorous statistical tests to ensure the external signal actually leads and predicts your metric.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Brain className="w-5 h-5 text-rs-cyan" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rs-dark mb-2">
                    The "Why" Factor
                  </h3>
                  <p className="text-rs-dark opacity-75">
                    We don't just improve the error rate; we identify the root cause. Whether it's Consumer Credit driving a sales dip or Trucking Employment predicting regional demand, we give you the narrative.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-10 border-l-4 border-rs-cyan"
          >
            <h4 className="text-sm font-bold text-rs-cyan uppercase tracking-wide mb-4">
              Real-World Example
            </h4>
            <div className="space-y-4">
              <div>
                <h5 className="font-semibold text-rs-dark mb-2">The Correlation</h5>
                <p className="text-rs-dark opacity-75">
                  "Ice cream sales spike in July. Shark attacks spike in July. Therefore, ice cream causes shark attacks."
                </p>
              </div>
              <div className="pt-4 border-t border-gray-300">
                <h5 className="font-semibold text-rs-dark mb-2">The Causality (Our Way)</h5>
                <p className="text-rs-dark opacity-75">
                  Both variables are driven by a third factor: warm weather and beach season. Our Granger Causality test would reject this relationship.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiationSection;
