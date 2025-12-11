"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import BackButton from "@/src/components/common/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingForm from "@/src/components/forms/BookingForm";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import { Listing } from "@/src/types";

const CreateBookingPage = () => {
  const searchParams = useSearchParams();
  const listingId = searchParams.get("listingId");

  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!listingId) {
      Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    const mockListing: Listing = {
      id: listingId,
      title: "Hidden Jazz Bars of New Orleans",
      description: "Experience the authentic jazz culture...",
      itinerary: "Meet at hotel -> Visit Bar 1 -> Visit Bar 2...",
      tourFee: 75,
      duration: 4,
      meetingPoint: "Hotel Lobby",
      maxGroupSize: 8,
      category: ["Nightlife"],
      city: "New Orleans",
      country: "USA",
      images: ["/images/placeholder.jpg"],

      guideId: "1",
      status: "active",
      isActive: true,

      guide: { id: "1", name: "John Doe", profilePic: "" },

      createdAt: "",
      updatedAt: "",
      averageRating: 4.8,
      totalReviews: 45,
      totalBookings: 12,
    };

    setTimeout(() => {
      setListing(mockListing);
      setIsLoading(false);
    }, 500);
  }, [listingId]);

  if (isLoading) return <LoadingScreen />;

  if (!listing) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
          <PageHeader title="Create Booking">
            <BackButton fallbackUrl="/listings" />
          </PageHeader>

          <div className="container px-4 py-8 max-w-2xl">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-gray-600">
                  Please select a tour to book from our listings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Create Booking"
          description={`Book: ${listing.title}`}
        >
          <BackButton fallbackUrl={`/listings/${listing.id}`} />
        </PageHeader>

        <div className="container px-4 py-8 max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <BookingForm listing={listing} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreateBookingPage;
