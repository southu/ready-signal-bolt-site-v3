import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

// Automated browsers (Playwright/Selenium set navigator.webdriver) abort
// tracking beacons, which surfaces as failed network requests on page load —
// and bot traffic shouldn't be counted anyway.
const isAutomatedBrowser = typeof navigator !== 'undefined' && navigator.webdriver;

export const initGA = () => {
  if (isAutomatedBrowser) return;
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('Google Analytics initialized with ID:', GA_MEASUREMENT_ID);
  } else {
    console.warn('Google Analytics Measurement ID not found');
  }
};

export const logPageView = (path: string) => {
  if (GA_MEASUREMENT_ID && !isAutomatedBrowser) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const logEvent = (category: string, action: string, label?: string) => {
  if (GA_MEASUREMENT_ID && !isAutomatedBrowser) {
    ReactGA.event({
      category,
      action,
      label,
    });
  }
};
