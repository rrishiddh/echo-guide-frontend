
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import LeaveReview from "@/src/components/reviews/LeaveReview";

interface Booking {
  id: string;
  listing: {
    id: string;
    title: string;
  };
  guide: {
    id: string;
    name: string;
    profilePic: string;
  };
  bookingDate: string;
  status: string;
}

const ReviewPage = () => {
  const params = useParams();
  const bookingId = params.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockBooking: Booking = {
      id: bookingId,
      listing: {
        id: "1",
        title: "Hidden Jazz Bars of New Orleans",
      },
      guide: {
        id: "1",
        name: "John Doe",
        profilePic: "/images/user-placeholder.png",
      },
      bookingDate: new Date(Date.now() - 86400000).toISOString(),
      status: "completed",
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

  if (booking?.status !== "completed") {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">
                You can only review completed bookings.
              </p>
            </CardContent>
          </Card>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Leave a Review"
          description={`Review: ${booking?.listing.title}`}
        >
          <BackButton fallbackUrl="/dashboard/tourist/reviews" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-2xl">
          <LeaveReview
            bookingId={booking?.id}
            listingId={booking?.listing.id}
            listingTitle={booking?.listing.title}
            onSuccess={() => {
              window.location.href = "/dashboard/tourist/reviews";
            }}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ReviewPage;