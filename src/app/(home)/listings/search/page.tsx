
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutGrid, List } from "lucide-react";
import PageHeader from "@/src/components/common/PageHeader";
import ListingFilters from "@/src/components/listings/ListingFilters";
import ListingGrid from "@/src/components/listings/ListingGrid";
import ListingList from "@/src/components/listings/ListingList";
import { TourCategory, ListingStatus, Listing } from "@/src/types";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState<{
  category: TourCategory[];
  minPrice: number | null;
  maxPrice: number | null;
}>({
  category: [],
  minPrice: null,
  maxPrice: null,
});

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

  const filteredListings = mockListings.filter((listing) => {
    const matchesQuery =
      listing.title.toLowerCase().includes(query.toLowerCase()) ||
      listing.city.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      filters.category.length === 0 ||
      listing.category.some((cat) => filters.category.includes(cat));

    const matchesPrice =
      (!filters.minPrice || listing.tourFee >= filters.minPrice) &&
      (!filters.maxPrice || listing.tourFee <= filters.maxPrice);

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Search Results"
        description={
          query
            ? `Results for "${query}"`
            : "Browse all available tours"
        }
      />

      <div className="container px-4 py-8">
        <div className="mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Found <span className="font-semibold">{filteredListings.length}</span> tours
                </p>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ListingFilters
              filters={filters}
              onFilterChange={setFilters}
            />
          </div>

          <div className="lg:col-span-3">
            {filteredListings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-gray-600 mb-4">
                    No tours found matching your criteria
                  </p>
                  <Button variant="outline">Clear Filters</Button>
                </CardContent>
              </Card>
            ) : viewMode === "grid" ? (
              <ListingGrid listings={filteredListings} />
            ) : (
              <ListingList listings={filteredListings} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;