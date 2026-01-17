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

              <motion.a
                href="/contact-us/#contact-form"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rs-dark hover:bg-rs-light-gray transition-all font-semibold px-8 py-4 rounded-lg border-2 border-rs-dark flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Request Demo</span>
              </motion.a>
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
            <div className="relative w-[500px] h-[500px]">
              {/* Outer ring (static) */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-rs-cyan/30" />
              
              {/* Middle ring */}
              <div className="absolute inset-12 rounded-full border border-gray-200" />
              
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-28 h-28 bg-gradient-to-br from-rs-cyan to-blue-600 rounded-full flex items-center justify-center shadow-2xl z-10"
                >
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">RS</div>
                    <div className="text-xs opacity-80">Engine</div>
                  </div>
                </motion.div>
              </div>

              {/* Pulsing glow behind center */}
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-36 h-36 bg-rs-cyan rounded-full blur-3xl" />
              </motion.div>

              {/* Data Source Labels - 4 cardinal positions */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>📊</span>
                    <span className="text-sm font-semibold text-rs-dark">Economic</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>🌤️</span>
                    <span className="text-sm font-semibold text-rs-dark">Weather</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20"
              >
                <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>👥</span>
                    <span className="text-sm font-semibold text-rs-dark">Demographics</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="bg-white rounded-lg shadow-lg px-4 py-2 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <span>📈</span>
                    <span className="text-sm font-semibold text-rs-dark">Market</span>
                  </div>
                </div>
              </motion.div>

              {/* Orbiting particles on the outer ring */}
              {[0, 1, 2, 3].map((i) => {
                const orbitRadius = 250;
                const duration = 8 + i * 2;
                const startAngle = i * 90;
                
                return (
                  <motion.div
                    key={`orbit-${i}`}
                    className="absolute pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: orbitRadius * 2,
                      height: orbitRadius * 2,
                      marginLeft: -orbitRadius,
                      marginTop: -orbitRadius,
                    }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: duration,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="absolute w-3 h-3 rounded-full"
                      style={{
                        left: '50%',
                        top: 0,
                        marginLeft: -6,
                        marginTop: -6,
                        background: i % 2 === 0 ? '#3B82F6' : '#F59E0B',
                        boxShadow: i % 2 === 0 ? '0 0 12px #3B82F6' : '0 0 12px #F59E0B',
                      }}
                      animate={{ scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                );
              })}

              {/* Particles flowing from ring to center */}
              {[0, 1, 2].map((i) => {
                const angles = [0, 120, 240];
                const angle = angles[i];
                const angleRad = (angle * Math.PI) / 180;
                const outerRadius = 200;
                const innerRadius = 50;
                
                return (
                  <motion.div
                    key={`inflow-${i}`}
                    className="absolute w-2 h-2 rounded-full z-30 pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      background: '#3B82F6',
                      boxShadow: '0 0 10px #3B82F6',
                    }}
                    animate={{
                      x: [
                        Math.cos(angleRad) * outerRadius,
                        Math.cos(angleRad) * innerRadius,
                      ],
                      y: [
                        Math.sin(angleRad) * outerRadius,
                        Math.sin(angleRad) * innerRadius,
                      ],
                      opacity: [0, 1, 1, 0],
                      scale: [0.5, 1, 1, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.8,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}

              {/* Particles flowing from center to ring */}
              {[0, 1, 2].map((i) => {
                const angles = [60, 180, 300];
                const angle = angles[i];
                const angleRad = (angle * Math.PI) / 180;
                const outerRadius = 200;
                const innerRadius = 50;
                
                return (
                  <motion.div
                    key={`outflow-${i}`}
                    className="absolute w-2 h-2 rounded-full z-30 pointer-events-none"
                    style={{
                      left: '50%',
                      top: '50%',
                      background: '#F59E0B',
                      boxShadow: '0 0 10px #F59E0B',
                    }}
                    animate={{
                      x: [
                        Math.cos(angleRad) * innerRadius,
                        Math.cos(angleRad) * outerRadius,
                      ],
                      y: [
                        Math.sin(angleRad) * innerRadius,
                        Math.sin(angleRad) * outerRadius,
                      ],
                      opacity: [0, 1, 1, 0],
                      scale: [0.3, 1, 1, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.8 + 0.4,
                      ease: "easeInOut",
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
