import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import ReactGA from 'react-ga4';
import { logEvent } from '../../lib/analytics';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';
import type { ForecastingGuideVariant } from './ForecastingGuideModal';

type VariantSelectorContent = typeof FORECASTING_LANDING_CONTENT.variantSelector;
type VariantCard = VariantSelectorContent['cards'][number];

/** GA4 transport — see the note in ForecastingHero.tsx. */
const GA4_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

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

/**
 * Column placement per card, indexed to match `content.cards`.
 *
 * The track counts are multiples of the card count at each step so every card
 * keeps an identical width: 4 tracks / 2 each = two-up on tablet, 6 tracks /
 * 2 each = three-up on laptop, and a plain five-track row once the content
 * column is wide enough for five. The explicit column starts centre the
 * short final row (card 5 on tablet, cards 4-5 on laptop). Classes stay
 * literal strings so Tailwind's JIT scanner can see them.
 */
const CARD_PLACEMENT = [
  'sm:col-span-2 lg:col-span-2 min-[1200px]:col-span-1',
  'sm:col-span-2 lg:col-span-2 min-[1200px]:col-span-1',
  'sm:col-span-2 lg:col-span-2 min-[1200px]:col-span-1',
  'sm:col-span-2 lg:col-span-2 lg:col-start-2 min-[1200px]:col-span-1 min-[1200px]:col-start-auto',
  'sm:col-span-2 sm:col-start-2 lg:col-span-2 lg:col-start-4 min-[1200px]:col-span-1 min-[1200px]:col-start-auto',
];

type ForecastingVariantSelectorProps = {
  content: VariantSelectorContent;
  onSelectVariant?: (variant: ForecastingGuideVariant) => void;
};

/**
 * Forecasting variant selector — the page's primary self-identification step.
 * Each card is a single button so the whole tile is one click and one tab stop.
 * Selection is tracked locally for the visual state and handed up through
 * `onSelectVariant` so the page can open the guide modal.
 */
function ForecastingVariantSelector({ content, onSelectVariant }: ForecastingVariantSelectorProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Fires once, the first time the card grid reaches the viewport.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        logEvent('ForecastingLanding', 'Variant Impression', 'forecasting-landing');
        ReactGA.event('variant_impression', {
          event_category: 'ForecastingLanding',
          event_label: 'forecasting-landing',
          send_to: GA4_MEASUREMENT_ID,
        });
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleSelect = (card: VariantCard) => {
    logEvent('ForecastingLanding', 'Variant Selected', card.slug);
    ReactGA.event('variant_selected', {
      event_category: 'ForecastingLanding',
      event_label: card.slug,
      send_to: GA4_MEASUREMENT_ID,
    });
    setSelectedSlug(card.slug);
    onSelectVariant?.({ slug: card.slug, title: card.title, guideName: card.guideName });
  };

  // Cards fade upward once, 40ms apart. Under reduced motion the props drop
  // out entirely so the cards paint visible with no transform and no delay.
  const reveal = (index: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2, margin: '0px 0px 20% 0px' },
          transition: {
            duration: 0.4,
            ease: 'easeOut' as const,
            delay: index * 0.04,
          },
        };

  return (
    <section
      ref={sectionRef}
      id="forecasting-variant-selector"
      aria-labelledby="forecasting-variants-heading"
      className="bg-rs-light-gray py-16 sm:py-20"
    >
      {/* The hero's jump link still targets #forecasting-variants, so that id
          stays on the page — it moves to the content wrapper to leave the
          section root free for the id the final CTA scrolls to. */}
      <div id="forecasting-variants" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-rs-dark/80">
            {content.eyebrow}
          </span>
          <h2
            id="forecasting-variants-heading"
            className="mt-4 text-3xl font-bold leading-tight text-rs-dark sm:text-4xl"
          >
            {content.headline}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-rs-dark/85 sm:text-lg">
            {content.supportingCopy}
          </p>
        </div>

        {/* auto-rows-fr keeps every row the same height, so cards match across
            wrapped rows as well as within one. */}
        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-6 min-[1200px]:grid-cols-5">
          {content.cards.map((card, index) => {
            const isSelected = selectedSlug === card.slug;

            return (
              <motion.div key={card.slug} {...reveal(index)} className={CARD_PLACEMENT[index]}>
                {/* Phrasing content only inside the button so the markup stays
                    valid; the label is the accessible name and the body copy is
                    referenced as the description. */}
                <button
                  type="button"
                  aria-label={card.label}
                  aria-pressed={isSelected}
                  aria-describedby={`forecasting-variant-${card.slug}-title`}
                  // Focusing the card explicitly (some browsers do not focus a
                  // button on click) is what lets the modal hand focus back here.
                  onClick={(event) => {
                    event.currentTarget.focus();
                    handleSelect(card);
                  }}
                  // Mouse pointers only: a touch tap also raises pointerenter,
                  // which would double-count every tap as a hover plus a select.
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse') return;
                    logEvent('ForecastingLanding', 'Variant Hovered', card.slug);
                    ReactGA.event('variant_hovered', {
                      event_category: 'ForecastingLanding',
                      event_label: card.slug,
                      send_to: GA4_MEASUREMENT_ID,
                    });
                  }}
                  // The hover lift and border tint still animate, but box-shadow
                  // is left out of the transition so the focus ring paints on
                  // the same frame as the tab stop instead of fading in over
                  // 200ms. The outline lands in the same 2px band as the ring's
                  // cyan edge, so the two read as one crisp ring while keeping a
                  // non-transparent computed outline for keyboard users.
                  className={`group flex h-full w-full flex-col rounded-2xl border-2 p-5 text-left shadow-sm transition-[transform,border-color] duration-200 ease-out hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rs-cyan focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 ${
                    isSelected
                      ? 'border-rs-cyan bg-rs-cyan/5'
                      : 'border-rs-dark/10 bg-white hover:border-rs-dark/30'
                  }`}
                >
                  {/* Two lines are reserved once the row is five across, where
                      the longest label wraps — keeps every title on the same
                      baseline across the row. */}
                  <span className="flex items-start justify-between gap-2 min-[1200px]:min-h-9">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                      {card.label}
                    </span>
                    {/* Fixed footprint so selecting a card never reflows it. */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {isSelected && (
                        <Check className="h-5 w-5 text-rs-cyan" aria-hidden="true" strokeWidth={3} />
                      )}
                    </span>
                  </span>

                  <span
                    id={`forecasting-variant-${card.slug}-title`}
                    className="mt-3 block text-base font-bold leading-snug text-rs-dark"
                  >
                    {card.title}
                  </span>

                  <span className="mt-2 block text-sm leading-relaxed text-rs-dark/85">
                    {card.description}
                  </span>

                  <span className="mt-4 block text-xs font-semibold uppercase tracking-wider text-rs-dark/80">
                    Example Signals
                  </span>
                  <span className="mt-2 block space-y-1">
                    {card.signals.map((signal) => (
                      <span key={signal} className="flex items-start gap-2 text-sm text-rs-dark/85">
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rs-cyan"
                          aria-hidden="true"
                        />
                        {signal}
                      </span>
                    ))}
                  </span>

                  <span className="mt-auto flex items-center gap-2 pt-6 text-sm font-semibold text-cyan-700">
                    {card.cta}
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ForecastingVariantSelector;
