import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

const PricingFAQ = () => {
  const faqs = [
    {
      question: 'What counts as a "Model" in the Full Service plan?',
      answer:
        'A model is typically defined as one target variable (e.g., "Total North American Sales" or "SKU Demand in Southeast Region"). Volume discounts apply for multi-model portfolios.',
    },
    {
      question: 'Can I upgrade from Data Science to Team later?',
      answer:
        'Yes. All signals and features you have discovered will transfer seamlessly to your Team workspace.',
    },
    {
      question: 'Do you charge for data consumption?',
      answer:
        'No. Unlike other providers who charge by the "row" or "API call," we offer flat-rate access to our 40k+ signal catalog so you can experiment without fear of overages.',
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-cyan bg-opacity-10 rounded-full mb-6">
            <HelpCircle className="w-8 h-8 text-rs-cyan" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            Pricing FAQ
          </h2>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-rs-light-gray rounded-xl p-8"
            >
              <h3 className="text-xl font-bold text-rs-dark mb-3">
                Q: {faq.question}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                A: {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-rs-dark mb-4">
            Have more questions?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rs-cyan text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Contact Our Team
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingFAQ;
