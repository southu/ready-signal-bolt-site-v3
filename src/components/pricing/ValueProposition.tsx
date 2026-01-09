import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Calculator, DollarSign } from 'lucide-react';

const ValueProposition = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            What is a <span className="text-rs-cyan">1% Error</span> Costing You?
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            The cost of Ready Signal is a rounding error compared to the cost of a bad forecast.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rs-dark mb-2">Inventory Carrying Costs</h3>
                <p className="text-gray-700">
                  If you overestimate demand by 5%, how much capital is trapped in the warehouse?
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-rs-dark mb-2">Lost Sales</h3>
                <p className="text-gray-700">
                  If you underestimate demand by 5%, how much revenue walks out the door to a competitor?
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-rs-dark to-gray-800 text-white rounded-2xl shadow-2xl p-8 lg:p-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-8">
            <Calculator className="w-8 h-8 text-rs-yellow" />
            <h3 className="text-3xl font-bold">The Math:</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-rs-yellow mb-2">50%</div>
              <p className="text-gray-300">Average Client Improvement: Reduction in Model Error</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-rs-cyan mb-2">$500K+</div>
              <p className="text-gray-300">
                The ROI: If your annual revenue is $50M, a 1% accuracy improvement saves $500,000+ in margin impact
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <DollarSign className="w-8 h-8 text-rs-yellow" />
                <div className="text-5xl font-bold text-white">1,250</div>
              </div>
              <p className="text-gray-300">The Investment: Starting at $1,250/mo</p>
            </div>
          </div>

          <div className="text-center pt-6 border-t border-gray-600">
            <p className="text-2xl font-semibold text-rs-yellow">
              The cost of Ready Signal is a rounding error.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;
