import { motion } from 'framer-motion';
import { AlertCircle, TrendingDown, Clock } from 'lucide-react';

const OriginStory = () => {
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
            The <span className="text-red-600">Monday Morning</span> Problem
          </h2>
          <p className="text-2xl text-rs-dark opacity-75 font-medium">
            The War Room Used to be a Battleground.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-rs-light-gray rounded-xl p-8 lg:p-12 mb-12"
        >
          <p className="text-lg text-rs-dark opacity-75 mb-8">
            For years, I worked as an enterprise data scientist for major logistics and retail
            brands. And every Monday morning, I faced the same scene:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border-l-4 border-red-600">
              <TrendingDown className="w-8 h-8 text-red-600 mb-3" />
              <p className="text-rs-dark font-medium">The sales forecast was off by 12%.</p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-orange-500">
              <AlertCircle className="w-8 h-8 text-orange-500 mb-3" />
              <p className="text-rs-dark font-medium">
                The VP of Supply Chain was staring at me across the table.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border-l-4 border-yellow-500">
              <AlertCircle className="w-8 h-8 text-yellow-500 mb-3" />
              <p className="text-rs-dark font-medium">The Board wanted to know "Why?"</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">The Conflict</h3>
            <p className="mb-4">
              We had perfect data on our own company—every SKU, every price point, every marketing dollar.
            </p>
            <p className="mb-4">
              But our internal models couldn't see the world outside our four walls. We were trying to
              predict the future while ignoring Inflation, Weather, and Consumer Sentiment.
            </p>
            <p className="text-xl font-bold">I was flying blind.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl p-8 text-white"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-8 h-8 text-rs-yellow" />
              <h3 className="text-2xl font-bold">The "80/20" Trap</h3>
            </div>
            <p className="mb-4">
              To fix it, I spent <strong>80% of my week</strong> scrubbing CSV files from government
              websites, cleaning date formats from the Federal Reserve, and trying to align "Daily Rainfall"
              with "Monthly Sales."
            </p>
            <p className="mb-4">It was manual, painful, and unscalable.</p>
            <p className="text-xl font-bold">
              I knew there had to be a better way to connect the world's data to our models.
            </p>
            <p className="text-xl font-bold text-rs-yellow mt-2">So, I built it.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OriginStory;
