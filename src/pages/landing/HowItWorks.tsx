import { Database, Sparkles, LineChart } from 'lucide-react';

/**
 * Self-contained landing-page How It Works block (3 steps).
 * Composed into the home page below hero/trust, and the /landing-preview route.
 */
const STEPS = [
  {
    id: 'connect',
    title: 'Connect Your Data',
    description:
      'Securely link your internal metrics and forecast targets so Ready Signal can align external signals to what you measure.',
    icon: Database,
  },
  {
    id: 'discover',
    title: 'AI Signal Discovery',
    description:
      'Our engine scans 40,000+ validated external features and surfaces the signals that actually lead your outcomes.',
    icon: Sparkles,
  },
  {
    id: 'deploy',
    title: 'Deploy Better Forecasts',
    description:
      'Export causal features into your models and workflows to cut forecast error and act earlier on market shifts.',
    icon: LineChart,
  },
] as const;

const HowItWorks = () => {
  return (
    <section className="bg-rs-light-gray py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-rs-dark mb-4 font-sans">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-rs-dark opacity-75 max-w-2xl mx-auto font-sans">
            Three steps from raw data to precision forecasts you can trust.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {STEPS.map((step, index) => (
            <div
              key={step.id}
              className="relative bg-white rounded-xl p-6 sm:p-8 border border-rs-dark/10 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-lg bg-rs-cyan/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-6 h-6 text-rs-cyan" aria-hidden="true" />
                </div>
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rs-yellow text-rs-dark text-sm font-bold font-sans">
                  {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-rs-dark mb-3 font-sans">
                {step.title}
              </h3>
              <p className="text-rs-dark opacity-75 leading-relaxed font-sans">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
