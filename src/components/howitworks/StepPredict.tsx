import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Zap } from 'lucide-react';

const StepPredict = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-rs-light-gray border border-gray-200 flex items-center justify-center shadow-lg">
              <TrendingUp className="w-8 h-8 text-rs-cyan" />
            </div>
            <div>
              <div className="text-rs-cyan font-bold text-sm tracking-wider">STEP 4</div>
              <h2 className="text-4xl font-bold text-rs-dark">PREDICT</h2>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-rs-dark mb-4">Your Model, Just Smarter.</h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h4 className="font-bold text-rs-dark">The "Manual" Pain</h4>
            </div>
            <p className="text-rs-dark opacity-75">
              Most "AI Tools" force you to use their proprietary black-box model. You lose control.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-6 h-6 text-rs-cyan" />
              <h4 className="font-bold text-rs-dark">The Ready Signal Solution</h4>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                <p className="text-sm text-rs-dark opacity-75">
                  <strong>Model Agnostic:</strong> We deliver the Features, not the final Forecast.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-10 text-white"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Zap className="w-8 h-8 text-rs-yellow" />
            <h3 className="text-2xl font-bold">The Handoff</h3>
          </div>

          <p className="text-lg mb-6">
            We pipe the optimized, lead-lagged signals directly into the tools you already trust:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-medium">Prophet / XGBoost / ARIMA</p>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4">
              <p className="font-medium">Databricks / Snowflake / AWS</p>
            </div>
          </div>

          <div className="bg-rs-yellow bg-opacity-20 rounded-lg p-6 border-l-4 border-rs-yellow">
            <p className="text-xl font-bold">The Result:</p>
            <p className="mt-2">
              You keep your model logic; you just feed it high-octane fuel that reduces error by 20-50%.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

export default StepPredict;
