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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Data Flow Visualization */}
            <div className="relative">
              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-40 h-40 rounded-full border-4 border-dashed border-rs-cyan/30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-28 h-28 bg-gradient-to-br from-rs-cyan to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="text-center text-white">
                      <div className="text-2xl font-bold">RS</div>
                      <div className="text-xs opacity-80">Engine</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Source Nodes */}
              {[
                { label: 'Economic', icon: '📊', angle: 0, delay: 0 },
                { label: 'Weather', icon: '🌤️', angle: 60, delay: 0.2 },
                { label: 'Demographics', icon: '👥', angle: 120, delay: 0.4 },
                { label: 'Health', icon: '🏥', angle: 180, delay: 0.6 },
                { label: 'Market', icon: '📈', angle: 240, delay: 0.8 },
                { label: 'Custom', icon: '⚡', angle: 300, delay: 1 },
              ].map((node, i) => {
                const radius = 140;
                const x = Math.cos((node.angle * Math.PI) / 180) * radius;
                const y = Math.sin((node.angle * Math.PI) / 180) * radius;
                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: node.delay + 0.5, duration: 0.5 }}
                    className="absolute top-1/2 left-1/2"
                    style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                  >
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="bg-white rounded-xl shadow-lg p-3 border-2 border-gray-100 hover:border-rs-cyan transition-colors cursor-default"
                    >
                      <div className="text-2xl mb-1">{node.icon}</div>
                      <div className="text-xs font-semibold text-rs-dark whitespace-nowrap">{node.label}</div>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Animated Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ width: 400, height: 400 }}>
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const radius = 100;
                  const x1 = 200;
                  const y1 = 200;
                  const x2 = 200 + Math.cos((angle * Math.PI) / 180) * radius;
                  const y2 = 200 + Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <motion.line
                      key={angle}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1, delay: i * 0.2 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0891b2" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Floating Particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-rs-yellow rounded-full"
                  style={{
                    top: `${30 + Math.random() * 40}%`,
                    left: `${30 + Math.random() * 40}%`,
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}

              {/* Placeholder for sizing */}
              <div className="w-[400px] h-[400px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
