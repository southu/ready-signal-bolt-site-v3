import { motion } from 'framer-motion';
import { Code, Shield, Lock, Key } from 'lucide-react';
import codeIntoClarityImg from '../../assets/images/code_into_clarity.jpeg';

const DeveloperExperience = () => {
  const integrations = [
    'Databricks',
    'Python / Pandas',
    'R Studio',
    'Domo',
    'Alteryx',
    'Snowflake',
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
            Built for Your Stack
          </h2>
          <p className="text-lg text-rs-dark opacity-75">
            No new dashboard to learn. Just better data in your existing workflow.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-8 h-8 text-rs-cyan" />
              <h3 className="text-2xl font-bold text-rs-dark">Developer Experience</h3>
            </div>

            <div className="mb-6 rounded-lg overflow-hidden">
              <img
                src={codeIntoClarityImg}
                alt="Code Into Clarity"
                className="w-full h-64 object-cover"
              />
            </div>

            <div className="bg-gray-900 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-400 mb-1"># Install</div>
              <div className="text-green-400 mb-4">pip install readysignal</div>

              <div className="text-gray-400 mb-1"># Connect & Discover</div>
              <div className="text-blue-400 mb-1">import <span className="text-white">readysignal</span> as <span className="text-white">rs</span></div>
              <div className="text-white mb-1">signals = rs.<span className="text-yellow-400">get_signals</span>(</div>
              <div className="text-white ml-4 mb-1">target_variable=<span className="text-green-400">'sales_data.csv'</span>,</div>
              <div className="text-white ml-4 mb-1">auto_discover=<span className="text-orange-400">True</span></div>
              <div className="text-white mb-4">)</div>

              <div className="text-gray-400 mb-1"># Export to Model</div>
              <div className="text-white">model.<span className="text-yellow-400">fit</span>(signals)</div>
            </div>

            <div>
              <h4 className="font-bold text-rs-dark mb-4">Integration Logos</h4>
              <div className="grid grid-cols-2 gap-3">
                {integrations.map((integration) => (
                  <div
                    key={integration}
                    className="bg-rs-light-gray rounded-lg px-4 py-3 text-center font-semibold text-rs-dark"
                  >
                    {integration}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-rs-cyan" />
              <h3 className="text-2xl font-bold text-rs-dark">Enterprise Security</h3>
            </div>

            <p className="text-lg font-semibold text-rs-dark">
              Your Data is Yours. Period.
            </p>
            <p className="text-rs-dark opacity-75">
              Enterprise-grade security built for the Fortune 500.
            </p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-rs-dark mb-1">Data Isolation</h4>
                  <p className="text-sm text-rs-dark opacity-75">
                    We ingest your target variable (e.g., Sales History) via a secure, encrypted API. Your data is isolated in your own instance and never used to train models for other clients.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-rs-dark mb-1">Non-Training Guarantee</h4>
                  <p className="text-sm text-rs-dark opacity-75">
                    Our "Signal Discovery Engine" uses your data solely to find correlations against our public catalog. Once the signals are found, you can delete your data from our system instantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Key className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-rs-dark mb-1">Encryption</h4>
                  <p className="text-sm text-rs-dark opacity-75">
                    All data is encrypted in transit (TLS 1.2+) and at rest (AES-256).
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-rs-dark mb-1">Read-Only Access</h4>
                  <p className="text-sm text-rs-dark opacity-75">
                    For Managed Services, our Data Scientists work in a "Clean Room" environment with strict access controls.
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

export default DeveloperExperience;
