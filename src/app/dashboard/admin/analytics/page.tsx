import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, DollarSign } from "lucide-react";
import BookingChart from "@/src/components/dashboard/BookingChart";
import RevenueChart from "@/src/components/dashboard/RevenueChart";

export const metadata: Metadata = {
  title: "Analytics | Admin Dashboard",
  description: "Platform analytics and insights",
};

const AdminAnalyticsPage = () => {
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

  const keyMetrics = [
    { label: "User Growth", value: "+23%", icon: Users, trend: "up" },
    { label: "Active Listings", value: "+15%", icon: MapPin, trend: "up" },
    { label: "Revenue Growth", value: "+31%", icon: DollarSign, trend: "up" },
    { label: "Booking Rate", value: "+12%", icon: TrendingUp, trend: "up" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Analytics" 
          description="Platform performance and insights"
        />
        
        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric) => (
              <Card key={metric.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <metric.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueChart data={revenueData} title="Revenue Trend" />
            <BookingChart data={bookingData} title="Bookings by Status" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["Food Tours", "Historical Tours", "Adventure Tours", "Cultural Tours"].map(
                  (category, index) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="text-gray-900">{category}</span>
                      <div className="flex items-center gap-4">
                        <div className="w-48 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${90 - index * 15}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {90 - index * 15}%
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminAnalyticsPage;