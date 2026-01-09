import { motion } from 'framer-motion';
import { Star, MessageSquare } from 'lucide-react';

const NorthStar = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-yellow rounded-full mb-6">
            <Star className="w-8 h-8 text-rs-dark" />
          </div>
          <h2 className="text-4xl font-bold text-rs-dark mb-6">
            We Measure Our Success by <span className="text-rs-cyan">Your Trust</span>.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl p-8 lg:p-12"
        >
          <p className="text-lg text-rs-dark opacity-75 mb-6">
            Our goal isn't just to lower your MAPE (Mean Absolute Percentage Error).
          </p>
          <p className="text-xl text-rs-dark font-medium mb-8">
            Our goal is to change the conversation in your S&OP meetings.
          </p>

          <div className="bg-gradient-to-r from-rs-cyan to-blue-600 rounded-lg p-8 text-white">
            <MessageSquare className="w-10 h-10 mb-4" />
            <p className="text-2xl font-bold mb-4">When you can walk into a meeting and proactively tell the Board:</p>
            <p className="text-xl italic mb-4">
              "Headwinds are coming, and here is exactly how we are hedging against them,"
            </p>
            <p className="text-lg font-medium text-rs-yellow">
              —that is when we know we've done our job.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NorthStar;
