import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const VideoOverviewSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-rs-cyan bg-opacity-10 rounded-full mb-6">
            <Play className="w-4 h-4 text-rs-cyan" />
            <span className="text-rs-cyan font-semibold text-sm">Platform Overview</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            See Ready Signal in Action
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto leading-relaxed">
            Watch how we transform complex data into actionable predictions that drive business growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-rs-dark">
            <div className="absolute inset-0 bg-gradient-to-br from-rs-cyan/20 to-transparent pointer-events-none"></div>

            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/b3KYZmHZWHc"
                title="Ready Signal Platform Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-8 -right-8 w-64 h-64 bg-rs-yellow rounded-full blur-3xl -z-10"
          ></motion.div>

          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-8 -left-8 w-64 h-64 bg-rs-cyan rounded-full blur-3xl -z-10"
          ></motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 text-sm">
            Ready to transform your data strategy?{' '}
            <a href="#contact" className="text-rs-cyan hover:text-rs-dark font-semibold transition-colors">
              Get in touch
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoOverviewSection;
