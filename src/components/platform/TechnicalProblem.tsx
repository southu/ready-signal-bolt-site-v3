import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Wrench } from 'lucide-react';
import dataScientistImg from '../../assets/images/data_scientist.jpeg';

const TechnicalProblem = () => {
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
            The Feature Hunting Nightmare
          </h2>
          <p className="text-2xl text-rs-dark font-semibold mb-2">
            Your Model is Good. Your Data is the Problem.
          </p>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            You spend 80% of your time acting as a "Data Janitor."
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
            alt="Data Scientist Working"
            className="w-full h-80 object-cover"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Trap</h3>
            <p className="text-rs-dark opacity-75">
              You know external factors drive your target variable. But finding them is a manual nightmare. You download a dataset (e.g., Fred Economic Data), clean the dates, lag the variables, check for stationarity, run a regression, and find... nothing. Then you repeat the process 500 times.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Opportunity Cost</h3>
            <p className="text-rs-dark opacity-75">
              Every hour spent scraping weather data or normalizing census files is an hour you aren't optimizing your XGBoost parameters or analyzing results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-rs-cyan bg-opacity-10 rounded-xl p-8 space-y-4 border-2 border-rs-cyan"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-20 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Solution</h3>
            <p className="text-rs-dark opacity-75">
              Ready Signal automates the entire "Feature Engineering" phase. We don't replace your model; we feed it the highest-octane fuel available.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalProblem;
