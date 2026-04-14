import ReactGA from 'react-ga4';

// Replace with your actual Google Analytics 4 Measurement ID
export const GA_TRACKING_ID = 'G-XXXXXXXXXX';

let isInitialized = false;

export const initGA = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    ReactGA.initialize(GA_TRACKING_ID);
    isInitialized = true;
  }
};

export const logPageView = (path) => {
  if (isInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const logEvent = ({ category, action, label }) => {
  if (isInitialized) {
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }
};
