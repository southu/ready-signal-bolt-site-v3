import { motion } from 'framer-motion';
import { Lock, Shield, Key, UserCheck } from 'lucide-react';

const SolutionsSecurity = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            Your Data is Yours. Period.
          </h2>
          <p className="text-lg text-rs-dark opacity-75">
            Enterprise-grade security built for the Fortune 500.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="font-bold text-rs-dark">Data Isolation</h3>
            <p className="text-sm text-rs-dark opacity-75">
              We ingest your target variable (e.g., Sales History) via a secure, encrypted API. Your data is isolated in your own instance and never used to train models for other clients.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="font-bold text-rs-dark">Non-Training Guarantee</h3>
            <p className="text-sm text-rs-dark opacity-75">
              Our "Signal Discovery Engine" uses your data solely to find correlations against our public catalog. Once the signals are found, you can delete your data from our system instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <Key className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="font-bold text-rs-dark">Encryption</h3>
            <p className="text-sm text-rs-dark opacity-75">
              All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-6 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-rs-cyan" />
            </div>
            <h3 className="font-bold text-rs-dark">Read-Only Access</h3>
            <p className="text-sm text-rs-dark opacity-75">
              For Managed Services, our Data Scientists work in a "Clean Room" environment with strict access controls.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSecurity;
