export const PUBLIC_ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  HOW_IT_WORKS: "/how-it-works",
  BECOME_GUIDE: "/become-guide",
  FAQ: "/faq",
  LISTINGS: "/listings",
  LISTING_DETAIL: (id: string) => `/listings/${id}`,
  GUIDES: "/guides",
  GUIDE_PROFILE: (id: string) => `/guides/${id}`,
  SEARCH: "/listings/search",
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  RESET_PASSWORD: "/auth/reset-password",
} as const;

export const PROTECTED_ROUTES = {
  PROFILE: "/profile",
  SETTINGS: "/profile/settings",
  CHANGE_PASSWORD: "/profile/change-password",
  PREFERENCES: "/profile/preferences",
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,
  CREATE_BOOKING: "/bookings/create",
  REVIEW: (bookingId: string) => `/reviews/${bookingId}`,
} as const;

export const DASHBOARD_ROUTES = {
  BASE: "/dashboard",

  TOURIST: "/dashboard/tourist",
  TOURIST_BOOKINGS: "/dashboard/tourist/bookings",
  TOURIST_REVIEWS: "/dashboard/tourist/reviews",
  TOURIST_WISHLIST: "/dashboard/tourist/wishlist",

  GUIDE: "/dashboard/guide",
  GUIDE_LISTINGS: "/dashboard/guide/listings",
  GUIDE_CREATE_LISTING: "/dashboard/guide/listings/create",
  GUIDE_EDIT_LISTING: (id: string) => `/dashboard/guide/listings/${id}/edit`,
  GUIDE_BOOKINGS: "/dashboard/guide/bookings",
  GUIDE_EARNINGS: "/dashboard/guide/earnings",
  GUIDE_REVIEWS: "/dashboard/guide/reviews",
  GUIDE_ANALYTICS: "/dashboard/guide/analytics",

  ADMIN: "/dashboard/admin",
  ADMIN_USERS: "/dashboard/admin/users",
  ADMIN_USER_DETAIL: (id: string) => `/dashboard/admin/users/${id}`,
  ADMIN_GUIDES: "/dashboard/admin/guides",
  ADMIN_LISTINGS: "/dashboard/admin/listings",
  ADMIN_LISTING_DETAIL: (id: string) => `/dashboard/admin/listings/${id}`,
  ADMIN_BOOKINGS: "/dashboard/admin/bookings",
  ADMIN_BOOKING_DETAIL: (id: string) => `/dashboard/admin/bookings/${id}`,
  ADMIN_PAYMENTS: "/dashboard/admin/payments",
  ADMIN_REVIEWS: "/dashboard/admin/reviews",
  ADMIN_ANALYTICS: "/dashboard/admin/analytics",
  ADMIN_REPORTS: "/dashboard/admin/reports",
  ADMIN_SETTINGS: "/dashboard/admin/settings",
} as const;

export const PAYMENT_ROUTES = {
  CHECKOUT: "/payments/checkout",
  SUCCESS: "/payments/success",
  CANCEL: "/payments/cancel",
  FAILED: "/payments/failed",
} as const;

export const NAV_ITEMS = [
  { label: "Home", href: PUBLIC_ROUTES.HOME },
  { label: "Explore Tours", href: PUBLIC_ROUTES.LISTINGS },
  { label: "Find Guides", href: PUBLIC_ROUTES.GUIDES },
  { label: "How It Works", href: PUBLIC_ROUTES.HOW_IT_WORKS },
  { label: "Become a Guide", href: PUBLIC_ROUTES.BECOME_GUIDE },
] as const;

export const FOOTER_NAV = {
  company: [
    { label: "About Us", href: PUBLIC_ROUTES.ABOUT },
    { label: "How It Works", href: PUBLIC_ROUTES.HOW_IT_WORKS },
    { label: "Become a Guide", href: PUBLIC_ROUTES.BECOME_GUIDE },
    { label: "Contact", href: PUBLIC_ROUTES.CONTACT },
  ],
  support: [
    { label: "FAQ", href: PUBLIC_ROUTES.FAQ },
    { label: "Help Center", href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
  discover: [
    { label: "Popular Tours", href: `${PUBLIC_ROUTES.LISTINGS}?sort=popular` },
    { label: "Top Guides", href: `${PUBLIC_ROUTES.GUIDES}?sort=rating` },
    { label: "Featured Experiences", href: `${PUBLIC_ROUTES.LISTINGS}?featured=true` },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = Object.values(PUBLIC_ROUTES).filter(
    (route) => typeof route === "string"
  );
  return publicPaths.some((path) => pathname.startsWith(path as string));
};

export const isAuthRoute = (pathname: string): boolean => {
  return Object.values(AUTH_ROUTES).some((route) => pathname.startsWith(route));
};

export const isProtectedRoute = (pathname: string): boolean => {
  return pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/bookings");
};

export const ROUTES = {
  PUBLIC: PUBLIC_ROUTES,
  AUTH: AUTH_ROUTES,
  PROTECTED: PROTECTED_ROUTES,
  DASHBOARD: DASHBOARD_ROUTES,
  PAYMENT: PAYMENT_ROUTES,
} as const;