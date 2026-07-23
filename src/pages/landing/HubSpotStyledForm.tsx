import { FormEvent, useState } from 'react';
import styles from './HubSpotStyledForm.module.css';

const HUBSPOT_PORTAL_ID = '3894723';
const HUBSPOT_FORM_ID = '17d74227-1cac-49f2-923f-de99a49b6aa1';
const HUBSPOT_SUBMISSION_URL =
  `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

type FormValues = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  message: '',
};

const getHubSpotCookie = () =>
  document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('hubspotutk='))
    ?.split('=')[1];

const validateEmail = (email: string) => {
  if (!email.trim()) return 'Enter your business email.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return 'Enter a valid email address.';
  }
  return '';
};

const HubSpotStyledForm = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateValue = (name: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = validateEmail(values.email);
    if (emailError) {
      setErrors({ email: emailError });
      document.getElementById('hubspot-email')?.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const fields = Object.entries(values)
      .filter(([, value]) => value.trim())
      .map(([name, value]) => ({ name, value: value.trim() }));
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
      console.error('Unable to submit HubSpot form', error);
      setSubmitError(
        'We could not send your message. Please try again in a moment.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={styles.success} role="status" aria-live="polite">
        <h4 className={styles.successTitle}>Thank you for reaching out.</h4>
        <p className={styles.successMessage}>
          Your request was received. A Ready Signal expert will follow up
          within two business hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      noValidate
      data-hubspot-portal-id={HUBSPOT_PORTAL_ID}
      data-hubspot-form-id={HUBSPOT_FORM_ID}
    >
      <p className={styles.intro}>
        Talk with an expert to see how Ready Signal can automate your external
        data workflows and improve model accuracy. We typically respond within
        two business hours.
      </p>

      <div className={styles.nameRow}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="hubspot-firstname">
            First Name
          </label>
          <input
            className={styles.input}
            id="hubspot-firstname"
            name="firstname"
            type="text"
            autoComplete="given-name"
            value={values.firstname}
            onChange={(event) => updateValue('firstname', event.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="hubspot-lastname">
            Last Name
          </label>
          <input
            className={styles.input}
            id="hubspot-lastname"
            name="lastname"
            type="text"
            autoComplete="family-name"
            value={values.lastname}
            onChange={(event) => updateValue('lastname', event.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hubspot-email">
          Business Email <span className={styles.required}>*</span>
        </label>
        <input
          className={`${styles.input} ${errors.email ? styles.invalid : ''}`}
          id="hubspot-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'hubspot-email-error' : undefined}
          required
          value={values.email}
          onChange={(event) => updateValue('email', event.target.value)}
          onBlur={() => {
            const emailError = validateEmail(values.email);
            if (values.email || emailError) setErrors({ email: emailError });
          }}
        />
        {errors.email && (
          <p className={styles.error} id="hubspot-email-error" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hubspot-phone">
          Direct Dial (Optional)
        </label>
        <input
          className={styles.input}
          id="hubspot-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => updateValue('phone', event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hubspot-message">
          Message (Optional)
        </label>
        <textarea
          className={styles.textarea}
          id="hubspot-message"
          name="message"
          placeholder="Give us a bit of context so we can prepare the most relevant data sets and forecasting examples for our conversation."
          value={values.message}
          onChange={(event) => updateValue('message', event.target.value)}
        />
      </div>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Submit'}
      </button>

      <p className={styles.branding}>
        <a
          className={styles.brandingLink}
          href="https://app.hubspot.com/signup-hubspot/marketing?utm_medium=virality&amp;utm_campaign=hubspot-forms-virality&amp;intent=marketingFreeForms&amp;hubs_id=forms-branding-control"
          target="_blank"
          rel="noopener nofollow"
        >
          Create your own free forms with HubSpot
        </a>
      </p>
    </form>
  );
};

export default HubSpotStyledForm;
