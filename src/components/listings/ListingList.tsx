"use client";

import { Listing } from "@/src/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/src/utils/formatPrice";

interface ListingListProps {
  listings: Listing[];
  isLoading?: boolean;
}

export const ListingList = ({ listings, isLoading }: ListingListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-48"></div>
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
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="relative w-full md:w-80 h-64 md:h-auto flex-shrink-0">
                <Image
                  src={listing.images[0] || "/images/placeholder.jpg"}
                  alt={listing.title}
                  fill
                  className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
                {listing.category && listing.category.length > 0 && (
                  <Badge className="absolute top-4 left-4">
                    {listing.category[0]}
                  </Badge>
                )}
              </div>

              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <Link href={`/listings/${listing.id}`}>
                      <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                        {listing.title}
                      </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>
                        {listing.city}, {listing.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {listing.averageRating?.toFixed(1) || "5.0"}
                      </span>
                      <span className="text-gray-600">
                        ({listing.totalReviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 line-clamp-2 mb-4">
                  {listing.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{listing.duration}h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Max {listing.maxGroupSize} people</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(listing.tourFee)}
                    </span>
                    <span className="text-gray-600"> / person</span>
                  </div>
                  <Link href={`/listings/${listing.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ListingList;