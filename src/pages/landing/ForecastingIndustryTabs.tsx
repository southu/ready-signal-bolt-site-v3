import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type IndustryTabsContent = typeof FORECASTING_LANDING_CONTENT.industryTabs;

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

const tabId = (slug: string) => `forecasting-industry-tab-${slug}`;
const panelId = (slug: string) => `forecasting-industry-panel-${slug}`;

type ForecastingIndustryTabsProps = {
  content: IndustryTabsContent;
  onRequestGuide: (slug: string) => void;
};

/**
 * Industry tabs — the same five forecasting categories as the variant selector,
 * but as a tabbed detail view: one industry's challenge, signals, and example
 * forecast at a time. The CTA hands the tab's slug back up so the page can open
 * the shared guide modal on the matching variant.
 */
function ForecastingIndustryTabs({ content, onRequestGuide }: ForecastingIndustryTabsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeTab = content.tabs[activeIndex];

  // Arrow keys move focus and selection together (automatic activation), Home
  // and End jump to the ends — the WAI-ARIA tabs pattern. Left/Right wrap.
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = content.tabs.length - 1;
    let nextIndex: number | null = null;

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = lastIndex;

    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  // Heading fades upward once. The tablist and panel are deliberately left out
  // of the scroll reveal so the interactive parts are never mid-animation.
  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      };

  // Reduced motion snaps the underline into place and paints the panel
  // immediately; tab switching behaves identically either way.
  const underlineTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 420, damping: 36 };

  const panelMotion = prefersReducedMotion
    ? { initial: false as const, transition: { duration: 0 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15, ease: 'easeOut' as const },
      };

  const labelClasses = 'text-xs font-semibold uppercase tracking-wider text-rs-dark/50';

  return (
    <section
      id="forecasting-industries"
      aria-labelledby="forecasting-industries-heading"
      className="bg-rs-light-gray py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <h2
            id="forecasting-industries-heading"
            className="text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/75 sm:text-lg">
            {content.supportingCopy}
          </p>
        </motion.div>

        {/* Tabs wrap onto a second row rather than scrolling, so every label is
            reachable at 375px without a hidden overflow area. No horizontal gap
            keeps each row's underline track continuous. */}
        <div
          role="tablist"
          aria-label="Forecasting industries"
          className="mt-10 flex flex-wrap justify-center gap-y-1"
        >
          {content.tabs.map((tab, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={tab.slug}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={tabId(tab.slug)}
                aria-selected={isActive}
                aria-controls={panelId(tab.slug)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`relative border-b-2 border-rs-dark/10 px-4 py-3 text-base font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:px-6 ${
                  isActive ? 'text-rs-dark' : 'text-rs-dark/60 hover:text-rs-dark'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="forecasting-industry-tab-underline"
                    transition={underlineTransition}
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-0.5 bg-rs-cyan"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab.slug}
              role="tabpanel"
              id={panelId(activeTab.slug)}
              aria-labelledby={tabId(activeTab.slug)}
              {...panelMotion}
              className="rounded-2xl border-2 border-rs-dark/10 bg-white p-5 shadow-sm sm:p-8"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <div>
                  <p className={labelClasses}>The Challenge</p>
                  <p className="mt-2 break-words text-xl font-bold leading-snug text-rs-dark sm:text-2xl">
                    {activeTab.problem}
                  </p>

                  <p className={`mt-8 ${labelClasses}`}>Example Forecast</p>
                  <p className="mt-2 break-words text-lg font-semibold text-rs-dark">
                    {activeTab.exampleForecast}
                  </p>

                  <button
                    type="button"
                    onClick={() => onRequestGuide(activeTab.slug)}
                    className="mt-8 w-full break-words rounded-lg bg-rs-yellow px-6 py-3 text-base font-bold text-rs-dark shadow-sm transition-colors duration-150 hover:bg-rs-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 sm:w-auto"
                  >
                    {activeTab.cta}
                  </button>
                </div>

                <div>
                  <p className={labelClasses}>Example Signals</p>
                  <ul role="list" className="mt-3 space-y-2">
                    {activeTab.signals.map((signal) => (
                      <li
                        key={signal}
                        className="flex items-start gap-2 break-words text-base text-rs-dark/85"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rs-cyan"
                          aria-hidden="true"
                        />
                        {signal}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default ForecastingIndustryTabs;
