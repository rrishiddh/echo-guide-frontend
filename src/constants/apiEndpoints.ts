export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const API_VERSION = "v1";

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh-token",
  ME: "/auth/me",
  CHANGE_PASSWORD: "/auth/change-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
} as const;

export const USER_ENDPOINTS = {
  PROFILE: "/users",
  UPDATE_PROFILE: (id: string) => `/users/${id}`,
  DELETE_ACCOUNT: (id: string) => `/users/${id}`,
  GET_USER: (id: string) => `/users/${id}`,
  GUIDES: "/users/guides",
  GUIDES_SEARCH: "/users/guides/search",
  STATS: "/users/stats",
  TOGGLE_STATUS: (id: string) => `/users/${id}/status`,
  VERIFY: (id: string) => `/users/${id}/verify`,
  CHANGE_ROLE: (id: string) => `/users/${id}/role`,
} as const;

export const LISTING_ENDPOINTS = {
  ALL: "/listings",
  SEARCH: "/listings/search",
  FEATURED: "/listings/featured",
  POPULAR: "/listings/popular",
  RECENT: "/listings/recent",
  BY_GUIDE: (guideId: string) => `/listings/guide/${guideId}`,
  DETAIL: (id: string) => `/listings/${id}`,
  CREATE: "/listings",
  UPDATE: (id: string) => `/listings/${id}`,
  DELETE: (id: string) => `/listings/${id}`,
  STATS: "/listings/admin/stats",
} as const;

export const BOOKING_ENDPOINTS = {
  ALL: "/bookings",
  MY_BOOKINGS: "/bookings/my-bookings",
  UPCOMING: "/bookings/upcoming",
  PAST: "/bookings/past",
  CREATE: "/bookings",
  DETAIL: (id: string) => `/bookings/${id}`,
  UPDATE_STATUS: (id: string) => `/bookings/${id}/status`,
  CANCEL: (id: string) => `/bookings/${id}/cancel`,
  COMPLETE: (id: string) => `/bookings/${id}/complete`,
  EARNINGS: "/bookings/earnings",
  STATS: "/bookings/admin/stats",
} as const;

export const REVIEW_ENDPOINTS = {
  ALL: "/reviews",
  MY_REVIEWS: "/reviews/my-reviews",
  BY_LISTING: (listingId: string) => `/reviews/listing/${listingId}`,
  BY_GUIDE: (guideId: string) => `/reviews/guide/${guideId}`,
  GUIDE_SUMMARY: (guideId: string) => `/reviews/guide/${guideId}/summary`,
  CREATE: "/reviews",
  DETAIL: (id: string) => `/reviews/${id}`,
  UPDATE: (id: string) => `/reviews/${id}`,
  DELETE: (id: string) => `/reviews/${id}`,
  HELPFUL: (id: string) => `/reviews/${id}/helpful`,
  REPORT: (id: string) => `/reviews/${id}/report`,
  VISIBILITY: (id: string) => `/reviews/${id}/visibility`,
  STATS: "/reviews/admin/stats",
} as const;

export const PAYMENT_ENDPOINTS = {
  ALL: "/payments",
  MY_PAYMENTS: "/payments/my-payments",
  CREATE_INTENT: "/payments/create-intent",
  CONFIRM: "/payments/confirm",
  DETAIL: (id: string) => `/payments/${id}`,
  REFUND: (id: string) => `/payments/${id}/refund`,
  EARNINGS: "/payments/earnings",
  WEBHOOK: "/payments/webhook",
  STATS: "/payments/admin/stats",
} as const;

export const ADMIN_ENDPOINTS = {
  DASHBOARD: "/admin/dashboard",
  ANALYTICS: "/admin/analytics",
  BULK_UPDATE_USERS: "/admin/users/bulk-update",
  BULK_UPDATE_LISTINGS: "/admin/listings/bulk-update",
  HEALTH: "/admin/health",
  REPORTED_CONTENT: "/admin/reported-content",
  REPORTS: (type: string) => `/admin/reports/${type}`,
} as const;

export const UPLOAD_ENDPOINTS = {
  IMAGE: "/upload/image",
  IMAGES: "/upload/images",
  DELETE: "/upload/delete",
} as const;

export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  USER: USER_ENDPOINTS,
  LISTING: LISTING_ENDPOINTS,
  BOOKING: BOOKING_ENDPOINTS,
  REVIEW: REVIEW_ENDPOINTS,
  PAYMENT: PAYMENT_ENDPOINTS,
  ADMIN: ADMIN_ENDPOINTS,
  UPLOAD: UPLOAD_ENDPOINTS,
} as const;