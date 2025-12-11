import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import BackButton from "@/src/components/common/BackButton";
import ListingForm from "@/src/components/forms/ListingForm";
import { Listing } from "@/src/types";
import { TOUR_CATEGORIES } from "@/src/constants";

export const metadata: Metadata = {
  title: "Edit Tour | Guide Dashboard",
  description: "Edit your tour listing",
};

const EditListingPage = () => {
  const mockListing: Listing = {
    id: "1",
    guideId: "guide123", 
    title: "Hidden Jazz Bars of New Orleans",
    description: "Experience the authentic jazz culture...",
    itinerary: "Meet at hotel -> Visit Bar 1 -> Visit Bar 2...",
    tourFee: 75,
    duration: 4,
    meetingPoint: "Hotel Lobby",
    maxGroupSize: 8,
    category: [TOUR_CATEGORIES.NIGHTLIFE, TOUR_CATEGORIES.CULTURE], 
    city: "New Orleans",
    country: "USA",
    images: ["/images/placeholder.jpg"],
    status: "active", 
    totalBookings: 0,
    totalReviews: 0,       
    averageRating: 0,
    isActive: true,        
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Edit Tour"
          description="Update your tour listing details"
        >
          <BackButton fallbackUrl="/dashboard/guide/listings" />
        </PageHeader>

        <div className="container px-4 py-8 max-w-3xl">
          <Card>
            <CardContent className="p-8">
              <ListingForm listing={mockListing} />
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditListingPage;
