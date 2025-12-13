import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import BookingList from "@/src/components/bookings/BookingList";

export const metadata: Metadata = {
  title: "Bookings | Echo Guide",
  description: "View and manage your bookings",
};

const BookingsPage = () => {
  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Bookings"
          description="View and manage all your tour bookings"
        >
          <Link href="/bookings/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </Link>
        </PageHeader>

        <div className="container px-4 py-8">
          <BookingList userRole="tourist" />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookingsPage;