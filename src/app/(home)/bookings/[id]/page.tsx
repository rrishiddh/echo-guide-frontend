"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import BackButton from "@/src/components/common/BackButton";
import { Card, CardContent } from "@/components/ui/card";
import BookingDetail from "@/src/components/bookings/BookingDetail";
import LoadingScreen from "@/src/components/common/LoadingScreen";

import { Booking } from "@/src/types";

const BookingDetailPage = () => {
  const params = useParams();
  const bookingId = params.id as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockBooking: Booking = {
      id: bookingId,

      touristId: "user-123",
      guideId: "1",
      listingId: "1",

      listing: {
        id: "1",
        title: "Hidden Jazz Bars of New Orleans",
        meetingPoint: "Hotel Lobby, 123 Main St",
      },
      guide: {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        profilePic: "/images/user-placeholder.png",
      },
      tourist: {
        id: "user-123",
        name: "Jane Smith",
        email: "jane@example.com",
      },

      bookingDate: new Date(Date.now() + 86400000).toISOString(),
      startTime: "19:00",
      endTime: "23:00",
      numberOfPeople: 2,
      totalPrice: 150,
      specialRequests: "We would love to visit jazz clubs with live music.",
      status: "confirmed",
      paymentStatus: "paid",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setBooking(mockBooking);
      setIsLoading(false);
    }, 500);
  }, [bookingId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!booking) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">Booking not found</p>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Booking Details" description={booking.listing.title}>
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
