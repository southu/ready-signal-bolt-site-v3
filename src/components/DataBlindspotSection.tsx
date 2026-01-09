import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Lock } from 'lucide-react';
import dataScientistImg from '../assets/images/data_scientist.jpeg';

const DataBlindspotSection = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: 'The Accuracy Gap',
      pain: 'Forecast error isn\'t just a math problem; it\'s a P&L problem. Relying solely on Sales History assumes the future will look like the past.',
      reality: 'Internal data fails to capture the external forces—inflation, trade flows, weather—that actually drive 50% of your volatility. If you aren\'t modeling the outside world, you are flipping a coin.',
    },
    {
      icon: TrendingDown,
      title: 'The Efficiency Drain',
      pain: 'Your Data Scientists are expensive, brilliant, and bored. They spend 80% of their time wrangling CSVs from government websites and only 20% actually building models.',
      reality: 'Manual feature engineering is unscalable. Every hour they spend cleaning data is an hour they aren\'t improving your model.',
    },
    {
      icon: Lock,
      title: 'The Trust Void',
      pain: '"The model missed" is not an acceptable answer in the boardroom.',
      reality: 'Executives need explainability. If you can\'t say why the numbers changed (e.g., "Consumer Credit tightened"), you can\'t make a strategic decision. Black-box AI is a liability.',
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
            You Have a Data Blindspot.
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Companies have perfected their internal data but are flying blind to the external world.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-xl overflow-hidden max-w-4xl mx-auto"
        >
          <img
            src={dataScientistImg}
            alt="Data Scientist at Work"
            className="w-full h-80 object-cover"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-rs-light-gray rounded-xl p-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <problem.icon className="w-6 h-6 text-rs-cyan" />
              </div>

              <h3 className="text-xl font-bold text-rs-dark">
                {problem.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-rs-dark mb-2">The Pain</h4>
                  <p className="text-rs-dark opacity-75">
                    {problem.pain}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-300">
                  <h4 className="font-semibold text-rs-dark mb-2">The Reality</h4>
                  <p className="text-rs-dark opacity-75">
                    {problem.reality}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DataBlindspotSection;
