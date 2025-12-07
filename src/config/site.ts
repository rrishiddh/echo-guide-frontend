export const siteConfig = {
  name: "Echo Guide",
  description: "Connect travelers with passionate local guides for authentic experiences",
  tagline: "Discover Local Experiences with Expert Guides",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  
  company: {
    name: "Echo Guide Inc.",
    address: "123 Travel Street, San Francisco, CA 94102",
    email: "support@echoguide.com",
    phone: "+1 (555) 123-4567",
  },
  
  social: {
    facebook: "https://facebook.com/echoguide",
    twitter: "https://twitter.com/echoguide",
    instagram: "https://instagram.com/echoguide",
    linkedin: "https://linkedin.com/company/echoguide",
    youtube: "https://youtube.com/@echoguide",
  },
  
  links: {
    github: "https://github.com/echoguide",
    discord: "https://discord.gg/echoguide",
  },
  
  creator: {
    name: "Echo Guide Team",
    twitter: "@echoguide",
  },
  
  features: {
    auth: true,
    payments: true,
    reviews: true,
    chat: false,
    notifications: true,
    analytics: true,
    darkMode: true,
  },
  
  contact: {
    supportEmail: "support@echoguide.com",
    salesEmail: "sales@echoguide.com",
    pressEmail: "press@echoguide.com",
  },
  
  legal: {
    termsUrl: "/terms",
    privacyUrl: "/privacy",
    cookieUrl: "/cookies",
  },
} as const;

export type SiteConfig = typeof siteConfig;