import { motion } from 'framer-motion';
import { AlertCircle, Users, MessageSquare } from 'lucide-react';

const BlackBoxLiability = () => {
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
            The Black Box Liability
          </h2>
          <p className="text-2xl text-rs-dark font-semibold">
            "The Algorithm Did It" is Not a Strategy.
          </p>
          <p className="text-lg text-rs-dark opacity-75 mt-2">
            Why modern forecasting fails in the Boardroom.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Trap</h3>
            <p className="text-rs-dark opacity-75">
              Automated AI models are powerful, but they are opaque. When a forecast misses by 10%, or when the model predicts a sudden drop in Q3, the Board asks: "Why?"
            </p>
            <div className="space-y-3 pt-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0 mt-2"></div>
                <p className="text-rs-dark opacity-75">
                  If your answer is, "That's what the machine predicted," you lose credibility.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-2"></div>
                <p className="text-rs-dark opacity-75">
                  If your answer is, "The model detected a 20% rise in raw material costs due to the PPI Index," you gain trust.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Gap</h3>
            <p className="text-rs-dark opacity-75">
              Most tools give you a number. They don't give you the Narrative. Without the narrative, you can't hedge risk, adjust headcount, or reassure investors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlackBoxLiability;
