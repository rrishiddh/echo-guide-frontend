
import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import DashboardSidebar from "@/src/components/layout/DashboardSidebar";
import Navbar from "@/src/components/layout/Navbar";
import "../globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Dashboard | Echo Guide",
  description: "Manage your account and bookings",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
                    <Toaster position="top-center" />

        </div>
      </div>
    </ProtectedRoute>
    </body>
    </html>
  );
};

export default DashboardLayout;