import { motion } from 'framer-motion';
import { BarChart3, FileSpreadsheet, Workflow, PieChart } from 'lucide-react';

const BusinessIntelligence = () => {
  const tools = [
    {
      name: 'Domo',
      description: 'Native Connector available.',
      icon: BarChart3,
    },
    {
      name: 'Alteryx',
      description: 'Enrichment workflow macro.',
      icon: Workflow,
    },
    {
      name: 'Tableau / PowerBI',
      description: 'Visualize external impact on dashboards.',
      icon: PieChart,
    },
    {
      name: 'Excel / CSV',
      description: 'Flat file export for legacy workflows.',
      icon: FileSpreadsheet,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <BarChart3 className="w-10 h-10 text-rs-cyan" />
            <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark">
              Business Intelligence & Low-Code{' '}
              <span className="text-gray-500 text-2xl">(For Analysts)</span>
            </h2>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-rs-dark mb-6">Drag-and-Drop Analysis.</h3>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            You don't need to be a coder to find leading indicators. Pull our signals directly into your BI tools for visual correlation and reporting.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-rs-light-gray rounded-xl p-8 hover:shadow-xl transition-all border-2 border-transparent hover:border-rs-cyan"
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-rs-cyan bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <tool.icon className="w-7 h-7 text-rs-cyan" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-rs-dark mb-2">{tool.name}</h4>
                  <p className="text-gray-700">{tool.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-gradient-to-r from-rs-cyan to-blue-500 rounded-2xl p-8 lg:p-12 text-white text-center"
        >
          <h4 className="text-2xl font-bold mb-4">Supported Tools</h4>
          <p className="text-lg opacity-90 max-w-3xl mx-auto">
            From enterprise dashboards to spreadsheet workflows, Ready Signal meets you where you work. No new tools to learn. No disruption to your team.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BusinessIntelligence;
