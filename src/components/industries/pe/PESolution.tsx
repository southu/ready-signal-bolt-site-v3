import { motion } from 'framer-motion';
import { Search, Layers, Eye, GitMerge } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '1',
    title: 'External Signal Discovery, Grounded in Evidence',
    description: 'Rather than debating which series "might matter," Ready Signal evaluates a broad library of external indicators—spanning economic activity, labor markets, trade and logistics, commodity and input pricing, and manufacturing measures.',
    detail: 'The system identifies which signals empirically lead and explain a given company\'s performance, and which are noise.',
  },
  {
    icon: Layers,
    number: '2',
    title: 'Tailored Models for Each Portfolio Company',
    description: 'PE portfolios do not behave like a single business—and Ready Signal does not treat them like one.',
    bullets: [
      'Each company receives a model aligned to its demand and cost drivers',
      'No forced template that erases differences across business models',
      'Methodology is consistent across holdings, supporting comparability without sacrificing fit',
    ],
  },
  {
    icon: Eye,
    number: '3',
    title: 'Explainable Forecasts with Driver Attribution',
    description: 'Ready Signal connects forecast changes to observable inputs:',
    bullets: [
      'What signals are moving',
      'How they have historically related to company performance',
      'Which factors are contributing most to the updated outlook',
    ],
    detail: 'This is the difference between "the forecast changed" and "the forecast changed because these drivers are turning."',
  },
  {
    icon: GitMerge,
    number: '4',
    title: 'Portfolio Alignment That Preserves Company-Level Fidelity',
    description: 'Ready Signal supports both levels simultaneously:',
    bullets: [
      'Company-level forecasts designed for operating decisions',
      'Portfolio roll-ups designed for sponsor visibility',
    ],
    detail: 'Portfolio-level aggregation error can often be kept low when the underlying company models are well specified.',
  },
];

const PESolution = () => {
  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            Ready Signal's Approach
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Macro-economic forecasting for private equity, grounded in driver attribution. Externally enriched forecasting with an emphasis on repeatability, comparability, and driver-level clarity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="bg-white rounded-xl p-8"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rs-cyan to-blue-600 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-bold text-rs-cyan mb-1">Step {step.number}</div>
                  <h3 className="text-xl font-bold text-rs-dark">{step.title}</h3>
                </div>
              </div>

              <p className="text-rs-dark opacity-75 leading-relaxed mb-4">{step.description}</p>

              {step.bullets && (
                <ul className="space-y-2 mb-4">
                  {step.bullets.map((bullet, j) => (
                    <li key={j} className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rs-cyan mt-2.5 flex-shrink-0"></div>
                      <p className="text-rs-dark opacity-75 text-sm">{bullet}</p>
                    </li>
                  ))}
                </ul>
              )}

              {step.detail && (
                <p className="text-rs-dark opacity-60 text-sm italic">{step.detail}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PESolution;
