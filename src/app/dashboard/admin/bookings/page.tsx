import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import BookingList from "@/src/components/bookings/BookingList";

export const metadata: Metadata = {
  title: "Manage Bookings | Admin Dashboard",
  description: "Manage all platform bookings",
};

const AdminBookingsPage = () => {
  const stats = [
    { label: "Total Bookings", value: "890", icon: Calendar, color: "blue" },
    { label: "Confirmed", value: "678", icon: CheckCircle, color: "green" },
    { label: "Pending", value: "145", icon: Clock, color: "yellow" },
    { label: "Cancelled", value: "67", icon: XCircle, color: "red" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Bookings" 
          description="View and manage all platform bookings"
        />
        
        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

          <BookingList userRole="admin" />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminBookingsPage;