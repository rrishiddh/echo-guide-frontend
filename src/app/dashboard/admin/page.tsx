'use client';
// import { Metadata } from "next";
import { Users, MapPin, Calendar, DollarSign } from "lucide-react";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import RevenueChart from "@/src/components/dashboard/RevenueChart";
import BookingChart from "@/src/components/dashboard/BookingChart";
import ActivityFeed from "@/src/components/dashboard/ActivityFeed";
import StatsGrid, { StatItem } from "@/src/components/dashboard/StatsGrid";

// export const metadata: Metadata = {
//   title: "Admin Dashboard | Echo Guide",
//   description: "Manage your platform",
// };

const AdminDashboardPage = () => {
const stats: StatItem[] = [
  {
    label: "Total Users",
    value: 1234,
    icon: Users,
    change: 12,
    trend: "up",
    color: "blue",
  },
  {
    label: "Active Listings",
    value: 567,
    icon: MapPin,
    change: 8,
    trend: "up",
    color: "green",
  },
  {
    label: "Total Bookings",
    value: 890,
    icon: Calendar,
    change: 15,
    trend: "up",
    color: "purple",
  },
  {
    label: "Revenue",
    value: 45678,
    icon: DollarSign,
    change: 23,
    trend: "up",
    color: "orange",
    prefix: "$",
  },
];



  const revenueData = [
    { month: "Jan", revenue: 12000, bookings: 45 },
    { month: "Feb", revenue: 15000, bookings: 52 },
    { month: "Mar", revenue: 13500, bookings: 48 },
    { month: "Apr", revenue: 18000, bookings: 65 },
    { month: "May", revenue: 22000, bookings: 78 },
    { month: "Jun", revenue: 25000, bookings: 89 },
  ];

  const bookingData = [
    { status: "Pending", count: 23, color: "#FCD34D" },
    { status: "Confirmed", count: 145, color: "#3B82F6" },
    { status: "Completed", count: 678, color: "#10B981" },
    { status: "Cancelled", count: 44, color: "#EF4444" },
  ];

const activities = [
  {
    id: "1",
    type: "registration" as const,
    user: { name: "John Doe", avatar: "" },
    description: "New user registered as a tourist",
    timestamp: new Date("2025-12-10T10:00:00Z").toISOString(),
  },
  {
    id: "2",
    type: "listing" as const,
    user: { name: "Jane Smith", avatar: "" },
    description: "Created a new tour listing",
    timestamp: new Date("2025-12-10T09:00:00Z").toISOString(),
  },
  {
    id: "3",
    type: "booking" as const,
    user: { name: "Mike Johnson", avatar: "" },
    description: "Booked a tour in Paris",
    timestamp: new Date("2025-12-10T08:00:00Z").toISOString(),
  },
];


  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Admin Dashboard" description="Platform overview and management" />
        
        <div className="container px-4 py-8 space-y-8">
          <StatsGrid stats={stats} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueChart data={revenueData} />
            <BookingChart data={bookingData} />
          </div>

          <ActivityFeed activities={activities} title="Recent Platform Activity" />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;