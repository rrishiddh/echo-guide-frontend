
import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import DashboardSidebar from "@/src/components/layout/DashboardSidebar";
import Navbar from "@/src/components/layout/Navbar";

export const metadata: Metadata = {
  title: "Dashboard | Echo Guide",
  description: "Manage your account and bookings",
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardLayout;