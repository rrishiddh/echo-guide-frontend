"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import BackButton from "@/src/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import BookingDetail from "@/src/components/bookings/BookingDetail";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import { bookingService } from "@/src/services/booking.service";
import { Booking } from "@/src/types";

const BookingDetailPage = () => {
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!bookingId) {
      setError("Booking ID is missing");
      setIsLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const data = await bookingService.getBooking(bookingId);
        setBooking(data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
        setError("Failed to load booking details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error || !booking) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">{error || "Booking not found"}</p>
              <BackButton fallbackUrl="/bookings" />
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Booking Details" description={booking.listing?.title}>
          <BackButton fallbackUrl="/bookings" />
        </PageHeader>

        <div className="container px-4 py-8">
          <BookingDetail booking={booking} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookingDetailPage;
