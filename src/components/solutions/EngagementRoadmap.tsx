import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

const EngagementRoadmap = () => {
  const timeline = [
    {
      week: 'Week 1',
      title: 'Discovery & Data Alignment',
      description: 'We securely ingest your historical data (Sales, Churn, Margin) and confirm objectives. No complex IT integration required; flat files or API connections work immediately.',
    },
    {
      week: 'Weeks 2-3',
      title: 'Signal Discovery & Validation',
      description: 'Our Engine tests 40k+ variables. We identify top candidate indicators, score their strength, and apply AI-Curated Economic Research to validate the business rationale.',
    },
    {
      week: 'Weeks 4-5',
      title: 'Calibration & Adaptive Modeling',
      description: 'We build the initial models and refine inputs based on performance backtesting. This is where "Human-in-the-Loop" shines—ensuring the model fits reality, not just the training data.',
    },
    {
      week: 'Week 6',
      title: 'The Executive Read-Out',
      description: 'We present the final insights and "Hidden Drivers" report to your leadership team. We hand over the roadmap for the next phase.',
    },
    {
      week: 'Ongoing',
      title: 'Maintenance & Narrative',
      description: 'Forecasts are updated on a regular cadence. We monitor performance and update models as market conditions shift, providing you with a monthly "Narrative Report" on why the numbers are moving.',
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
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            The Engagement Roadmap
          </h2>
          <p className="text-lg text-rs-dark opacity-75">
            From Data to Decision in 6 Weeks
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-rs-cyan hidden md:block"></div>

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white border-4 border-rs-cyan flex-shrink-0 relative z-10">
                    {index < 4 ? (
                      <CheckCircle className="w-6 h-6 text-rs-cyan" />
                    ) : (
                      <Circle className="w-6 h-6 text-rs-cyan" />
                    )}
                  </div>

                  <div className="md:ml-8 flex-1">
                    <div className="bg-rs-light-gray rounded-xl p-6 space-y-3">
                      <div className="inline-block bg-rs-cyan bg-opacity-10 text-rs-cyan font-semibold px-3 py-1 rounded-full text-sm">
                        {item.week}
                      </div>
                      <h3 className="text-xl font-bold text-rs-dark">{item.title}</h3>
                      <p className="text-rs-dark opacity-75">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngagementRoadmap;
