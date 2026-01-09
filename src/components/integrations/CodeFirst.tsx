import { motion } from 'framer-motion';
import { Code, Terminal } from 'lucide-react';

const CodeFirst = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-3 mb-4">
            <Code className="w-10 h-10 text-rs-cyan" />
            <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark">
              Code-First <span className="text-gray-500 text-2xl">(For Data Scientists)</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-rs-dark mb-6">Native SDKs.</h3>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Install our libraries with a single command. We handle the authentication, pagination, and data normalization.
            </p>

            <div className="bg-rs-light-gray rounded-xl p-6 mb-6">
              <h4 className="text-lg font-bold text-rs-dark mb-4">Supported Languages:</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rs-cyan rounded-full"></div>
                  <span className="text-rs-dark font-semibold">Python</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-rs-cyan rounded-full"></div>
                  <span className="text-rs-dark font-semibold">R</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-rs-dark rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-6 py-3 flex items-center space-x-2 border-b border-gray-700">
                <Terminal className="w-4 h-4 text-rs-cyan" />
                <span className="text-sm text-gray-400 font-mono">Bash</span>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>
                    <span className="text-rs-yellow">pip</span> <span className="text-white">install</span> <span className="text-rs-cyan">readysignal</span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-rs-dark rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-6 py-3 flex items-center space-x-2 border-b border-gray-700">
                <Terminal className="w-4 h-4 text-rs-cyan" />
                <span className="text-sm text-gray-400 font-mono">R</span>
              </div>
              <div className="p-6">
                <pre className="text-sm text-gray-300 font-mono">
                  <code>
                    <span className="text-rs-yellow">install.packages</span><span className="text-white">(</span><span className="text-green-400">"readysignal"</span><span className="text-white">)</span>
                  </code>
                </pre>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-rs-cyan to-blue-500 rounded-xl p-6 text-white"
            >
              <p className="text-lg font-semibold mb-2">The Code Proof:</p>
              <p className="text-sm opacity-90">
                One command. Zero configuration. Production-ready integration in minutes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodeFirst;
