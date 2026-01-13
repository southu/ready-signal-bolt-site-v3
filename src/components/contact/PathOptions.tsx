import { motion } from 'framer-motion';
import { Code2, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';

const PathOptions = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-br from-rs-cyan to-blue-600 text-white p-8">
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <Code2 className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Self-Service</h2>
              <p className="text-xl opacity-90">The Builder</p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <p className="text-rs-dark opacity-75 font-medium">For:</p>
                <p className="text-lg text-rs-dark">
                  Data Scientists, Analysts, Developers
                </p>
              </div>

              <div className="mb-8">
                <p className="text-rs-dark opacity-75 font-medium mb-4">Includes:</p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Full access to 3M+ features from 40k+ data sources.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Unlimited Signal Discovery runs.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Python/R SDK Access.</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-rs-cyan text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg inline-flex items-center justify-center space-x-2"
              >
                <span>Create Free Account</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-rs-yellow"
          >
            <div className="bg-gradient-to-br from-rs-dark to-gray-800 text-white p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-rs-yellow text-rs-dark px-4 py-1 text-sm font-bold rounded-bl-lg">
                RECOMMENDED
              </div>
              <div className="w-14 h-14 bg-rs-yellow bg-opacity-20 rounded-xl flex items-center justify-center mb-4">
                <Briefcase className="w-7 h-7 text-rs-yellow" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Managed Solution</h2>
              <p className="text-xl text-rs-yellow">The Leader</p>
            </div>

            <div className="p-8">
              <div className="mb-6">
                <p className="text-rs-dark opacity-75 font-medium">For:</p>
                <p className="text-lg text-rs-dark">
                  VPs of Supply Chain, CFOs, Private Equity Partners
                </p>
              </div>

              <div className="mb-8">
                <p className="text-rs-dark opacity-75 font-medium mb-4">Includes:</p>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Dedicated Data Science Support.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Custom Governance & Narrative Reports.</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-rs-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-rs-dark">Portfolio-Wide Dashboards.</span>
                  </li>
                </ul>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-rs-yellow text-rs-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg inline-flex items-center justify-center space-x-2"
              >
                <span>Book a Strategy Call</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-rs-dark opacity-75">
            Not sure which option is right for you?{' '}
            <a href="#" className="text-rs-cyan font-bold hover:underline">
              Chat with our team
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PathOptions;
