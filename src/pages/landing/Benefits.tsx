import { Eye, Layers, TrendingUp } from 'lucide-react';

/**
 * Standalone landing-page Benefits grid for future redesign work.
 * Not wired into the live home page — used only by the /landing-preview route.
 */
const BENEFITS = [
  {
    id: 'zero-black-boxes',
    title: 'Zero Black Boxes',
    description:
      'Every recommended signal is backed by Granger Causality tests and clear documentation — you always know the why, not just the what.',
    icon: Eye,
  },
  {
    id: 'massive-scale',
    title: 'Massive Scale',
    description:
      'Search across 40,000+ external data sources and millions of features without building or maintaining your own feature store.',
    icon: Layers,
  },
  {
    id: 'immediate-roi',
    title: 'Immediate ROI',
    description:
      'Teams typically reduce forecast error by ~50%, unlocking faster decisions and measurable impact on inventory, spend, and revenue.',
    icon: TrendingUp,
  },
] as const;

const Benefits = () => {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-rs-dark mb-4 font-sans">
            Benefits
          </h2>
          <p className="text-base sm:text-lg text-rs-dark opacity-75 max-w-2xl mx-auto font-sans">
            Why data and finance teams choose Ready Signal for external signal discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-rs-light-gray rounded-xl p-6 sm:p-8 border border-rs-dark/10 flex flex-col"
            >
              <div className="w-12 h-12 rounded-lg bg-rs-yellow/20 flex items-center justify-center mb-5 flex-shrink-0">
                <benefit.icon className="w-6 h-6 text-rs-dark" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-rs-dark mb-3 font-sans">
                {benefit.title}
              </h3>
              <p className="text-rs-dark opacity-75 leading-relaxed font-sans">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
