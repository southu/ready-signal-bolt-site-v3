import { motion } from 'framer-motion';
import { Factory, ShoppingBag, Warehouse } from 'lucide-react';

const useCases = [
  {
    icon: Factory,
    title: 'Earlier Detection of a Raw-Material Squeeze',
    scenario: 'A manufacturer sees stable consumption history, but procurement begins hearing rumors of upstream tightness.',
    signals: 'Trade flow shifts, freight rate moves, port congestion, and producer pricing signals.',
    outcome: 'Instead of relying on anecdotes or last-minute expediting, planners can tie forecast and buy recommendations to measurable external movement—and separate a short-lived transit disruption from a broader supply tightening.',
  },
  {
    icon: ShoppingBag,
    title: 'Disentangling Demand Decline from Distribution Noise',
    scenario: 'A consumer brand sees orders soften and teams debate whether it\'s real demand weakness or channel timing.',
    signals: 'Consumer sentiment, category demand indicators, local weather anomalies (for seasonal items), and promotional intensity proxies.',
    outcome: 'The forecast can attribute movement to specific drivers—helping teams avoid cutting inventory based on a temporary ordering pattern or ignoring a genuine demand shift.',
  },
  {
    icon: Warehouse,
    title: 'Lead-Time Volatility That ERP Can\'t Explain',
    scenario: 'A distributor sees supplier lead times drift, but internal ERP timestamps don\'t reveal the cause.',
    signals: 'Logistics capacity indicators, congestion measures, fuel and freight dynamics.',
    outcome: 'Teams can quantify whether the lead-time change aligns with broader network constraints—supporting earlier reallocation, safety stock recalibration, or alternate sourcing decisions.',
  },
];

const SupplyChainUseCases = () => {
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
            What "Explainable External Drivers" Looks Like in Practice
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Common patterns where external signals can clarify what changed before internal history fully reflects it.
          </p>
        </motion.div>

        <div className="space-y-8">
          {useCases.map((useCase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-rs-light-gray rounded-xl p-8 lg:p-10"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                  <useCase.icon className="w-6 h-6 text-rs-cyan" />
                </div>
                <h3 className="text-2xl font-bold text-rs-dark pt-2">{useCase.title}</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 ml-0 lg:ml-16">
                <div>
                  <p className="text-sm font-semibold text-rs-dark opacity-60 uppercase tracking-wide mb-2">Scenario</p>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{useCase.scenario}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rs-cyan uppercase tracking-wide mb-2">External Signals</p>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{useCase.signals}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-rs-yellow uppercase tracking-wide mb-2">What Changes</p>
                  <p className="text-rs-dark opacity-75 leading-relaxed">{useCase.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainUseCases;
