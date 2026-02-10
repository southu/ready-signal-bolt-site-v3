import { motion } from 'framer-motion';
import { Users, UserCheck, BarChart3 } from 'lucide-react';

const alternatives = [
  {
    icon: Users,
    title: 'Building an In-House Data Science Team',
    challenge: 'An internal team can deliver strong outcomes, but the hard part is rarely the first model. It\'s the operating system around it: external data sourcing, signal governance, retraining, monitoring, explainability, and consistent deployment across heterogeneous companies.',
    readySignal: 'Ready Signal focuses on that repeatable architecture—so forecasting capability doesn\'t depend on a few individuals or bespoke notebooks.',
  },
  {
    icon: UserCheck,
    title: 'Consultants and One-Off Modeling Projects',
    challenge: 'Consultants can accelerate a point-in-time analysis, but portfolio forecasting is not a point-in-time problem. The forecast must update as conditions change, and the drivers must remain defensible under scrutiny.',
    readySignal: 'Ready Signal is built for continuous refresh, repeatable comparisons, and driver-level auditability.',
  },
  {
    icon: BarChart3,
    title: 'Standard BI Tools',
    challenge: 'BI is essential for reporting, but dashboards tend to explain what happened, not what is likely to happen and why. Forecasting requires disciplined signal testing, model validation, and attribution.',
    readySignal: 'Ready Signal complements BI by delivering driver-based forecasts that can flow into existing reporting.',
  },
];

const PEDifferentiation = () => {
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
            Why This Isn't "Just Build It In-House"
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            PE firms typically consider three alternatives. Each can work—until the portfolio scale and explainability requirement collide.
          </p>
        </motion.div>

        <div className="space-y-8">
          {alternatives.map((alt, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8 lg:p-10"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <alt.icon className="w-6 h-6 text-rs-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-rs-dark pt-2">{alt.title}</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6 ml-0 lg:ml-16">
                <div>
                  <p className="text-sm font-semibold text-rs-dark opacity-60 uppercase tracking-wide mb-2">The Challenge</p>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{alt.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rs-cyan uppercase tracking-wide mb-2">Ready Signal's Answer</p>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{alt.readySignal}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PEDifferentiation;
