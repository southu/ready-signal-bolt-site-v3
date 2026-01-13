import { motion } from 'framer-motion';
import { Cloud, Database, Lock, Map } from 'lucide-react';

const StepIngest = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white bg-opacity-50 backdrop-blur-xl border border-gray-200 flex items-center justify-center shadow-lg">
              <Cloud className="w-8 h-8 text-rs-cyan" />
            </div>
            <div>
              <div className="text-rs-cyan font-bold text-sm tracking-wider">STEP 1</div>
              <h2 className="text-4xl font-bold text-rs-dark">INGEST</h2>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-rs-dark mb-4">
            We Scrape the World So You Don't Have To.
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h4 className="font-bold text-rs-dark">The "Manual" Pain</h4>
            </div>
            <p className="text-rs-dark opacity-75">
              Your team wastes hours scraping the Federal Reserve, NOAA, and Census bureaus. They struggle
              to align "Daily Weather" with "Monthly Sales."
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Cloud className="w-6 h-6 text-rs-cyan" />
              <h4 className="font-bold text-rs-dark">The Ready Signal Solution</h4>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Database className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-rs-dark">The Catalog</p>
                  <p className="text-sm text-rs-dark opacity-75">
                    We maintain a live, pre-normalized data lake of 3 million+ features from 40,000+ data sources.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Map className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-rs-dark">Auto-Normalization</p>
                  <p className="text-sm text-rs-dark opacity-75">
                    We automatically handle frequency alignment (Daily to Monthly), interpolation, and
                    geographic mapping (Zip Code to DMA).
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-rs-cyan flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-rs-dark">Security</p>
                  <p className="text-sm text-rs-dark opacity-75">
                    Your proprietary data is ingested via a secure, encrypted API. It is used only to find
                    your signals and is never shared or used to train other models.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AlertTriangle = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

export default StepIngest;
