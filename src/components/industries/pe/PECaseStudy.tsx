import { motion } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const beforePoints = [
  'Each portfolio company produced a forecast with its own assumptions and definitions.',
  'Variances were explained after the fact ("timing," "seasonality," "pipeline softness") without a consistent driver framework.',
  'The sponsor\'s operating team spent review time reconciling forecasts across holdings rather than isolating shared risks.',
];

const afterPoints = [
  'Company forecasts were still tailored, but built and refreshed under one consistent methodology.',
  'Forecast changes were attributed to observable external drivers (e.g., labor tightness, input pricing, trade/logistics measures), improving explainability in operating reviews.',
  'Scenario discussions shifted from "whose model is right?" to "which exposures are changing, which holdings are most sensitive, and what actions follow?"',
];

const PECaseStudy = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            From Reconciliation to Decision-Grade Forecasting
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            An anonymized example: a sponsor with several industrial and services holdings.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-red-50 rounded-xl p-8 border border-red-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <XCircle className="w-8 h-8 text-red-500" />
              <h3 className="text-2xl font-bold text-rs-dark">Before</h3>
            </div>
            <ul className="space-y-4">
              {beforePoints.map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-green-50 rounded-xl p-8 border border-green-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <h3 className="text-2xl font-bold text-rs-dark">After</h3>
            </div>
            <ul className="space-y-4">
              {afterPoints.map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-8 bg-rs-light-gray rounded-xl p-6 border-l-4 border-rs-cyan"
        >
          <p className="text-lg text-rs-dark opacity-75 leading-relaxed">
            The practical impact is not merely a cleaner consolidated number. It is a <strong>portfolio view that helps sponsors separate macro-driven variance from execution</strong>—and decide faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PECaseStudy;
