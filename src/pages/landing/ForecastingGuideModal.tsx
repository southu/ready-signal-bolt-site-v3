import { FormEvent, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { FORECASTING_LANDING_CONTENT } from './forecastingLandingContent';
import { captureLandingAttribution } from './captureLandingAttribution';

/**
 * Same verified portal/form pair the existing landing form posts to. No
 * dedicated "forecasting guide" form exists yet, so marketing can swap the form
 * ID here without touching component logic. HubSpot ignores field names the
 * destination form does not define (company, jobtitle, and the hidden fields
 * below), which is a known limitation until that form exists.
 */
const HUBSPOT_PORTAL_ID = '3894723';
const HUBSPOT_FORM_ID = '17d74227-1cac-49f2-923f-de99a49b6aa1';
const HUBSPOT_SUBMISSION_URL =
  `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

const LANDING_PAGE_PATH = '/forecasting-landing';
const DEFAULT_GUIDE_NAME = 'Sample Signals Guide';
const DIALOG_TITLE_ID = 'forecasting-guide-modal-title';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

const { guideModal } = FORECASTING_LANDING_CONTENT;

export type ForecastingGuideVariant = {
  slug: string;
  title: string;
  guideName: string;
};

type FormValues = {
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  jobtitle: string;
};

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  company: '',
  email: '',
  jobtitle: '',
};

const getHubSpotCookie = () =>
  document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('hubspotutk='))
    ?.split('=')[1];

const validateEmail = (email: string) => {
  if (!email.trim()) return 'Enter your work email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  return '';
};

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = () => setMatches(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}

type ForecastingGuideModalProps = {
  isOpen: boolean;
  variant: ForecastingGuideVariant | null;
  onClose: () => void;
};

/**
 * Guide request modal (M-01) — centered dialog on desktop, full-screen bottom
 * sheet on mobile. Submits the visible fields plus the PRD Part 9 hidden
 * fields to HubSpot, then swaps the form for the confirmation state.
 */
function ForecastingGuideModal({ isOpen, variant, onClose }: ForecastingGuideModalProps) {
  const isMobile = useMediaQuery('(max-width: 639px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [values, setValues] = useState<FormValues>(initialValues);
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const confirmationCtaRef = useRef<HTMLButtonElement>(null);

  const guideName = variant?.guideName ?? DEFAULT_GUIDE_NAME;
  const headline = variant ? `Get Your ${variant.guideName}` : guideModal.defaultHeadline;

  // Every open starts from a clean form, including one reopened after success.
  useEffect(() => {
    if (!isOpen) return;
    setValues(initialValues);
    setEmailError('');
    setSubmitError('');
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [isOpen]);

  // Remember the card that opened the modal and hand focus back on close.
  useEffect(() => {
    if (!isOpen) return;
    triggerRef.current = document.activeElement as HTMLElement | null;

    return () => {
      const trigger = triggerRef.current;
      if (trigger && document.body.contains(trigger)) {
        trigger.focus();
      }
    };
  }, [isOpen]);

  // Move focus into the dialog, and keep the page behind it from scrolling.
  useEffect(() => {
    if (!isOpen) return;

    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  // Escape closes; Tab cycles within the dialog only.
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
      if (!focusables.length) {
        event.preventDefault();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (!(active instanceof HTMLElement) || !panel.contains(active)) {
        event.preventDefault();
        first.focus();
        return;
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // The form unmounts on success, so pull focus onto the remaining CTA.
  useEffect(() => {
    if (isSubmitted) confirmationCtaRef.current?.focus();
  }, [isSubmitted]);

  const updateValue = (name: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (name === 'email' && emailError) setEmailError('');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextEmailError = validateEmail(values.email);
    if (nextEmailError) {
      setEmailError(nextEmailError);
      document.getElementById('forecasting-guide-email')?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const attribution = captureLandingAttribution();
    const fields = [
      { name: 'firstname', value: values.firstname.trim() },
      { name: 'lastname', value: values.lastname.trim() },
      { name: 'company', value: values.company.trim() },
      { name: 'email', value: values.email.trim() },
      { name: 'jobtitle', value: values.jobtitle.trim() },
      { name: 'forecast_variant', value: variant?.slug ?? 'default' },
      { name: 'landing_page', value: LANDING_PAGE_PATH },
      { name: 'guide_requested', value: guideName },
      { name: 'submission_timestamp', value: new Date().toISOString() },
      { name: 'utm_source', value: attribution.utm_source },
      { name: 'utm_medium', value: attribution.utm_medium },
      { name: 'utm_campaign', value: attribution.utm_campaign },
      { name: 'referral_source', value: attribution.referrer },
    ];
    const hutk = getHubSpotCookie();

    try {
      const response = await fetch(HUBSPOT_SUBMISSION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submittedAt: Date.now().toString(),
          fields,
          context: {
            ...(hutk ? { hutk } : {}),
            pageUri: window.location.href,
            pageName: document.title,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HubSpot submission failed with status ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Unable to submit forecasting guide request', error);
      setSubmitError('We could not send your request. Please try again in a moment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: isMobile ? 0.3 : 0.25, ease: 'easeOut' as const };

  const panelMotion = isMobile
    ? { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } }
    : { initial: { scale: 0.98, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.98, opacity: 0 } };

  const fieldClasses =
    'mt-1 w-full rounded-lg border border-rs-dark/20 px-3 py-2.5 text-base text-rs-dark transition-colors duration-150 placeholder:text-rs-dark/40 focus:border-rs-cyan focus:outline-none focus:ring-2 focus:ring-rs-cyan/30';
  const labelClasses = 'block text-sm font-semibold text-rs-dark';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
          <motion.div
            className="absolute inset-0 bg-rs-dark/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={DIALOG_TITLE_ID}
            className="relative flex min-h-full max-h-full w-full flex-col overflow-y-auto bg-white px-5 pb-8 pt-6 shadow-2xl sm:min-h-0 sm:max-w-xl sm:rounded-2xl sm:px-8"
            {...panelMotion}
            transition={transition}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-rs-dark/50 transition-colors duration-150 hover:bg-rs-dark/5 hover:text-rs-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {isSubmitted ? (
              <div className="pr-8" role="status" aria-live="polite">
                <h2
                  id={DIALOG_TITLE_ID}
                  className="text-2xl font-bold leading-tight text-rs-dark sm:text-3xl"
                >
                  {guideModal.confirmation.headline}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-rs-dark/75">
                  {guideModal.confirmation.body}
                </p>
                <button
                  ref={confirmationCtaRef}
                  type="button"
                  onClick={onClose}
                  className="mt-6 w-full rounded-lg border-2 border-rs-dark/15 px-6 py-3 text-base font-semibold text-rs-dark transition-colors duration-150 hover:border-rs-dark/30 hover:bg-rs-dark/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2"
                >
                  {guideModal.confirmation.secondaryCta}
                </button>
              </div>
            ) : (
              <>
                <div className="pr-8">
                  <h2
                    id={DIALOG_TITLE_ID}
                    className="text-2xl font-bold leading-tight text-rs-dark sm:text-3xl"
                  >
                    {headline}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-rs-dark/75 sm:text-base">
                    {guideModal.supportingCopy}
                  </p>
                </div>

                <form className="mt-6" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className={labelClasses} htmlFor="forecasting-guide-firstname">
                        First Name
                      </label>
                      <input
                        className={fieldClasses}
                        id="forecasting-guide-firstname"
                        name="firstname"
                        type="text"
                        autoComplete="given-name"
                        value={values.firstname}
                        onChange={(event) => updateValue('firstname', event.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClasses} htmlFor="forecasting-guide-lastname">
                        Last Name
                      </label>
                      <input
                        className={fieldClasses}
                        id="forecasting-guide-lastname"
                        name="lastname"
                        type="text"
                        autoComplete="family-name"
                        value={values.lastname}
                        onChange={(event) => updateValue('lastname', event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className={labelClasses} htmlFor="forecasting-guide-company">
                      Company
                    </label>
                    <input
                      className={fieldClasses}
                      id="forecasting-guide-company"
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(event) => updateValue('company', event.target.value)}
                    />
                  </div>

                  <div className="mt-4">
                    <label className={labelClasses} htmlFor="forecasting-guide-email">
                      Work Email <span className="text-rs-cyan">*</span>
                    </label>
                    <input
                      className={`${fieldClasses} ${emailError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/30' : ''}`}
                      id="forecasting-guide-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(emailError)}
                      aria-describedby={emailError ? 'forecasting-guide-email-error' : undefined}
                      value={values.email}
                      onChange={(event) => updateValue('email', event.target.value)}
                    />
                    {emailError && (
                      <p
                        className="mt-1.5 text-sm font-medium text-red-600"
                        id="forecasting-guide-email-error"
                        role="alert"
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <label className={labelClasses} htmlFor="forecasting-guide-jobtitle">
                      Job Title (Optional)
                    </label>
                    <input
                      className={fieldClasses}
                      id="forecasting-guide-jobtitle"
                      name="jobtitle"
                      type="text"
                      autoComplete="organization-title"
                      value={values.jobtitle}
                      onChange={(event) => updateValue('jobtitle', event.target.value)}
                    />
                  </div>

                  {submitError && (
                    <p className="mt-4 text-sm font-medium text-red-600" role="alert">
                      {submitError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full rounded-lg bg-rs-yellow px-6 py-3 text-base font-bold text-rs-dark shadow-sm transition-colors duration-150 hover:bg-rs-yellow/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rs-cyan focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? 'Sending…' : guideModal.submitLabel}
                  </button>

                  <p className="mt-3 text-xs leading-relaxed text-rs-dark/60">
                    {guideModal.privacyCopy}
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ForecastingGuideModal;
