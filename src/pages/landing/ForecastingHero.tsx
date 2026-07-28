import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight, Check, Database, LineChart, TrendingUp } from 'lucide-react';
import { logEvent } from '../../lib/analytics';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type HeroContent = typeof FORECASTING_LANDING_CONTENT.hero;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches
  );

  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = () => setPrefersReducedMotion(query.matches);

    handleChange();
    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/** Floating input cards orbiting the centre concept — decorative only. */
const FLOATING_CARDS = [
  { label: 'Your Data', Icon: Database, position: 'left-0 top-4 sm:top-8', delay: 0 },
  { label: 'External Signals', Icon: LineChart, position: 'right-0 top-20 sm:top-28', delay: 1.3 },
  { label: 'Forecast Accuracy', Icon: TrendingUp, position: 'bottom-2 left-1/2 -translate-x-1/2', delay: 2.6 },
];

/** Evenly spaced orbit dots — rotation classes must stay literal for Tailwind's JIT. */
const ORBIT_DOTS = ['rotate-[0deg]', 'rotate-[120deg]', 'rotate-[240deg]'];

type ForecastingHeroProps = {
  content: HeroContent;
};

function ForecastingHero({ content }: ForecastingHeroProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // The hero is the top of the page, so mount and first view are the same
  // moment — no observer needed for this one.
  useEffect(() => {
    logEvent('ForecastingLanding', 'Hero Viewed', 'forecasting-landing');
  }, []);

  // Entrance: opacity only for the copy column so the headline and CTAs never
  // change position after paint (no layout shift). Whole sequence lands < 1s.
  const fadeIn = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.4, ease: 'easeOut' as const, delay },
        };

  const spin = (duration: number) =>
    prefersReducedMotion
      ? {}
      : {
          animate: { rotate: 360 },
          transition: { duration, ease: 'linear' as const, repeat: Infinity },
        };

  const motionState = prefersReducedMotion ? 'static' : 'animating';
  const motionClass = prefersReducedMotion ? '' : ' is-animating';

  return (
    <section
      aria-labelledby="forecasting-hero-headline"
      className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="min-w-0 space-y-8 lg:col-span-5">
            <div className="space-y-4">
              <motion.span
                {...fadeIn(0)}
                className="inline-flex rounded-full bg-rs-light-gray px-4 py-2 text-sm font-semibold text-rs-dark/80"
              >
                {content.eyebrow}
              </motion.span>

              <motion.h1
                {...fadeIn(0.05)}
                id="forecasting-hero-headline"
                className="text-[2rem] font-bold leading-[1.12] text-rs-dark sm:text-5xl lg:text-[3.5rem]"
              >
                {content.headline}
              </motion.h1>

              <motion.p
                {...fadeIn(0.1)}
                className="max-w-2xl text-base leading-relaxed text-rs-dark/85 sm:text-lg"
              >
                {content.body}
              </motion.p>
            </div>

            {/* Row while the column is full width; stacked once the grid narrows
                the copy column to 5/12 so the CTA labels never wrap. */}
            <motion.div
              {...fadeIn(0.15)}
              className="flex flex-col gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-start"
            >
              <a
                href="#forecasting-variants"
                onClick={() => logEvent('ForecastingLanding', 'Hero Primary CTA Click', content.primaryCta)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-rs-yellow px-6 py-3 font-semibold text-rs-dark shadow-md transition-all hover:bg-yellow-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:px-8"
              >
                {content.primaryCta}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="/contact-us/"
                onClick={() => logEvent('ForecastingLanding', 'Hero Secondary CTA Click', content.secondaryCta)}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-rs-dark/25 bg-white px-6 py-3 font-semibold text-rs-dark transition-colors hover:border-rs-dark/50 hover:bg-rs-light-gray focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:px-8"
              >
                {content.secondaryCta}
              </a>
            </motion.div>

            <motion.ul {...fadeIn(0.2)} className="space-y-2">
              {content.microcopy.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-rs-dark/85">
                  <Check className="h-4 w-4 shrink-0 text-rs-cyan" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="min-w-0 space-y-8 lg:col-span-7">
            {/* Decorative orbit illustration. Height is reserved so the fade-in
                cannot shift the surrounding layout. */}
            <motion.div
              {...fadeIn(0.2)}
              aria-hidden="true"
              data-hero-motion={motionState}
              className="relative mx-auto flex h-[320px] w-full max-w-[440px] items-center justify-center sm:h-[400px] sm:max-w-[520px]"
            >
              <motion.div
                {...spin(60)}
                data-hero-motion={motionState}
                className={`absolute h-[240px] w-[240px] rounded-full border-2 border-dashed border-rs-cyan/30 sm:h-[300px] sm:w-[300px]${motionClass}`}
              />
              <div className="absolute h-[168px] w-[168px] rounded-full border border-rs-dark/10 sm:h-[210px] sm:w-[210px]" />

              <motion.div
                {...spin(7)}
                data-hero-motion={motionState}
                className={`absolute h-[240px] w-[240px] sm:h-[300px] sm:w-[300px]${motionClass}`}
              >
                {ORBIT_DOTS.map((rotation) => (
                  <div key={rotation} className={`absolute inset-0 ${rotation}`}>
                    <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rs-cyan" />
                  </div>
                ))}
              </motion.div>

              <motion.div
                {...(prefersReducedMotion
                  ? {}
                  : {
                      animate: { scale: [1, 1.03, 1] },
                      transition: { duration: 3, ease: 'easeInOut' as const, repeat: Infinity },
                    })}
                data-hero-motion={motionState}
                className={`absolute z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-gradient-to-br from-rs-cyan to-blue-600 p-4 text-center text-white shadow-2xl sm:h-32 sm:w-32${motionClass}`}
              >
                <Activity className="mb-1 h-6 w-6" aria-hidden="true" />
                <span className="text-xs font-bold leading-tight">Validated Signals</span>
              </motion.div>

              {FLOATING_CARDS.map(({ label, Icon, position, delay }) => (
                <div key={label} className={`absolute ${position}`}>
                  <motion.div
                    {...(prefersReducedMotion
                      ? {}
                      : {
                          animate: { y: [0, -6, 0] },
                          transition: {
                            duration: 4,
                            ease: 'easeInOut' as const,
                            repeat: Infinity,
                            delay,
                          },
                        })}
                    data-hero-motion={motionState}
                    className={`flex items-center gap-2 rounded-lg border border-rs-dark/10 bg-white px-3 py-2 text-sm font-semibold text-rs-dark shadow-lg${motionClass}`}
                  >
                    <Icon className="h-4 w-4 text-rs-cyan" aria-hidden="true" />
                    {label}
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <motion.div
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 12 },
                    animate: { opacity: 1, y: 0 },
                    transition: { duration: 0.4, ease: 'easeOut' as const, delay: 0.25 },
                  })}
              className="mx-auto w-full max-w-[440px] rounded-2xl border border-rs-dark/10 bg-white p-6 shadow-lg sm:max-w-[520px]"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-rs-dark/80">
                {content.forecastCard.header}
              </p>
              <h2 className="mt-2 text-xl font-bold text-rs-dark">
                {content.forecastCard.forecastName}
              </h2>

              <ul className="mt-4 space-y-2">
                {content.forecastCard.signals.map((signal) => (
                  <li key={signal} className="flex items-center gap-2 text-sm text-rs-dark/85">
                    <Check className="h-4 w-4 shrink-0 text-rs-cyan" aria-hidden="true" />
                    {signal}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between rounded-xl bg-rs-light-gray px-4 py-3">
                <span className="text-sm font-semibold text-rs-dark">
                  {content.forecastCard.resultLabel}
                </span>
                <span className="text-2xl font-bold text-rs-dark">
                  {content.forecastCard.resultValue}
                </span>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-rs-dark/80">
                {content.forecastCard.footer}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForecastingHero;
