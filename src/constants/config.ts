export const APP_CONFIG = {
  name: "Echo Guide",
  description: "Connect travelers with passionate local guides",
  version: "1.0.0",
  author: "Echo Guide Team",

  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",

  apiTimeout: 30000,
  retryAttempts: 3,

  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 36, 48],
  maxPageSize: 100,

  maxFileSize: 5 * 1024 * 1024,
  maxImagesPerListing: 10,
  allowedImageTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp"],

  minPasswordLength: 8,
  maxPasswordLength: 128,
  minReviewLength: 10,
  maxReviewLength: 1000,

  minBookingAdvanceHours: 24,
  maxBookingDuration: 240,

  reviewWindowDays: 30,
  editReviewWindowDays: 7,

  minRating: 1,
  maxRating: 5,

  searchDebounceMs: 500,
  minSearchLength: 2,

  defaultMapZoom: 12,
  defaultMapCenter: { lat: 40.7128, lng: -74.006 },

  dateFormat: "MMM dd, yyyy",
  timeFormat: "HH:mm",
  datetimeFormat: "MMM dd, yyyy HH:mm",

  social: {
    facebook: "https://facebook.com/echoguide",
    twitter: "https://twitter.com/echoguide",
    instagram: "https://instagram.com/echoguide",
    linkedin: "https://linkedin.com/company/echoguide",
  },

  contact: {
    email: "support@echoguide.com",
    phone: "+1 (555) 123-4567",
  },

  features: {
    enableReviews: true,
    enablePayments: true,
    enableChat: false,
    enableNotifications: true,
    enableAnalytics: true,
  },
} as const;

export const CLOUDINARY_CONFIG = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "echo-guide",
  folder: "echo-guide",
};

export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
};




export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
export const IS_TEST = process.env.NODE_ENV === "test";

export const getConfig = () => {
  return {
    ...APP_CONFIG,
    isDevelopment: IS_DEVELOPMENT,
    isProduction: IS_PRODUCTION,
    isTest: IS_TEST,
  };
};