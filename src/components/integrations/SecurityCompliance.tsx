import { motion } from 'framer-motion';
import { Shield, Lock, Key, CheckCircle } from 'lucide-react';

const SecurityCompliance = () => {
  const securityFeatures = [
    {
      title: 'Encryption',
      description: 'AES-256 at rest, TLS 1.2+ in transit.',
      icon: Lock,
    },
    {
      title: 'Isolation',
      description: 'Tenant-isolated data storage.',
      icon: Shield,
    },
    {
      title: 'Compliance',
      description: 'API-Key authentication with granular permissions.',
      icon: Key,
    },
  ];

  return (
    <section className="bg-rs-light-gray py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rs-cyan rounded-full mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-rs-dark mb-4">
            Enterprise-Grade <span className="text-rs-cyan">Security</span>.
          </h2>

          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <span className="text-gray-500 text-lg">(The IT Checkbox)</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-12"
        >
          <p className="text-xl text-gray-700 text-center mb-12 leading-relaxed">
            We know we are touching your most sensitive data.{' '}
            <span className="font-bold text-rs-dark">We don't take that lightly.</span>
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rs-cyan to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-rs-dark mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-br from-rs-dark to-gray-800 rounded-2xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Built for Enterprise Trust</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Every connection is secured. Every request is authenticated. Every byte is encrypted. Your security team can sleep soundly.
              </p>
            </div>

            <div className="space-y-3">
              {['SOC 2 Type II Ready', 'GDPR Compliant Architecture', '99.9% Uptime SLA', 'Regular Security Audits'].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-6 h-6 text-rs-cyan flex-shrink-0" />
                  <span className="text-white font-semibold">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecurityCompliance;
