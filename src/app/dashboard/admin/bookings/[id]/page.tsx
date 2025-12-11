"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import BackButton from "@/src/components/common/BackButton";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import BookingDetail from "@/src/components/bookings/BookingDetail";
import { useBookings } from "@/src/hooks/useBookings";

const AdminBookingDetailPage = () => {
  const params = useParams();
  const bookingId = params.id as string;
  const { booking, fetchBooking, isLoading } = useBookings();

  useEffect(() => {
    if (bookingId) {
      fetchBooking(bookingId);
    }
  }, [bookingId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Booking not found</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Booking Details">
          <BackButton fallbackUrl="/dashboard/admin/bookings" />
        </PageHeader>
        
        <div className="container px-4 py-8">
          <BookingDetail booking={booking} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminBookingDetailPage;