import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';

const PricingTable = () => {

  const plans = [
    {
      name: 'Analyst',
      idealFor: 'Excel Power Users',
      price: '$1,250',
      period: '/ mo',
      billingNote: '(Billed Annually)',
      access: 'Single User',
      coreValue: '"I want to analyze in Excel."',
      dataDelivery: 'Download Excel & CSV',
      granularity: 'State, Country',
      signalLibrary: 'Full Access (3M+ Features)',
      support: 'Standard',
      ctaText: 'Start Free Trial',
      ctaLink: 'https://app.readysignal.com/auth/sign-up',
      highlighted: false,
    },
    {
      name: 'Data Science',
      idealFor: 'Individual Data Scientists',
      price: '$1,950',
      period: '/ mo',
      billingNote: '(Billed Annually)',
      access: 'Single User',
      coreValue: '"I want to build in Python/R."',
      dataDelivery: 'API Access, Python, R, Domo, Alteryx',
      granularity: 'Zip, City, County, State, Country',
      signalLibrary: 'Full Access (3M+ Features)',
      support: 'Standard',
      ctaText: 'Start Free Trial',
      ctaLink: 'https://app.readysignal.com/auth/sign-up',
      highlighted: true,
    },
    {
      name: 'Team',
      idealFor: 'Analytics Centers of Excellence',
      price: '$3,950',
      period: '/ mo',
      billingNote: '(Billed Annually)',
      access: "3 Users (Add'l $225/mo)",
      coreValue: '"We need to collaborate."',
      dataDelivery: 'API Access, Python, R, Domo, Alteryx',
      granularity: 'Zip, City, County, State, Country',
      signalLibrary: 'Shared Signal Library',
      support: 'Dedicated Customer Success',
      ctaText: 'Contact Sales',
      ctaLink: '/contact-us/',
      highlighted: false,
    },
    {
      name: 'Managed Full Service',
      idealFor: 'Executives & Stakeholders',
      price: '$9,500',
      period: ' per model',
      secondaryPrice: '+ $2,500 / mo',
      billingNote: '(One-time Build)',
      secondaryNote: '(Forecasting Updates)',
      access: 'Unlimited Stakeholders',
      coreValue: '"Build it for me."',
      dataDelivery: 'Narrative Reports & BI Dashboards',
      granularity: 'Hyper-Local (SKU/Region Level)',
      signalLibrary: 'Curated & Validated by Experts',
      support: 'Dedicated Data Scientist',
      ctaText: 'Book Consultation',
      ctaLink: '/contact-us/',
      highlighted: false,
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                plan.highlighted ? 'border-4 border-rs-cyan ring-4 ring-rs-cyan ring-opacity-20' : 'border border-gray-200'
              }`}
            >
              {plan.highlighted && (
                <div className="bg-rs-cyan text-white text-center py-2 px-4 font-bold flex items-center justify-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>POPULAR</span>
                </div>
              )}

              <div className="p-6">
                <h3 className="text-2xl font-bold text-rs-dark mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-6 h-10">{plan.idealFor}</p>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-rs-dark">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{plan.billingNote}</p>
                  {plan.secondaryPrice && (
                    <>
                      <div className="flex items-baseline mt-2">
                        <span className="text-2xl font-bold text-rs-dark">{plan.secondaryPrice}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{plan.secondaryNote}</p>
                    </>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Access</p>
                    <p className="text-sm text-rs-dark">{plan.access}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Core Value</p>
                    <p className="text-sm text-rs-dark italic">{plan.coreValue}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Data Delivery</p>
                    <p className="text-sm text-rs-dark">{plan.dataDelivery}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Granularity</p>
                    <p className="text-sm text-rs-dark">{plan.granularity}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Signal Library</p>
                    <p className="text-sm text-rs-dark">{plan.signalLibrary}</p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Support</p>
                    <p className="text-sm text-rs-dark">{plan.support}</p>
                  </div>
                </div>

                <motion.a
                  href={plan.ctaLink}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-6 rounded-lg font-bold inline-flex items-center justify-center space-x-2 transition-all ${
                    plan.highlighted
                      ? 'bg-rs-yellow text-rs-dark hover:bg-opacity-90'
                      : 'bg-rs-cyan text-white hover:bg-opacity-90'
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
