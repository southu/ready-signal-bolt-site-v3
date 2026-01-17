import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-rs-cyan bg-opacity-10 text-rs-cyan rounded-full text-sm font-semibold">
                  Predictive Intelligence Platform
                </span>
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-bold text-rs-dark leading-tight">
                Stop Reacting to Market Shifts.
                <br />
                <span className="text-rs-cyan">Start Predicting Them.</span>
              </h1>

              <p className="text-xl text-rs-dark opacity-75 leading-relaxed">
                Transform your business operations with AI-powered predictive analytics.
                Anticipate challenges before they arise and make data-driven decisions with confidence.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://app.readysignal.com/auth/sign-up"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-rs-yellow text-rs-dark hover:bg-yellow-400 transition-all font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </motion.a>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rs-dark hover:bg-rs-light-gray transition-all font-semibold px-8 py-4 rounded-lg border-2 border-rs-dark flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </motion.button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-rs-dark">3M+</div>
                <div className="text-sm text-rs-dark opacity-75">Data Features</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-rs-dark">50%+</div>
                <div className="text-sm text-rs-dark opacity-75">Error Reduction</div>
              </div>
              <div className="h-12 w-px bg-gray-300"></div>
              <div>
                <div className="text-3xl font-bold text-rs-dark">100%</div>
                <div className="text-sm text-rs-dark opacity-75">Explainable</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Data Flow Visualization */}
            <div className="relative w-[450px] h-[450px]">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-rs-cyan/20"
              />
              
              {/* Middle ring */}
              <div className="absolute inset-8 rounded-full border border-gray-200" />
              
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-32 h-32 bg-gradient-to-br from-rs-cyan to-blue-600 rounded-full flex items-center justify-center shadow-2xl z-10"
                >
                  <div className="text-center text-white">
                    <div className="text-3xl font-bold">RS</div>
                    <div className="text-sm opacity-80">Engine</div>
                  </div>
                </motion.div>
              </div>

              {/* Data Source Nodes - positioned in a circle */}
              {[
                { label: 'Economic', icon: '📊', angle: -90 },
                { label: 'Weather', icon: '🌤️', angle: -30 },
                { label: 'Demographics', icon: '👥', angle: 30 },
                { label: 'Health', icon: '🏥', angle: 90 },
                { label: 'Market', icon: '📈', angle: 150 },
                { label: 'Custom', icon: '⚡', angle: 210 },
              ].map((node, i) => {
                const radius = 175;
                const angleRad = (node.angle * Math.PI) / 180;
                const x = Math.cos(angleRad) * radius;
                const y = Math.sin(angleRad) * radius;
                
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                    className="absolute z-20"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      className="bg-white rounded-xl shadow-lg px-4 py-3 border border-gray-200 hover:border-rs-cyan hover:shadow-xl transition-all cursor-default"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{node.icon}</span>
                        <span className="text-sm font-semibold text-rs-dark">{node.label}</span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Pulsing glow behind center */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-40 h-40 bg-rs-cyan rounded-full blur-3xl" />
              </motion.div>

              {/* Accent dots */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-16 right-20 w-3 h-3 bg-rs-yellow rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-20 left-16 w-2 h-2 bg-rs-cyan rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute top-1/3 left-12 w-2 h-2 bg-rs-yellow rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
