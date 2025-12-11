"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import ListingDetail from "@/src/components/listings/ListingDetail";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import { Listing } from "@/src/types";

const ListingDetailPage = () => {
  const params = useParams();
  const listingId = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockListing: Listing = {
      id: listingId,
      title: "Hidden Jazz Bars of New Orleans",
      description: "Experience the authentic jazz culture of New Orleans...",
      itinerary: "6:00 PM - Meet at hotel lobby\n6:30 PM - First jazz bar ...",
      tourFee: 75,
      duration: 4,
      maxGroupSize: 8,
      meetingPoint: "Hotel Lobby, 123 Main Street, New Orleans",
      category: ["Nightlife", "Food"],
      city: "New Orleans",
      country: "USA",
      images: ["/images/placeholder.jpg", "/images/placeholder.jpg"],

      guideId: "1",
      guide: {
        id: "1",
        name: "John Doe",
        profilePic: "/images/user-placeholder.png",
        bio: "Passionate about jazz and sharing my city's culture",
        languagesSpoken: ["English", "French"],
        expertise: ["Nightlife", "Music", "History"],
        dailyRate: 75,
        isVerified: true,
      },

      status: "active",
      isActive: true,

      averageRating: 4.8,
      totalReviews: 45,
      totalBookings: 12,
      createdAt: "2024-01-15",
      updatedAt: "2024-06-15",
    };

    setTimeout(() => {
      setListing(mockListing);
      setIsLoading(false);
    }, 800);
  }, [listingId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Tour Not Found">
          <BackButton fallbackUrl="/listings" />
        </PageHeader>

        <div className="container px-4 py-8 flex items-center justify-center min-h-96">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">
                The tour you&apos;re looking for doesn&apos;t exist.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={listing.title}
        description={`${listing.city}, ${listing.country}`}
      >
        <BackButton fallbackUrl="/listings" />
      </PageHeader>

      <div className="container px-4 py-8">
        <ListingDetail listing={listing} />
      </div>
    </div>
  );
};

export default ListingDetailPage;
