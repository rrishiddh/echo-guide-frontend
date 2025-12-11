"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Listing } from "@/src/types";
import { Star, MapPin, Clock, Users, Heart } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/src/utils/formatPrice";

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const imageSrc = listing.images?.[0] ?? "/images/placeholder.jpg";
  const altText = listing.title ?? "Listing image";
  const tourFee = listing.tourFee ?? 0;
  const averageRating = listing.averageRating?.toFixed(1) ?? "5.0";
  const totalReviews = listing.totalReviews ?? 0;
  const categoryLabel = listing.category?.[0];

  return (
    <Link href={`/listings/${listing.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-0">
          {/* Image Section */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {categoryLabel && (
              <Badge className="absolute top-4 left-4 bg-white text-gray-900">
                {categoryLabel}
              </Badge>
            )}
            <button
              onClick={toggleWishlist}
              className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Content Section */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors flex-1">
                {listing.title}
              </h3>
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{averageRating}</span>
              <span className="text-sm text-gray-600">({totalReviews})</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="truncate">
                {listing.city}, {listing.country}
              </span>
            </div>

            {/* Duration & Group Size */}
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{listing.duration ?? 0}h</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>Max {listing.maxGroupSize ?? 0}</span>
              </div>
            </div>

            {/* Footer: Price & Button */}
            <div className="flex items-center justify-between pt-3 border-t">
              <div>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(tourFee)}
                </span>
                <span className="text-sm text-gray-600"> / person</span>
              </div>
              <Button size="sm" variant="outline">
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ListingCard;
