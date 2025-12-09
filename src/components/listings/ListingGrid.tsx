"use client";

import { Listing } from "@/src/types";
import StaggerChildren, { StaggerItem } from "../animations/StaggerChildren";
import ListingCard from "../cards/ListingCard";

interface ListingGridProps {
  listings: Listing[];
  isLoading?: boolean;
}

export const ListingGrid = ({ listings, isLoading }: ListingGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No listings found</p>
      </div>
    );
  }

  return (
    <StaggerChildren staggerDelay={0.1}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <StaggerItem key={listing.id}>
            <ListingCard listing={listing} />
          </StaggerItem>
        ))}
      </div>
    </StaggerChildren>
  );
};

export default ListingGrid;