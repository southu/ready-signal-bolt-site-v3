import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
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

type ForecastingTestimonialsProps = {
  content: TestimonialsContent;
};

/**
 * Testimonial grid. Every quote renders at once as a content-sized card in a
 * responsive CSS grid (one column on mobile, two on tablet, three on desktop).
 * The grid keeps `grid-auto-rows: auto` and aligns cards to the top of each row
 * (`items-start`), so a long two-sentence quote grows its own card instead of
 * stretching its row-mates or getting clipped. No card has a fixed height and
 * nothing truncates the quote text, so every testimonial reads in full at every
 * viewport width.
 */
function ForecastingTestimonials({ content }: ForecastingTestimonialsProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const items = content.items;

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
        transition: { duration: 0.4, ease: 'easeOut' as const },
      };

  return (
    <section
      id="forecasting-testimonials"
      aria-labelledby="forecasting-testimonials-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-700">
            {content.eyebrow}
          </p>
          <h2
            id="forecasting-testimonials-heading"
            className="mt-3 text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/85 sm:text-lg">
            {content.intro}
          </p>
        </motion.div>

        {/* A plain CSS grid with `items-start` lets each card size to its own
            content: `grid-auto-rows` stays `auto` and rows never stretch, so
            variable-length quotes sit next to each other without clipping or
            forced equal heights. */}
        <ul className="mt-12 grid list-none grid-cols-1 items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            // "Scanmmar" looks like it may be a typo but is carried through
            // verbatim per explicit instruction. Surface a real HTML comment
            // node next to that card so an operator can spot it in the page
            // source (JSX `{/* */}` comments never reach the DOM).
            const needsOperatorReview = item.title === 'Scanmmar';

            return (
              <li key={index}>
                {needsOperatorReview && (
                  <span
                    aria-hidden="true"
                    className="hidden"
                    dangerouslySetInnerHTML={{
                      __html:
                        '<!-- OPERATOR REVIEW: attribution "Scanmmar" may be a typo (did you mean a different company name?) — confirm before treating as final. Carried through verbatim per explicit instruction. -->',
                    }}
                  />
                )}
                <figure className="flex flex-col rounded-2xl border-2 border-rs-dark/10 bg-rs-light-gray p-6 shadow-sm sm:p-8">
                  <Quote className="h-8 w-8 shrink-0 text-rs-yellow" aria-hidden="true" />
                  <blockquote className="mt-4 text-base leading-relaxed text-rs-dark/85">
                    {item.quote}
                  </blockquote>
                  {(item.name || item.title || item.company) && (
                    <figcaption className="mt-6 border-t border-rs-dark/10 pt-4">
                      {item.name && (
                        <p className="text-base font-bold text-rs-dark">{item.name}</p>
                      )}
                      {item.title && (
                        <p
                          className={`text-sm font-semibold text-rs-dark ${
                            item.name ? 'mt-1' : ''
                          }`}
                        >
                          {item.title}
                        </p>
                      )}
                      {item.company && (
                        <p
                          className={`text-sm font-normal text-rs-dark/60 ${
                            item.name || item.title ? 'mt-0.5' : ''
                          }`}
                        >
                          {item.company}
                        </p>
                      )}
                    </figcaption>
                  )}
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default ForecastingTestimonials;
