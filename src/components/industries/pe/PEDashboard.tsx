import { motion } from 'framer-motion';
import { Database, ClipboardCheck, Eye, Settings, Shield, FileText, Calendar, Lock } from 'lucide-react';

const dataRequirements = [
  {
    icon: FileText,
    title: 'Company time series',
    description: 'Revenue (and/or volume), key margin or cost lines where relevant',
  },
  {
    icon: Database,
    title: 'Optional drivers',
    description: 'Pricing metrics, backlog, pipeline, unit economics, operational KPIs',
  },
  {
    icon: Calendar,
    title: 'Granularity',
    description: 'Monthly is common; weekly can be used when the business supports it',
  },
];

const onboardingSteps = [
  { icon: Database, label: 'Data intake & validation', detail: 'Align definitions, units, and calendars; identify structural breaks' },
  { icon: ClipboardCheck, label: 'Signal selection & modeling', detail: 'Evaluate external indicators against company outcomes; build and validate models' },
  { icon: Eye, label: 'Explainability review', detail: 'Confirm driver attribution is stable, interpretable, and decision-relevant' },
  { icon: Settings, label: 'Workflow integration', detail: 'Deliver outputs into reporting and operating cadence' },
  { icon: Shield, label: 'Governance', detail: 'Establish refresh cadence, scenario routines, and model monitoring' },
];

const PEDashboard = () => {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-rs-dark mb-4">
            Implementation, Data Requirements & Security
          </h2>
          <p className="text-xl text-rs-dark opacity-75 max-w-3xl mx-auto">
            Private equity forecasting lives inside sensitive operating data and sponsor workflows. Implementation has to be practical, auditable, and secure.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Data Requirements */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-rs-dark mb-6">Data Requirements</h3>
            <div className="space-y-4">
              {dataRequirements.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 bg-rs-light-gray rounded-lg p-4">
                  <div className="w-10 h-10 rounded-lg bg-rs-cyan bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-rs-cyan" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-rs-dark">{item.title}</h4>
                    <p className="text-rs-dark opacity-75 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-rs-dark opacity-60 text-sm italic">
              More history improves robustness; shorter histories can work with careful feature selection and validation.
            </p>
          </motion.div>

          {/* Onboarding Process */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-rs-dark mb-6">Onboarding Process</h3>
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200"></div>
              <div className="space-y-6">
                {onboardingSteps.map((step, i) => (
                  <div key={i} className="flex items-start space-x-4 relative">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rs-cyan to-blue-600 flex items-center justify-center flex-shrink-0 z-10">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-rs-light-gray rounded-lg p-4 flex-1">
                      <h4 className="font-semibold text-rs-dark">{step.label}</h4>
                      <p className="text-rs-dark opacity-75 text-sm">{step.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Security */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-rs-light-gray rounded-xl p-8 flex items-start space-x-4"
        >
          <div className="w-12 h-12 rounded-lg bg-rs-yellow bg-opacity-10 flex items-center justify-center flex-shrink-0">
            <Lock className="w-6 h-6 text-rs-yellow" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-rs-dark mb-2">Security & Confidentiality</h3>
            <p className="text-rs-dark opacity-75 leading-relaxed">
              Ready Signal is designed to support sponsor-grade confidentiality expectations. Security controls and deployment options depend on the engagement, but typically include least-privilege access, auditability, and environment separation appropriate for portfolio data.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PEDashboard;
