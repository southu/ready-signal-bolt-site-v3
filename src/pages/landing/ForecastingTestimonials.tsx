import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';

type TestimonialsContent = typeof FORECASTING_LANDING_CONTENT.testimonials;

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

// Breakpoints match Tailwind's sm/lg: three cards on desktop, two on tablet,
// one on mobile. Only the cards in the current window are rendered, so a phone
// never has an off-screen card sitting in the accessibility tree.
const DESKTOP_QUERY = '(min-width: 1024px)';
const TABLET_QUERY = '(min-width: 640px)';

function useVisibleCount() {
  const read = () => {
    if (window.matchMedia(DESKTOP_QUERY).matches) return 3;
    if (window.matchMedia(TABLET_QUERY).matches) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(read);

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const tablet = window.matchMedia(TABLET_QUERY);
    const handleChange = () => setVisibleCount(read());

    handleChange();
    desktop.addEventListener('change', handleChange);
    tablet.addEventListener('change', handleChange);
    return () => {
      desktop.removeEventListener('change', handleChange);
      tablet.removeEventListener('change', handleChange);
    };
  }, []);

  return visibleCount;
}

const ROTATE_INTERVAL_MS = 7000;

const GRID_COLUMNS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
};

type ForecastingTestimonialsProps = {
  content: TestimonialsContent;
};

/**
 * Testimonial carousel. `activeIndex` is the leading card and the window wraps
 * around the list, so every breakpoint shares one index and one set of dots.
 * Auto-rotation only runs when there are more testimonials than fit at once —
 * on desktop all three are already on screen, so nothing moves on its own.
 */
function ForecastingTestimonials({ content }: ForecastingTestimonialsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const visibleCount = useVisibleCount();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = content.items;
  const total = items.length;
  const canRotate = total > visibleCount;

  const goTo = (index: number) => setActiveIndex(((index % total) + total) % total);

  useEffect(() => {
    if (!canRotate || isPaused || prefersReducedMotion) return;

    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % total),
      ROTATE_INTERVAL_MS
    );
    return () => window.clearInterval(timer);
  }, [canRotate, isPaused, prefersReducedMotion, total]);

  const visibleItems = Array.from({ length: Math.min(visibleCount, total) }, (_, offset) => {
    const index = (activeIndex + offset) % total;
    return { item: items[index], index };
  });

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      };

  const cardMotion = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.25, ease: 'easeOut' as const },
      };

  const controlClasses =
    'flex h-11 w-11 items-center justify-center rounded-full border-2 border-rs-dark/15 bg-white text-rs-dark transition-colors duration-150 hover:border-rs-cyan hover:text-rs-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2';

  return (
    <section
      id="forecasting-testimonials"
      aria-labelledby="forecasting-testimonials-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-rs-cyan">
            {content.eyebrow}
          </p>
          <h2
            id="forecasting-testimonials-heading"
            className="mt-3 text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/75 sm:text-lg">
            {content.intro}
          </p>
        </motion.div>

        {/* Hover and keyboard focus both pause rotation; focus/blur are the
            React-bubbled focusin/focusout, so any control or link inside the
            carousel holds it still while it is being read. */}
        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          className="mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <div className={`grid gap-6 ${GRID_COLUMNS[visibleCount] ?? 'grid-cols-1'}`}>
            {visibleItems.map(({ item, index }) => {
              const attribution = [item.title, item.company].filter(Boolean).join(', ');

              return (
                <motion.figure
                  key={index}
                  {...cardMotion}
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${index + 1} of ${total}`}
                  className="flex h-full flex-col rounded-2xl border-2 border-rs-dark/10 bg-rs-light-gray p-6 shadow-sm sm:p-8"
                >
                  <Quote className="h-8 w-8 shrink-0 text-rs-yellow" aria-hidden="true" />
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-rs-dark/85">
                    {item.quote}
                  </blockquote>
                  <figcaption className="mt-6 border-t border-rs-dark/10 pt-4">
                    {item.name && (
                      <p className="text-base font-bold text-rs-dark">{item.name}</p>
                    )}
                    <p className={`text-sm text-rs-dark/70 ${item.name ? 'mt-1' : ''}`}>
                      {attribution}
                    </p>
                  </figcaption>
                </motion.figure>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous testimonial"
              className={controlClasses}
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-2">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`Show testimonial ${index + 1} of ${total}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  className={`h-3 w-3 rounded-full transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 ${
                    index === activeIndex ? 'bg-rs-cyan' : 'bg-rs-dark/20 hover:bg-rs-dark/40'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next testimonial"
              className={controlClasses}
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForecastingTestimonials;
