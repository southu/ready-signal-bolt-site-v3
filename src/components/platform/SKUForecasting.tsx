import { motion } from 'framer-motion';
import { Map, Sun, DollarSign } from 'lucide-react';

const SKUForecasting = () => {
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
            Scalable SKU Forecasting
          </h2>
          <p className="text-2xl text-rs-dark font-semibold">
            Kill the "One-Size-Fits-All" Model.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-rs-dark mb-3">The Problem</h3>
              <p className="text-rs-dark opacity-75">
                Most teams build one global model because building 10,000 unique models for every SKU/Region combination is impossible manually.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-rs-dark mb-3">The Solution</h3>
              <p className="text-rs-dark opacity-75">
                Ready Signal automates granularity. We find unique drivers for every single series.
              </p>
            </div>

            <div className="bg-rs-light-gray rounded-xl p-8 space-y-6">
              <h4 className="font-bold text-rs-dark">Example:</h4>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Sun className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-rs-dark mb-1">
                      SKU A (Ice Cream in Florida)
                    </h5>
                    <p className="text-sm text-rs-dark opacity-75">
                      Driven by Max Temperature.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-rs-dark mb-1">
                      SKU A (Ice Cream in New York)
                    </h5>
                    <p className="text-sm text-rs-dark opacity-75">
                      Driven by Disposable Income.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-300">
                <h5 className="font-bold text-rs-dark mb-2">The Result</h5>
                <p className="text-lg text-green-600 font-semibold">
                  20-30% accuracy boost by respecting local nuances at scale.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-2xl p-12 text-white shadow-2xl">
              <Map className="w-full h-64 opacity-20" />
              <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur-xl opacity-50"></div>
                  <Sun className="w-12 h-12 text-yellow-400 relative z-10" />
                </div>
                <p className="text-xs font-bold mt-2 text-center">FL: Temp</p>
              </div>
              <div className="absolute top-1/3 right-1/4">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50"></div>
                  <DollarSign className="w-12 h-12 text-green-400 relative z-10" />
                </div>
                <p className="text-xs font-bold mt-2 text-center">NY: Income</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SKUForecasting;
