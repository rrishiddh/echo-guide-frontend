"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Clock, Loader2 } from "lucide-react";
import Link from "next/link";
import { Listing } from "@/src/types";
import listingService from "@/src/services/listing.service";
import ListingCard from "../cards/ListingCard";

export const RecentListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadListings();
  }, []);

  const loadListings = async () => {
    try {
      const data = await listingService.getRecentListings(6);
      setListings(data);
    } catch (error) {
      console.error("Failed to load recent listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-6 h-6 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-900">Recently Added</h2>
        </div>
        <Link href="/listings?sort=-createdAt">
          <Button variant="outline">View All</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((listing) => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
