import { motion } from 'framer-motion';
import { FileSpreadsheet, Code, Users, Briefcase, CheckCircle } from 'lucide-react';

const PlanDetails = () => {
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
          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            Detailed Plan Breakdown
          </h2>
        </motion.div>

        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-rs-dark mb-4">
              A. The Platform Plans <span className="text-rs-cyan">(Self-Service)</span>
            </h3>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="w-14 h-14 bg-rs-cyan bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <FileSpreadsheet className="w-7 h-7 text-rs-cyan" />
              </div>

              <h4 className="text-2xl font-bold text-rs-dark mb-3">Plan 1: Analyst</h4>

              <div className="bg-rs-light-gray p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-gray-700 italic">
                  Perfect for the business analyst who lives in spreadsheets but needs better data.
                </p>
              </div>

              <p className="font-semibold text-rs-dark mb-4">Includes:</p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">AI Recommendation Engine & Market Insights.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Geographic Granularity: State, Country.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Time Granularity: Day, Week, Month, Quarter, Year.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">50 Signals / 50 Features per signal.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Direct Excel/CSV Export.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="w-14 h-14 bg-rs-cyan bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-7 h-7 text-rs-cyan" />
              </div>

              <h4 className="text-2xl font-bold text-rs-dark mb-3">Plan 2: Data Science</h4>

              <div className="bg-rs-light-gray p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-gray-700 italic">
                  Perfect for the code-first modeler building production pipelines.
                </p>
              </div>

              <p className="font-semibold text-rs-dark mb-4">Key Upgrades:</p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">API Access: Pipe data directly into your workflow.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">SDKs: Native libraries for Python and R.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Deeper Granularity: Drill down to Zip Code, City, and County level.</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-8"
            >
              <div className="w-14 h-14 bg-rs-cyan bg-opacity-10 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-rs-cyan" />
              </div>

              <h4 className="text-2xl font-bold text-rs-dark mb-3">Plan 3: Team</h4>

              <div className="bg-rs-light-gray p-4 rounded-lg mb-6">
                <p className="text-sm font-semibold text-gray-700 italic">
                  For advanced analytics teams scaling their output.
                </p>
              </div>

              <p className="font-semibold text-rs-dark mb-4">Key Upgrades:</p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Collaboration: 3 Seats included (add more for $225/mo).</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Shared Library: Save and share signal collections across the team.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Custom Limits: Custom # of Signals and Features per signal.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-rs-dark">Priority Support: Dedicated Customer Success Manager.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-rs-dark mb-4">
              B. The Managed Plan <span className="text-rs-yellow">(Full Service)</span>
            </h3>
          </div>

          <div className="bg-gradient-to-br from-rs-dark to-gray-800 text-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div className="flex items-start space-x-6 mb-8">
              <div className="w-16 h-16 bg-rs-yellow rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-8 h-8 text-rs-dark" />
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-3">Plan 4: Managed Full Service</h4>
                <div className="bg-rs-yellow bg-opacity-20 p-4 rounded-lg">
                  <p className="text-lg font-semibold italic">
                    You don't want a tool; you want an answer. We act as your fractional Data Science team.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div>
                <h5 className="text-xl font-bold text-rs-yellow mb-4">Pricing Structure:</h5>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Model Build: $9,500 per model.</span> (Includes signal discovery, causality testing, and initial calibration).
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-yellow flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Monthly Updates: $2,500 / month.</span> (Includes re-calibration, new signal ingestion, and monthly Narrative Reports).
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h5 className="text-xl font-bold text-rs-yellow mb-4">What You Get:</h5>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Tech-Enabled Service:</span> We augment your team, doing the heavy lifting on feature engineering and validation.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Narrative Intelligence:</span> Monthly "Plain English" reports explaining the why behind the forecast.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Methodological Guarantee:</span> Every signal is validated for Granger Causality by our internal experts.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">
                      <span className="font-semibold text-white">Custom Work:</span> Need specific consulting or bespoke model architecture? Available for $295/hr.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanDetails;
