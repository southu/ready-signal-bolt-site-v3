import { motion } from 'framer-motion';
import { LineChart, DollarSign, Code2 } from 'lucide-react';

const Team = () => {
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
            Not Just Engineers. <span className="text-rs-cyan">Economists</span>.
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Ready Signal isn't just a tech stack. We are a team of Economists, Statisticians, and Supply
            Chain veterans. We understand the pressure of the boardroom because we've been there.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
              <LineChart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">The Data Science Team</h3>
            <p className="text-lg opacity-90">
              Focused on "Granger Causality" and statistical rigor.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">The Economic Team</h3>
            <p className="text-lg opacity-90">
              Focused on macro-trends and market indicators.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white"
          >
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mb-6">
              <Code2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">The Engineering Team</h3>
            <p className="text-lg opacity-90">
              Focused on building the fastest API pipe in the industry.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Team;
