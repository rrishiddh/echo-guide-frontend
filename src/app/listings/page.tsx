
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/src/components/common/PageHeader";
import ListingGrid from "@/src/components/listings/ListingGrid";
import { Listing, ListingStatus, TourCategory } from "@/src/types";

export const metadata: Metadata = {
  title: "Browse Tours | Echo Guide",
  description: "Explore authentic tours from local guides around the world",
};

const ListingsPage = () => {
 
const mockListings: Listing[] = [
  {
    id: "1",
    title: "Hidden Jazz Bars of New Orleans",
    city: "New Orleans",
    country: "USA",
    tourFee: 75,
    averageRating: 4.8,
    totalReviews: 45,
    totalBookings: 12,
    images: ["/images/placeholder.jpg"],
    category: ["Nightlife"] as TourCategory[],
    description: "Experience the authentic jazz culture...",
    duration: 4,
    maxGroupSize: 8,
    meetingPoint: "Hotel Lobby",
    itinerary: "",
    guide: { id: "1", name: "John Doe", profilePic: "" },

    guideId: "1",
    status: "active" as ListingStatus,
    isActive: true,

    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    title: "Street Food Tour",
    city: "Bangkok",
    country: "Thailand",
    tourFee: 50,
    averageRating: 4.9,
    totalReviews: 78,
    totalBookings: 28,
    images: ["/images/placeholder.jpg"],
    category: ["Food"] as TourCategory[],
    description: "Culinary adventure through local markets...",
    duration: 3,
    maxGroupSize: 10,
    meetingPoint: "Central Station",
    itinerary: "",
    guide: { id: "2", name: "Jane Smith", profilePic: "" },

    guideId: "2",
    status: "active" as ListingStatus, 
    isActive: true,

    createdAt: "",
    updatedAt: "",
  },
];


  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Explore Tours"
        description="Discover authentic experiences from local guides"
      />

      <div className="container px-4 py-8 space-y-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-gray-600">
              Found <span className="font-semibold">200+ tours</span> matching your criteria
            </p>
          </CardContent>
        </Card>

        <ListingGrid listings={mockListings} />
      </div>
    </div>
  );
};

export default ListingsPage;
