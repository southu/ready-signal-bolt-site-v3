import { motion } from 'framer-motion';
import { Truck, AlertCircle } from 'lucide-react';
import supplyChainImg from '../../../assets/images/supply_chain_&_logistics.jpeg';

const painPoints = [
  'Reactive buying when demand unexpectedly surges',
  'Excess inventory when conditions soften without warning',
  'Stockouts when an inflection point isn\'t visible in internal history',
  'Planning cycles dominated by debates over numbers no one trusts',
];

const SupplyChainHero = () => {
  return (
    <section className="relative bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark text-white pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-rs-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rs-cyan rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Truck className="w-4 h-4 text-rs-yellow" />
              <span className="text-sm font-medium">Supply Chain & Logistics</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
              Supply Chain Forecasting That Explains{' '}
              <span className="text-rs-yellow">What Changed</span>
              —and{' '}
              <span className="text-rs-cyan">Why</span>
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Supply chain leaders rarely struggle because they lack forecasts. They struggle because too many forecasts are historical, internal, and silent about causality.
            </p>

            <p className="text-lg text-gray-400 leading-relaxed">
              Ready Signal closes the gap between <em>what the forecast says</em> and <em>why it moved</em>—by discovering the external signals that drive demand, pricing, and material needs, and delivering forecasts that teams can validate and operationalize.
            </p>

            <ul className="space-y-3">
              {painPoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-rs-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{point}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={supplyChainImg}
                alt="Supply chain forecasting with external signal intelligence"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SupplyChainHero;
