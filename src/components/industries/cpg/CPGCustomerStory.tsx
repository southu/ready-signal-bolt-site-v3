import { motion } from 'framer-motion';
import { Truck, CheckCircle } from 'lucide-react';
import sportsDrinkImg from '../../../assets/images/sportsdrink.jpeg';

const CPGCustomerStory = () => {
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
            Customer Story: The "Trucking" Insight
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 rounded-xl overflow-hidden max-w-4xl mx-auto"
        >
          <img
            src={sportsDrinkImg}
            alt="Food & Beverage Product"
            className="w-full h-80 object-cover"
          />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <Truck className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Challenge</h3>
            <p className="text-rs-dark opacity-75">
              A food & beverage client couldn't explain why some regions were resilient while others crashed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 space-y-4 text-white"
          >
            <div className="w-12 h-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold">The Discovery</h3>
            <p>
              We found that Truck Transportation Employment was a stronger predictor of demand than general unemployment. Trucking jobs are harder to substitute, making them a "Canary in the Coal Mine" for real economic health.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-rs-light-gray rounded-xl p-8 space-y-4"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-rs-dark">The Result</h3>
            <p className="text-rs-dark opacity-75">
              The client adjusted regional promotions based on sector-specific labor health, not just national averages.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CPGCustomerStory;
