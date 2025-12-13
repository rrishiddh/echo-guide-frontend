import type { Metadata } from "next";
import { Toaster } from "sonner";
import "../globals.css";
import ErrorBoundary from "@/src/components/common/ErrorBoundary";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";


export const metadata: Metadata = {
  title: "Echo Guide - Connect with Local Experts",
  description: "Discover authentic tours and experiences with passionate local guides from around the world.",
  keywords: "tours, guides, travel, local experiences, authentic travel",
  authors: [{ name: "Echo Guide" }],
  creator: "Echo Guide",
  publisher: "Echo Guide",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Echo Guide",
    title: "Echo Guide - Connect with Local Experts",
    description: "Discover authentic tours and experiences with passionate local guides.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Echo Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Guide - Connect with Local Experts",
    description: "Discover authentic tours and experiences with passionate local guides.",
    creator: "@echoguide",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="bg-white text-gray-900">
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-center" />
        </ErrorBoundary>
      </body>
    </html>
  );
};

export default RootLayout;