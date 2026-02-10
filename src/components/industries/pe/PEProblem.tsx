import { motion } from 'framer-motion';
import { DollarSign, Scale, ShieldAlert, Users, AlertTriangle, Clock, BarChart3, Eye, Briefcase, GitBranch } from 'lucide-react';

const decisionInstruments = [
  {
    icon: DollarSign,
    title: 'Capital allocation',
    description: 'Where to invest, where to pause, and where to intervene',
  },
  {
    icon: Scale,
    title: 'Valuation support',
    description: 'Distinguishing durable performance from one-time effects',
  },
  {
    icon: ShieldAlert,
    title: 'Risk management',
    description: 'Anticipating demand shocks, labor pressure, input-cost volatility, and macro exposure',
  },
  {
    icon: Users,
    title: 'Board and IC decisions',
    description: 'Credibility matters; leadership teams need a coherent narrative behind changes',
  },
];

const frictionPoints = [
  'Each company faces different customers, channels, and competitive dynamics',
  'Operating teams run on different planning cadences and methods',
  'Forecast inputs are often internally defined and inconsistently measured, limiting comparability',
];

const explainabilityNeeds = [
  {
    icon: Briefcase,
    role: 'Investment committees',
    need: 'A rationale to underwrite capital allocation',
  },
  {
    icon: GitBranch,
    role: 'Operating partners',
    need: 'Driver-level insight to choose interventions that work',
  },
  {
    icon: BarChart3,
    role: 'Boards',
    need: 'A defensible narrative separating cyclical headwinds from structural performance issues',
  },
];

const PEProblem = () => {
  return (
    <>
      {/* The Reality of Forecasting in PE */}
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
              The Reality of Forecasting in PE Portfolios
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Forecasts in private equity aren't planning artifacts—they are decision instruments.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {decisionInstruments.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-rs-light-gray rounded-xl p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-rs-cyan" />
                </div>
                <h3 className="text-lg font-bold text-rs-dark mb-2">{item.title}</h3>
                <p className="text-rs-dark opacity-75 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8"
          >
            <h3 className="text-xl font-bold text-rs-dark mb-4">The friction comes from portfolio complexity:</h3>
            <ul className="space-y-3">
              {frictionPoints.map((point, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-rs-dark opacity-75 leading-relaxed font-medium">
              When forecasting approaches diverge across holdings, the firm loses a clean line of sight into what's truly changing—and why.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Traditional Portfolio Forecasting Breaks Down */}
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
              Why Traditional Portfolio Forecasting Breaks Down
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Traditional approaches tend to fail in two predictable ways: portfolio roll-ups that blur causality, and company-level models that lag reality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-rs-dark">Portfolio Roll-Ups Hide the Drivers</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">Strength in one holding can <strong>mask deterioration</strong> elsewhere</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">A portfolio-level variance rarely distinguishes <strong>mix effects</strong> from <strong>true demand shifts</strong></p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">Macro exposure often shows up only after results move—because the drivers weren't modeled</p>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-rs-dark">Company-Level Forecasts Lag Reality</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">Forecasts that <strong>react late</strong> to real-world shifts</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">Inconsistent incorporation of external conditions (labor markets, trade flows, commodity inputs, regional demand)</p>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0"></div>
                  <p className="text-rs-dark opacity-75">Limited ability to stress-test scenarios across holdings with a common standard</p>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-8 bg-white rounded-xl p-6 border-l-4 border-rs-yellow"
          >
            <p className="text-rs-dark opacity-75 leading-relaxed text-lg">
              In practice, many firms end up investing heavily in "forecast reconciliation"—aligning disparate models and assumptions—rather than improving forecast quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Explainability Gap */}
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
              The Explainability Gap in PE Decision-Making
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              In private equity, the "why" matters as much as the number. When a forecast can't explain its drivers, it creates a decision gap.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {explainabilityNeeds.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-rs-light-gray rounded-xl p-8 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-rs-yellow bg-opacity-10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-rs-yellow" />
                </div>
                <h3 className="text-lg font-bold text-rs-dark mb-2">{item.role}</h3>
                <p className="text-rs-dark opacity-75">{item.need}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-lg text-rs-dark opacity-75 max-w-2xl mx-auto">
              When explainability is missing, organizations default to intuition, lagging indicators, and post-hoc explanations after performance has already moved. <strong>Forecasting should increase conviction—not just produce an output.</strong>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PEProblem;
