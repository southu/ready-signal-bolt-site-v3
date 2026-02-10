import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'Is this a replacement for our ERP forecasting?',
    answer: 'No. Ready Signal enhances forecasting by incorporating external drivers and explainability, then delivers outputs that integrate with existing tools and planning processes.',
  },
  {
    question: 'What kinds of external data does Ready Signal use?',
    answer: 'Ready Signal evaluates a broad universe of external signals—drawn from many sources—and determines which signals matter for a specific forecasting problem.',
  },
  {
    question: 'How does Ready Signal avoid "noisy indicators" and false correlations?',
    answer: 'By testing at scale and applying feature selection, Ready Signal reduces irrelevant or unstable indicators and focuses on signals that demonstrate predictive value.',
  },
  {
    question: 'Will my team understand the forecast outputs?',
    answer: 'Ready Signal is designed to produce explainable forecasts, showing the drivers behind forecast changes so planners and leaders can validate and act.',
  },
  {
    question: 'What kind of impact should we expect?',
    answer: 'Industry research indicates that externally enriched approaches can reduce forecast error, sometimes substantially, with downstream benefits such as faster planning cycles and reduced warehousing costs depending on the operating model. Actual results depend on the use case, data availability, forecast granularity, and governance maturity.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const FAQItem = ({ question, answer, index }: { question: string; answer: string; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b border-gray-200 last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <h3 className="text-lg font-semibold text-rs-dark pr-4">{question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-rs-dark opacity-50 flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-rs-dark opacity-75 leading-relaxed pb-5">{answer}</p>
      </motion.div>
    </motion.div>
  );
};

const SupplyChainFAQ = () => {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-rs-dark mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="bg-rs-light-gray rounded-xl p-8">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-rs-dark via-gray-900 to-rs-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-white">
              Move Beyond Historical Extrapolation
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              ERP-only models tell you what your history suggests. Ready Signal clarifies <strong className="text-white">what changed in the world</strong>, <strong className="text-rs-yellow">which signals are driving the shift</strong>, and <strong className="text-rs-cyan">how that changes the forecast</strong>—so supply chain and procurement decisions are grounded in verifiable, forward-looking evidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 bg-rs-yellow text-rs-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 transition-colors"
              >
                <span>Talk to Our Team</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/platform"
                className="inline-flex items-center space-x-2 bg-white bg-opacity-10 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-opacity-20 transition-colors"
              >
                <span>Explore the Platform</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SupplyChainFAQ;
