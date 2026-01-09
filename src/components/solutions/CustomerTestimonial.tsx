import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const CustomerTestimonial = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-rs-dark">
            Trust at the Highest Level
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl p-10 shadow-xl relative"
        >
          <div className="absolute top-8 left-8 w-16 h-16 bg-rs-cyan bg-opacity-10 rounded-full flex items-center justify-center">
            <Quote className="w-8 h-8 text-rs-cyan" />
          </div>

          <div className="pt-12 space-y-6">
            <p className="text-2xl text-rs-dark leading-relaxed">
              "Before Ready Signal, we were constantly explaining why our numbers were off. Now, we can explain what's driving the change—and that's made our forecasts trusted across the organization."
            </p>

            <div className="pt-6 border-t border-gray-300">
              <p className="font-semibold text-rs-dark">VP, Strategy & Analytics</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerTestimonial;
