import { motion } from 'framer-motion';
import { TrendingUp, Cloud, Users, BarChart3, Globe } from 'lucide-react';

const SocialTrustStrip = () => {
  const sources = [
    { icon: TrendingUp, label: 'Federal Reserve' },
    { icon: Cloud, label: 'NOAA' },
    { icon: Users, label: 'Bureau of Labor' },
    { icon: BarChart3, label: 'OECD' },
    { icon: Globe, label: 'S&P Global' },
  ];

  return (
    <section className="bg-rs-light-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-lg text-rs-dark font-semibold">
            Ingesting 40,000+ validated signals daily from the world's most trusted economic and environmental sources.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center justify-center">
          {sources.map((source, index) => (
            <motion.div
              key={source.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center">
                <source.icon className="w-8 h-8 text-rs-cyan" />
              </div>
              <p className="text-sm font-medium text-rs-dark text-center">
                {source.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialTrustStrip;
