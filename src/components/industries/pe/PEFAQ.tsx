import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'How do you ensure data confidentiality?',
    answer: 'Ready Signal is designed to support sponsor-grade confidentiality expectations through access controls, auditability, and data handling practices appropriate for sensitive portfolio information. Specific controls and deployment options are aligned during onboarding.',
  },
  {
    question: 'What is the onboarding process?',
    answer: 'Onboarding typically includes data intake and validation, signal selection and model development, explainability review, workflow integration, and governance setup for refresh cadence and monitoring.',
  },
  {
    question: 'What data do you need from each portfolio company?',
    answer: 'Typically: a time series of revenue (and/or volume) and, where relevant, key cost or margin lines. Optional operational KPIs can improve specificity. Monthly data is common.',
  },
  {
    question: 'How quickly can we see value?',
    answer: 'Timelines depend on data readiness and the number of holdings, but many teams see actionable driver attribution soon after initial modeling—often first at the company level, then in portfolio roll-ups once definitions are aligned.',
  },
  {
    question: 'Does this replace our BI tools or planning process?',
    answer: 'No. Ready Signal is designed to complement BI and existing planning cadences by providing externally enriched, explainable forecasts that can be integrated into reporting and operating reviews.',
  },
  {
    question: 'Are lead times like 12-24 months realistic?',
    answer: 'In some sectors and metrics—especially where macro and supply-chain signals lead demand—longer lead times can appear. In other cases, lead times are shorter. Ready Signal\'s value comes from testing and selecting signals empirically rather than assuming a fixed horizon.',
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

const PEFAQ = () => {
  return (
    <>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* FAQ Section */}
      <section className="bg-rs-light-gray py-20">
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

          <div className="bg-white rounded-xl p-8">
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
              Stop Reconciling Divergent Forecasts
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              If your portfolio still depends on inconsistent, internally defined forecasting methods—and the "why" behind changes doesn't survive board scrutiny—then the limiting factor isn't effort. It's architecture.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Ready Signal establishes an explainable forecasting layer across the portfolio designed for{' '}
              <strong className="text-rs-yellow">capital allocation</strong>,{' '}
              <strong className="text-rs-cyan">portfolio company performance visibility</strong>,{' '}
              <strong className="text-white">valuation support</strong>, and{' '}
              <strong className="text-rs-yellow">board-level decision-making</strong>.
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

export default PEFAQ;
