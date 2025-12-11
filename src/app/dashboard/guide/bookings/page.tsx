import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock } from "lucide-react";
import BookingList from "@/src/components/bookings/BookingList";

export const metadata: Metadata = {
  title: "Bookings | Guide Dashboard",
  description: "Manage your tour bookings",
};

const GuideBookingsPage = () => {
  const stats = [
    {
      label: "Upcoming Tours",
      value: "5",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Pending Requests",
      value: "3",
      icon: Clock,
      color: "yellow",
    },
    {
      label: "Completed",
      value: "28",
      icon: CheckCircle,
      color: "green",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Bookings"
          description="Manage your tour bookings and requests"
        />

        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <BookingList userRole="guide" />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GuideBookingsPage;