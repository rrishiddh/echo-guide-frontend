export * from "./roles";
export * from "./categories";

export {
  PAYMENT_STATUS as PAYMENT_STATUS_PAYMENT,
  PAYMENT_STATUS_COLORS as PAYMENT_STATUS_COLORS_PAYMENT,
  PAYMENT_STATUS_LABELS as PAYMENT_STATUS_LABELS_PAYMENT,
} from "./paymentStatus";

export type {
  PaymentStatus as PaymentStatusPayment,
} from "./paymentStatus";
export * from "./apiEndpoints";
export * from "./routes";
export * from "./config";
export * from "./messages";

export const COMMON_CONSTANTS = {
  APP_NAME: "Echo Guide",
  APP_TAGLINE: "Connect with Local Experts",

  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 12,

  TOAST_DURATION: 3000,
  DEBOUNCE_DELAY: 500,

  TOKEN_KEY: "auth_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  USER_KEY: "user_data",
  THEME_KEY: "theme",

  DATE_FORMAT: "MMM dd, yyyy",
  TIME_FORMAT: "HH:mm",

  SOCIAL_LINKS: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
} as const;

export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\d\s\-\+\(\)]+$/,
  URL: /^https?:\/\/.+/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

export const TRANSITION_DEFAULTS = {
  type: "tween",
  duration: 0.3,
  ease: "easeInOut",
} as const;