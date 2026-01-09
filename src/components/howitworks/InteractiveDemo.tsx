import { motion } from 'framer-motion';
import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

const InteractiveDemo = () => {
  const [lagWeeks, setLagWeeks] = useState(3);

  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">See the Lag</h2>
          <p className="text-lg text-rs-dark opacity-75 max-w-3xl mx-auto">
            External signals rarely impact you instantly. Use our 'Time-Warp' technology to find the exact
            lag—predicting the drop before it happens.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl p-8 lg:p-12 shadow-lg"
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <MoveHorizontal className="w-6 h-6 text-rs-cyan" />
                <h3 className="text-xl font-bold text-rs-dark">Adjust Time Lag</h3>
              </div>
              <div className="bg-rs-cyan text-white px-4 py-2 rounded-lg font-bold">
                {lagWeeks} Weeks
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="12"
              value={lagWeeks}
              onChange={(e) => setLagWeeks(Number(e.target.value))}
              className="w-full h-2 bg-rs-light-gray rounded-lg appearance-none cursor-pointer accent-rs-cyan"
            />
          </div>

          <div className="relative h-64 bg-rs-light-gray rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-around p-6">
              <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                <motion.path
                  d="M 0 150 Q 100 120, 200 140 T 400 130 T 600 120 T 800 110"
                  fill="none"
                  stroke="#06B6D4"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5 }}
                />

                <motion.path
                  d={`M ${lagWeeks * 15} 100 Q ${100 + lagWeeks * 15} 70, ${
                    200 + lagWeeks * 15
                  } 90 T ${400 + lagWeeks * 15} 80 T ${600 + lagWeeks * 15} 70 T ${
                    800 + lagWeeks * 15
                  } 60`}
                  fill="none"
                  stroke="#FCD34D"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 }}
                />
              </svg>
            </div>

            <div className="absolute bottom-4 left-4 flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-rs-cyan"></div>
                <span className="text-sm font-medium text-rs-dark">Your Sales</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-rs-yellow"></div>
                <span className="text-sm font-medium text-rs-dark">Consumer Credit</span>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gradient-to-r from-rs-cyan to-blue-600 rounded-lg p-6 text-white">
            <p className="text-center text-lg font-medium">
              {lagWeeks === 0 && "No lag applied. Signals appear to move together randomly."}
              {lagWeeks > 0 && lagWeeks < 3 &&
                "Getting closer, but not quite aligned. The prediction window is still tight."}
              {lagWeeks >= 3 && lagWeeks <= 4 &&
                "Perfect alignment! Consumer Credit leads sales by 3-4 weeks—giving you time to act."}
              {lagWeeks > 4 &&
                "The lag is too long. The signal is leading too far ahead to be actionable."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
