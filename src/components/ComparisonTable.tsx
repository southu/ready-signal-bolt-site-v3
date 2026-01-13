import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ComparisonTable = () => {
  const features = [
    {
      feature: 'Speed to Value',
      consulting: '3-6 Months',
      automl: 'Minutes (but low accuracy)',
      readySignal: 'Minutes (Self-Service) / 4 Weeks (Managed)',
    },
    {
      feature: 'Data Source',
      consulting: 'Manual Scraping (Slow)',
      automl: 'Internal Data Only (Blind)',
      readySignal: '3M+ Features from 40k+ Sources',
    },
    {
      feature: 'Transparency',
      consulting: 'High (PowerPoint Decks)',
      automl: 'Zero ("Black Box" AI)',
      readySignal: '100% Explainable Narrative',
    },
    {
      feature: 'Causality',
      consulting: 'Human Gut Feel',
      automl: 'Spurious Correlations',
      readySignal: 'Granger Causality Validated',
    },
    {
      feature: 'Cost',
      consulting: '$$$$ (Hourly Billing)',
      automl: '$$ (Seat License)',
      readySignal: 'Value-Based (Flat Fee)',
    },
  ];

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
            Why Ready Signal Wins on ROI.
          </h2>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            Stop paying consultants to clean data. Stop paying AI vendors for black boxes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="overflow-x-auto"
        >
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-4 px-4 font-bold text-rs-dark">Feature</th>
                <th className="text-left py-4 px-4 font-bold text-rs-dark">Traditional Consulting</th>
                <th className="text-left py-4 px-4 font-bold text-rs-dark">Generic Auto-ML Tools</th>
                <th className="text-left py-4 px-4 font-bold text-rs-dark">Ready Signal</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row, index) => (
                <motion.tr
                  key={row.feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-rs-light-gray'}`}
                >
                  <td className="py-4 px-4 font-semibold text-rs-dark">{row.feature}</td>
                  <td className="py-4 px-4 text-rs-dark opacity-75">{row.consulting}</td>
                  <td className="py-4 px-4 text-rs-dark opacity-75">{row.automl}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-rs-dark">{row.readySignal}</span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;
