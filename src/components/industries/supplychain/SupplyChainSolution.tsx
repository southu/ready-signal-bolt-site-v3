import { motion } from 'framer-motion';
import { TrendingUp, Users, CloudRain, Ship, ShoppingCart, Search, Filter, BarChart3, Shield } from 'lucide-react';

const externalSignals = [
  {
    icon: TrendingUp,
    title: 'Inflation & macro conditions',
    description: 'Pricing pressure, purchasing power shifts',
  },
  {
    icon: Users,
    title: 'Labor markets',
    description: 'Capacity constraints, wage-driven cost changes',
  },
  {
    icon: CloudRain,
    title: 'Weather & climate variability',
    description: 'Production disruption, demand swings',
  },
  {
    icon: Ship,
    title: 'Trade flows & logistics constraints',
    description: 'Port congestion, freight rates, routing changes',
  },
  {
    icon: ShoppingCart,
    title: 'Consumer behavior & demand indicators',
    description: 'Category momentum, substitution patterns',
  },
];

const howItWorksSteps = [
  {
    icon: Search,
    number: '1',
    title: 'Signal Discovery at Scale',
    description: 'Ready Signal\'s Signal Discovery Engine automatically tests a large feature set across many external sources to identify signals that are predictive for your specific problem.',
  },
  {
    icon: Filter,
    number: '2',
    title: 'Feature Selection to Remove Noise',
    description: 'Eliminate irrelevant or redundant indicators, reduce false confidence from spurious correlations, and focus forecasting logic on signals that consistently matter.',
  },
  {
    icon: BarChart3,
    number: '3',
    title: 'Explainability Built Into the Output',
    description: 'See what moved the forecast, which external factors contributed most, and when the model is responding to a genuine shift versus noise.',
  },
  {
    icon: Shield,
    number: '4',
    title: 'Governance: Humans Stay in Control',
    description: 'Review assumptions and thresholds, control model logic and operational constraints, and decide what signals are permitted or excluded.',
  },
];

const SupplyChainSolution = () => {
  return (
    <>
      {/* What Externally Enriched Forecasting Changes */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h2 className="text-4xl font-bold text-rs-dark mb-4">
              What Externally Enriched Forecasting Changes
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Bring the outside world into your forecasting logic—systematically, not through ad hoc "adjustments" that disappear into spreadsheets.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {externalSignals.map((signal, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="bg-rs-light-gray rounded-xl p-6 flex items-start space-x-4"
              >
                <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <signal.icon className="w-5 h-5 text-rs-cyan" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-rs-dark mb-1">{signal.title}</h3>
                  <p className="text-rs-dark opacity-75 text-sm">{signal.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10 text-center text-lg text-rs-dark opacity-75 max-w-3xl mx-auto"
          >
            These are the factors that create volatility. Ignoring them doesn't make them irrelevant—it just makes your forecast less credible.
          </motion.p>
        </div>
      </section>

      {/* How Ready Signal Works */}
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
              How Ready Signal Works for Supply Chain Forecasting
            </h2>
            <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
              Not a generic "AI layer." A forecasting intelligence platform built to answer a practical planning question: <strong>which external signals actually drive our demand, pricing, and material needs—and how do they change the forecast?</strong>
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white rounded-xl p-8 relative"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rs-cyan to-blue-600 flex items-center justify-center">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-rs-cyan mb-1">Step {step.number}</div>
                    <h3 className="text-xl font-bold text-rs-dark mb-3">{step.title}</h3>
                    <p className="text-rs-dark opacity-75 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SupplyChainSolution;
