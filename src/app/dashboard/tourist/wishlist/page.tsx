import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent,  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart,  } from "lucide-react";
import ListingCard from "@/src/components/cards/ListingCard";
import { Listing } from "@/src/types";

export const metadata: Metadata = {
  title: "Wishlist | Tourist Dashboard",
  description: "Your saved tour listings",
};

const TouristWishlistPage = () => {
const wishlistItems: Listing[] = [
  {
    id: "1",
    title: "Hidden Jazz Bars of New Orleans",
    city: "New Orleans",
    country: "USA",
    tourFee: 75,
    images: ["/images/placeholder.jpg"],
    category: ["Nightlife"],
    description: "Experience the authentic jazz culture...",
    duration: 4,
    maxGroupSize: 8,
    meetingPoint: "Hotel Lobby",
    itinerary: "",
    guideId: "1",
    guide: { id: "1", name: "John Doe", profilePic: "" },
    createdAt: "",
    updatedAt: "",
    averageRating: 4.8,
    totalReviews: 45,
    totalBookings: 12,
    isActive: true,
    status: "active",
  },
  {
    id: "2",
    title: "Street Food Tour",
    city: "Bangkok",
    country: "Thailand",
    tourFee: 50,
    images: ["/images/placeholder.jpg"],
    category: ["Food"],
    description: "Culinary adventure through local markets...",
    duration: 3,
    maxGroupSize: 10,
    meetingPoint: "Central Station",
    itinerary: "",
    guideId: "2",
    guide: { id: "2", name: "Jane Smith", profilePic: "" },
    createdAt: "",
    updatedAt: "",
    averageRating: 4.9,
    totalReviews: 78,
    totalBookings: 28,
    isActive: true,
    status: "active",
  },
];



  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Wishlist"
          description="Your saved tour listings"
        />

        <div className="container px-4 py-8">
          {wishlistItems.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Start adding tours to your wishlist to save them for later.
                </p>
                <Button>Explore Tours</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((listing) => (
                <div key={listing.id} className="relative">
                  <ListingCard listing={listing} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 right-4 bg-white hover:bg-gray-100 rounded-full"
                  >
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TouristWishlistPage;