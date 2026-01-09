import { motion } from 'framer-motion';
import { TrendingUp, Database, Award } from 'lucide-react';

const ProvenPrecisionSection = () => {
  const stats = [
    {
      icon: TrendingUp,
      number: '78%',
      label: 'R-Squared',
      description: 'We took a major CPG brand\'s forecast from 24% explanatory power to 78% just by discovering a hidden credit signal.',
    },
    {
      icon: Database,
      number: '40,000+',
      label: 'Signals',
      description: 'The world\'s largest pre-normalized catalog of Economic, Weather, Labor, and Sentiment data.',
    },
    {
      icon: Award,
      number: '50%',
      label: 'Error Reduction',
      description: 'Proven reduction in model error (MAPE) across Automotive, Retail, and Logistics sectors.',
    },
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
            Proven Precision.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="text-center space-y-4"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                  <stat.icon className="w-8 h-8 text-rs-cyan" />
                </div>
              </div>

              <div>
                <div className="text-5xl font-bold text-rs-dark">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-rs-dark mt-2">
                  {stat.label}
                </div>
              </div>

              <p className="text-rs-dark opacity-75">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-rs-light-gray rounded-xl p-10 space-y-8"
        >
          <div>
            <h3 className="text-2xl font-bold text-rs-dark mb-4">
              What is a 1% Error Costing You?
            </h3>
            <p className="text-lg text-rs-dark opacity-75">
              The cost of Ready Signal is a rounding error compared to the cost of a bad forecast.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 space-y-2">
              <h4 className="font-semibold text-rs-dark">Inventory Carrying Costs</h4>
              <p className="text-rs-dark opacity-75">
                If you overestimate demand by 5%, how much capital is trapped in the warehouse?
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 space-y-2">
              <h4 className="font-semibold text-rs-dark">Lost Sales</h4>
              <p className="text-rs-dark opacity-75">
                If you underestimate demand by 5%, how much revenue walks out the door to a competitor?
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 space-y-4">
            <h4 className="font-semibold text-rs-dark">The Math</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-rs-dark">Average Client Improvement</span>
                <span className="font-bold text-rs-cyan">50% Reduction in Model Error</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-rs-dark">The ROI (if annual revenue is $50M)</span>
                <span className="font-bold text-green-600">$500,000+ in margin impact</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-rs-dark">The Investment</span>
                <span className="font-bold text-rs-dark">Starting at $1,250/mo</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProvenPrecisionSection;
