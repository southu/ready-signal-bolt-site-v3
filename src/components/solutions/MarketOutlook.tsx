import { motion } from 'framer-motion';
import { TrendingUp, Zap, Globe, BarChart3 } from 'lucide-react';
import MarketIntelligenceGauge from '../MarketIntelligenceGauge';

const MarketOutlook = () => {
  const capabilities = [
    {
      icon: Globe,
      title: 'Macro-Economic Signals',
      description: 'Monitor global economic indicators including GDP, inflation rates, interest rates, and trade dynamics across 40+ countries.',
    },
    {
      icon: BarChart3,
      title: 'Industry Trends',
      description: 'Track sector-specific movements, commodity prices, consumer confidence, and market sentiment in real-time.',
    },
    {
      icon: Zap,
      title: 'Leading Indicators',
      description: 'Identify early warning signals that predict market shifts 3-6 months before they materialize in your business.',
    },
    {
      icon: TrendingUp,
      title: 'Scenario Planning',
      description: 'Model multiple future scenarios based on current market conditions to prepare your strategy for any outcome.',
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4">
            <div className="w-2 h-2 bg-rs-cyan rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rs-cyan">Market Intelligence</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-rs-dark mb-6">
            Know What's About to Happen
          </h2>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            Our Market Outlook service continuously analyzes 40,000+ economic signals to predict market
            conditions that will impact your business. Stay ahead of economic shifts, labor market changes,
            supply chain disruptions, and demand fluctuations before they affect your bottom line.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MarketIntelligenceGauge />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-rs-cyan border-opacity-20">
              <h3 className="text-2xl font-bold text-rs-dark mb-4">
                Real-Time Market Intelligence
              </h3>
              <p className="text-rs-dark opacity-75 mb-6">
                We don't just forecast your internal metrics. We provide a comprehensive view of the external
                forces that drive your business, giving you the context you need to make confident decisions.
              </p>

              <div className="space-y-4">
                {[
                  {
                    label: 'Economic Indicators',
                    value: '40,000+',
                    description: 'Signals monitored continuously',
                  },
                  {
                    label: 'Forecast Horizon',
                    value: '3-6 months',
                    description: 'Advanced warning of market shifts',
                  },
                  {
                    label: 'Update Frequency',
                    value: 'Real-time',
                    description: 'Always current intelligence',
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl"
                  >
                    <div>
                      <div className="text-sm font-medium text-rs-dark opacity-60 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-rs-dark opacity-50">
                        {stat.description}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-rs-cyan">
                      {stat.value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-rs-cyan to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-rs-dark mb-2">
                  {capability.title}
                </h4>
                <p className="text-sm text-rs-dark opacity-70">
                  {capability.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-rs-dark to-blue-900 rounded-2xl p-8 md:p-12 text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Anticipate Market Shifts Before Your Competitors
          </h3>
          <p className="text-white opacity-90 max-w-2xl mx-auto mb-6">
            With our Market Outlook service, you'll receive quarterly reports analyzing the key economic
            factors impacting your industry, complete with scenario modeling and strategic recommendations
            to help you capitalize on favorable conditions and mitigate risks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white opacity-75">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-rs-yellow rounded-full" />
              <span>Quarterly Market Reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-rs-yellow rounded-full" />
              <span>Executive Briefings</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-rs-yellow rounded-full" />
              <span>Scenario Planning Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketOutlook;
