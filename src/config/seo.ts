/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from "next";
import { siteConfig } from "./site";

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "local guide",
    "tour guide",
    "travel experiences",
    "local tours",
    "authentic experiences",
    "travel guide",
    "city tours",
    "cultural experiences",
  ],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator.twitter,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const getPageMetadata = (
  title: string,
  description?: string,
  image?: string
): Metadata => {
  return {
    title,
    description: description || siteConfig.description,
    openGraph: {
      title,
      description: description || siteConfig.description,
      images: image ? [image] : [siteConfig.ogImage],
    },
    twitter: {
      title,
      description: description || siteConfig.description,
      images: image ? [image] : [siteConfig.ogImage],
    },
  };
};

export const homePageSEO: Metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export const listingsPageSEO: Metadata = getPageMetadata(
  "Explore Tours",
  "Discover unique local experiences with expert guides around the world"
);

export const guidesPageSEO: Metadata = getPageMetadata(
  "Find Guides",
  "Connect with passionate local guides who can show you authentic experiences"
);

export const aboutPageSEO: Metadata = getPageMetadata(
  "About Us",
  "Learn about Echo Guide and our mission to connect travelers with local experts"
);

export const contactPageSEO: Metadata = getPageMetadata(
  "Contact Us",
  "Get in touch with our team. We're here to help with any questions"
);

export const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.company.address,
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: siteConfig.company.phone,
    contactType: "customer support",
    email: siteConfig.company.email,
  },
  sameAs: [
    siteConfig.social.facebook,
    siteConfig.social.twitter,
    siteConfig.social.instagram,
    siteConfig.social.linkedin,
  ],
};

export const generateListingStructuredData = (listing: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: listing.title,
    description: listing.description,
    image: listing.images,
    priceRange: `$${listing.tourFee}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: listing.city,
      addressCountry: listing.country,
    },
    aggregateRating: listing.averageRating
      ? {
          "@type": "AggregateRating",
          ratingValue: listing.averageRating,
          reviewCount: listing.totalReviews,
        }
      : undefined,
  };
};

export const generateGuideStructuredData = (guide: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: guide.name,
    description: guide.bio,
    image: guide.profilePic,
    email: guide.email,
    jobTitle: "Local Guide",
    knowsLanguage: guide.languagesSpoken,
    aggregateRating: guide.averageRating
      ? {
          "@type": "AggregateRating",
          ratingValue: guide.averageRating,
          reviewCount: guide.totalReviews,
        }
      : undefined,
  };
};