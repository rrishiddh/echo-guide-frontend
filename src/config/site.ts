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
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/company/",
    youtube: "https://youtube.com/",
  },
  
  links: {
    github: "https://github.com/rrishiddh",
    discord: "https://discord.gg/",
  },
  
  creator: {
    name: "Echo Guide Team",
    twitter: "@rrishiddh",
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
    termsUrl: "/faq",
    privacyUrl: "/faq",
    cookieUrl: "/faq",
  },
} as const;

export type SiteConfig = typeof siteConfig;