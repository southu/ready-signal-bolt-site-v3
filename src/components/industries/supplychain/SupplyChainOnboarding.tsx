import { motion } from 'framer-motion';
import { Target, Database, Search, Settings, Users, BarChart3, Truck, LineChart } from 'lucide-react';

const onboardingSteps = [
  {
    icon: Target,
    title: 'Use case definition & success criteria',
    description: 'Align on the decision(s) to improve (e.g., demand planning, buy timing, lead-time risk), the planning cadence, and how impact will be measured.',
  },
  {
    icon: Database,
    title: 'Data alignment',
    description: 'Connect relevant internal series (e.g., demand history, shipments, inventory positions) and define the forecast target and granularity (SKU/site/region/time).',
  },
  {
    icon: Search,
    title: 'Signal discovery & validation',
    description: 'Evaluate external drivers, review driver-level explanations with business stakeholders, and confirm the signals are credible and operationally interpretable.',
  },
  {
    icon: Settings,
    title: 'Governance & operationalization',
    description: 'Define permitted signals, thresholds, and how outputs flow into planning tools and decision routines.',
  },
];

const audienceProfiles = [
  {
    icon: Users,
    text: 'Run S&OP or planning cadences where forecasts must be defended—not just produced',
  },
  {
    icon: BarChart3,
    text: 'Manage inventory and service levels under volatile logistics, pricing, and demand conditions',
  },
  {
    icon: Truck,
    text: 'Carry procurement accountability when lead times and costs move faster than ERP history can reflect',
  },
  {
    icon: LineChart,
    text: 'Support forecasting with analytics and need signals that are measurable, governable, and explainable',
  },
];

const SupplyChainOnboarding = () => {
  return (
    <>
      {/* Implementation & Onboarding */}
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
              Implementation & Onboarding
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Externally enriched forecasting succeeds or fails on fundamentals: data readiness, governance, and clear decision ownership.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-200 hidden md:block"></div>

              <div className="space-y-8">
                {onboardingSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex items-start space-x-6 relative"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rs-cyan to-blue-600 flex items-center justify-center flex-shrink-0 z-10">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="bg-rs-light-gray rounded-xl p-6 flex-1">
                      <h3 className="text-lg font-bold text-rs-dark mb-2">{step.title}</h3>
                      <p className="text-rs-dark opacity-75 leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-rs-light-gray py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl font-bold text-rs-dark mb-4">
              Who It's For
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Built for leaders who are held accountable for forecast accuracy and supply chain performance—yet are often asked to operate with models that explain <em>what happened</em> while ignoring <em>what is changing</em>.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
            {audienceProfiles.map((profile, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-lg bg-rs-yellow bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <profile.icon className="w-5 h-5 text-rs-yellow" />
                </div>
                <p className="text-rs-dark opacity-75 leading-relaxed">{profile.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SupplyChainOnboarding;
