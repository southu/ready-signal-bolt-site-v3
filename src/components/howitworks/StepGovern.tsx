import { motion } from 'framer-motion';
import { Shield, CheckCircle, UserCheck } from 'lucide-react';

const StepGovern = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-50 backdrop-blur-xl border border-gray-200 flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-rs-cyan" />
            </div>
            <div>
              <div className="text-rs-cyan font-bold text-sm tracking-wider">STEP 3</div>
              <h2 className="text-4xl font-bold text-rs-dark">GOVERN</h2>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-rs-dark mb-4">Filtering Out the Noise.</h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h4 className="font-bold text-rs-dark">The "Manual" Pain</h4>
            </div>
            <p className="text-rs-dark opacity-75 mb-4">
              "Spurious Correlations" kill models.
            </p>
            <div className="bg-rs-light-gray rounded-lg p-4">
              <p className="text-sm text-rs-dark opacity-75 italic">
                (e.g., The classic "Nicolas Cage movies correlate with pool drownings" chart).
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-rs-cyan" />
              <h4 className="font-bold text-rs-dark">The Ready Signal Solution</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-rs-dark">Granger Causality</p>
                  <p className="text-sm text-rs-dark opacity-75">
                    We apply specific statistical tests to prove that the external signal happens before
                    your metric changes. If it doesn't lead, it's out.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <UserCheck className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-rs-dark">The "Common Sense" Check</p>
                  <p className="text-sm text-rs-dark opacity-75">
                    (For Managed Services) Our experts review the features. We ensure that "Ice Cream Sales"
                    are driven by Temperature, not Shoe Sales, even if the math says otherwise.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
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

export default StepGovern;
