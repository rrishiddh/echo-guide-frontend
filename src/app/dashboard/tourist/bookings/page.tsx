
import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingList from "@/src/components/bookings/BookingList";

export const metadata: Metadata = {
  title: "My Bookings | Tourist Dashboard",
  description: "View and manage your tour bookings",
};

const TouristBookingsPage = () => {
  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Bookings"
          description="View and manage your tour bookings"
        />

        <div className="container px-4 py-8">
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <BookingList userRole="tourist" />
            </TabsContent>

            <TabsContent value="upcoming">
              <BookingList userRole="tourist" statusFilter="confirmed" />
            </TabsContent>

            <TabsContent value="completed">
              <BookingList userRole="tourist" statusFilter="completed" />
            </TabsContent>

            <TabsContent value="cancelled">
              <BookingList userRole="tourist" statusFilter="cancelled" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TouristBookingsPage;