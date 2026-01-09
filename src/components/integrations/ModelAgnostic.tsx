import { motion } from 'framer-motion';
import { Brain, CheckCircle } from 'lucide-react';

const ModelAgnostic = () => {
  const features = [
    {
      title: 'Zero Migration',
      description: 'Keep your data in Snowflake/Databricks.',
    },
    {
      title: 'Zero Training',
      description: 'Your team keeps coding in Python or R.',
    },
    {
      title: 'Instant Lift',
      description: 'Add Ready Signal features to your existing model and watch error rates drop.',
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-cyan rounded-full mb-6">
            <Brain className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            Your Model. <span className="text-rs-cyan">Our Data.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12"
        >
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Most forecasting tools try to force you into their "Black Box" algorithms. We don't. We believe you should keep your own logic{' '}
            <span className="font-semibold text-rs-dark">(Prophet, XGBoost, LSTM)</span> and your own environment. We simply provide the{' '}
            <span className="font-semibold text-rs-cyan">Fuel</span>.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-gradient-to-br from-rs-light-gray to-white rounded-xl p-6 border-2 border-rs-cyan"
              >
                <div className="flex items-start space-x-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-bold text-rs-dark">{feature.title}</h3>
                </div>
                <p className="text-gray-700 ml-9">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold text-rs-dark mb-4">
            The Philosophy: <span className="text-rs-cyan">"Model Agnostic"</span>
          </h3>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We don't replace your stack. We enhance it. Ready Signal is the enrichment layer that makes every model better.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ModelAgnostic;
