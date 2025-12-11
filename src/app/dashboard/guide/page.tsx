'use client';
// import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { MapPin, Calendar, Star, DollarSign } from "lucide-react";
import StatsGrid from "@/src/components/dashboard/StatsGrid";
import RevenueChart from "@/src/components/dashboard/RevenueChart";
import RecentActivity from "@/src/components/dashboard/RecentActivity";
import QuickActions from "@/src/components/dashboard/QuickActions";
import UpcomingBookings from "@/src/components/bookings/UpcomingBookings";

// export const metadata: Metadata = {
//   title: "Guide Dashboard | Echo Guide",
//   description: "Manage your tours and bookings",
// };

const GuideDashboardPage = () => {
const stats = [
  {
    label: "Active Listings",
    value: 8,
    icon: MapPin,
    trend: "up" as const,
    color: "blue" as const,
  },
  {
    label: "Total Bookings",
    value: 56,
    icon: Calendar,
    trend: "up" as const,
    color: "green" as const,
  },
  {
    label: "Average Rating",
    value: 4.8,
    icon: Star,
    trend: "up" as const,
    color: "yellow" as const,
    suffix: "/5",
    decimals: 1,
  },
  {
    label: "This Month Earnings",
    value: 2450,
    icon: DollarSign,
    trend: "up" as const,
    color: "orange" as const,
    prefix: "$",
  },
];


  const revenueData = [
    { month: "Jan", revenue: 1500, bookings: 12 },
    { month: "Feb", revenue: 1800, bookings: 14 },
    { month: "Mar", revenue: 2200, bookings: 18 },
    { month: "Apr", revenue: 2100, bookings: 17 },
    { month: "May", revenue: 2450, bookings: 20 },
    { month: "Jun", revenue: 2680, bookings: 22 },
  ];

  const quickActions = [
    {
      title: "Create New Tour",
      description: "List a new tour experience",
      href: "/dashboard/guide/listings/create",
      icon: MapPin,
    },
    {
      title: "View Bookings",
      description: "Manage upcoming bookings",
      href: "/dashboard/guide/bookings",
      icon: Calendar,
    },
    {
      title: "Edit Profile",
      description: "Update your guide profile",
      href: "/profile",
      icon: "user",
    },
    {
      title: "View Earnings",
      description: "Check your earnings & payouts",
      href: "/dashboard/guide/earnings",
      icon: DollarSign,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Guide Dashboard"
          description="Manage your tours and bookings"
        />

        <div className="container px-4 py-8 space-y-8">
          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            <QuickActions role="guide" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UpcomingBookings />
            <RecentActivity
              bookings={[]}
              userRole="guide"
              title="Recent Bookings"
            />{" "}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GuideDashboardPage;
