import { motion } from 'framer-motion';
import { Database, Cpu, Shield, TrendingUp, Cloud, Users, DollarSign } from 'lucide-react';

const CoreCapabilities = () => {
  const dataCategories = [
    { icon: TrendingUp, label: 'Economic', examples: 'GDP, CPI, Interest Rates, Stock Indices' },
    { icon: Users, label: 'Labor', examples: 'Unemployment by sector, Wage growth' },
    { icon: Cloud, label: 'Weather', examples: 'Historical & Forecasted precip/temp by Zip Code' },
    { icon: DollarSign, label: 'Sentiment', examples: 'Consumer confidence, Travel intent' },
  ];

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
            How The Engine Works
          </h2>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-10 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <Database className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">The Data Lake</h3>
                <p className="text-sm text-rs-dark opacity-60">Ingest</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-rs-dark mb-3">3 Million+ Features from 40,000+ Data Sources</h4>
                <p className="text-rs-dark opacity-75 mb-6">
                  We maintain a live, clean catalog of the world's data. You never have to scrape a government website again.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dataCategories.map((category) => (
                    <div key={category.label} className="bg-rs-light-gray rounded-lg p-4 space-y-2">
                      <div className="flex items-center space-x-2">
                        <category.icon className="w-5 h-5 text-rs-cyan" />
                        <h5 className="font-semibold text-rs-dark">{category.label}</h5>
                      </div>
                      <p className="text-sm text-rs-dark opacity-75">{category.examples}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-300">
                <h4 className="font-bold text-rs-dark mb-2">Auto-Normalization</h4>
                <p className="text-rs-dark opacity-75">
                  We automatically align disparate time series (e.g., Daily Weather vs. Monthly Sales) so you don't have to write the transformation logic.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-10 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">Computational Signal Mining</h3>
                <p className="text-sm text-rs-dark opacity-60">Discover</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-rs-dark mb-2">Automated Feature Selection</h4>
                <p className="text-rs-dark opacity-75">
                  Upload your target variable (Sales, Churn, Foot Traffic). Our engine mathematically tests it against the entire catalog.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-rs-dark mb-3">Smart Transformations</h4>
                <p className="text-rs-dark opacity-75 mb-4">We don't just test raw data. We test:</p>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-rs-light-gray rounded-lg p-4">
                    <h5 className="font-semibold text-rs-dark mb-2">Lags</h5>
                    <p className="text-sm text-rs-dark opacity-75">
                      Does "Consumer Sentiment" predict sales 3 months out?
                    </p>
                  </div>
                  <div className="bg-rs-light-gray rounded-lg p-4">
                    <h5 className="font-semibold text-rs-dark mb-2">Rolling Averages</h5>
                    <p className="text-sm text-rs-dark opacity-75">
                      Does the "6-month average temperature" matter more than today's?
                    </p>
                  </div>
                  <div className="bg-rs-light-gray rounded-lg p-4">
                    <h5 className="font-semibold text-rs-dark mb-2">Stationarity Checks</h5>
                    <p className="text-sm text-rs-dark opacity-75">
                      We handle the differencing to prevent spurious regression results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-10 space-y-6"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-rs-cyan" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-rs-dark">Statistical Validation</h3>
                <p className="text-sm text-rs-dark opacity-60">Govern</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-rs-dark mb-2">Granger Causality</h4>
                <p className="text-rs-dark opacity-75">
                  Correlation is cheap. We apply rigorous Granger Causality tests to ensure the external signal actually predicts future values of your target, filtering out coincidental noise.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-rs-dark mb-2">Control</h4>
                <p className="text-rs-dark opacity-75">
                  You set the thresholds (p-value, R-squared lift) for what makes it into your model.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities;
