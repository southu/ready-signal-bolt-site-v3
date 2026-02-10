import { motion } from 'framer-motion';
import { BarChart3, Award, Sliders, Database, FileSpreadsheet } from 'lucide-react';

const outputs = [
  {
    icon: BarChart3,
    text: 'Explainable demand forecasts enriched with external drivers',
  },
  {
    icon: Award,
    text: 'Driver rankings—what matters most, and when',
  },
  {
    icon: Sliders,
    text: 'Scenario-ready signal inputs for planning cycles',
  },
  {
    icon: Database,
    text: 'Structured datasets for modeling, reporting, and governance',
  },
];

const integrations = [
  'Excel',
  'Power BI',
  'Anaplan',
  'SAP',
  'Python / R',
  'AWS',
];

const SupplyChainIndices = () => {
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
            Integrations & Outputs
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Forecast-ready outputs designed for how supply chain organizations actually operate—across planning, procurement, finance, and operations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Outputs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-rs-dark mb-6">Typical Outputs</h3>
            <div className="space-y-4">
              {outputs.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 bg-rs-light-gray rounded-lg p-4">
                  <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-rs-cyan" />
                  </div>
                  <p className="text-rs-dark opacity-75 leading-relaxed pt-1.5">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-rs-dark mb-6">Plugs Into Your Existing Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {integrations.map((tool, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-rs-light-gray rounded-xl p-5 text-center"
                >
                  <FileSpreadsheet className="w-6 h-6 text-rs-cyan mx-auto mb-2" />
                  <span className="text-rs-dark font-semibold text-sm">{tool}</span>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-rs-dark opacity-75 leading-relaxed">
              The goal isn't to replace your stack. It's to improve the inputs and increase confidence in the decisions that come out of it.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainIndices;
