import { motion } from 'framer-motion';
import { Database, Cloud, Layers } from 'lucide-react';

const EnterprisePlatforms = () => {
  const partners = [
    {
      name: 'Databricks',
      description: 'Run Signal Discovery directly in a Notebook.',
      icon: Layers,
    },
    {
      name: 'Snowflake',
      description: 'Direct data sharing available.',
      icon: Database,
    },
    {
      name: 'AWS / Azure / GCP',
      description: 'Cloud-agnostic API architecture.',
      icon: Cloud,
    },
  ];

  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <Database className="w-10 h-10 text-rs-cyan" />
            <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark">
              Enterprise Data Platforms{' '}
              <span className="text-gray-500 text-2xl">(For Data Engineers)</span>
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
          <h3 className="text-3xl font-bold text-rs-dark mb-6">Warehouse Native.</h3>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We treat your Data Lake as the source of truth. Ready Signal acts as an{' '}
            <span className="font-semibold text-rs-cyan">enrichment layer</span>, pushing causal features back into your warehouse for global use.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-rs-cyan to-blue-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <partner.icon className="w-8 h-8 text-white" />
              </div>

              <h4 className="text-2xl font-bold text-rs-dark mb-3">{partner.name}</h4>
              <p className="text-gray-700">{partner.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-br from-rs-dark to-gray-800 rounded-2xl p-8 lg:p-12 text-center"
        >
          <h4 className="text-2xl font-bold text-white mb-4">Certified Partners</h4>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            We've built deep integrations with the platforms you already trust. No middleware. No extra hops. Just direct, secure connections.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EnterprisePlatforms;
