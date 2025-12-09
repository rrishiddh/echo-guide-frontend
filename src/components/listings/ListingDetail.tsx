"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Listing } from "@/src/types";
import { Star, MapPin, Clock, Users, Award } from "lucide-react";
// import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import UserAvatar from "../users/UserAvatar";
import ListingSidebar from "./ListingSidebar";
import ListingReviews from "./ListingReviews";
import ListingInfo from "./ListingInfo";
import ListingGallery from "./ListingGallery";

interface ListingDetailProps {
  listing: Listing;
}

export const ListingDetail = ({ listing }: ListingDetailProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          {listing.category?.map((cat) => (
            <Badge key={cat} variant="secondary">
              {cat}
            </Badge>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{listing.title}</h1>
        <div className="flex flex-wrap items-center gap-6 text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">
              {listing.averageRating?.toFixed(1) || "5.0"}
            </span>
            <span>({listing.totalReviews || 0} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <span>
              {listing.city}, {listing.country}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>{listing.totalBookings || 0} bookings</span>
          </div>
        </div>
      </div>

      <ListingGallery images={listing.images} title={listing.title} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <Link href={`/guides/${listing.guide?.id}`}>
                  <UserAvatar user={listing.guide!} size="lg" showBadge />
                </Link>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Hosted by {listing.guide?.name}
                  </h3>
                  <p className="text-sm text-gray-600">Professional Guide</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {listing.duration} hours
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Group Size</p>
                    <p className="font-semibold text-gray-900">
                      Max {listing.maxGroupSize}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600">Meeting Point</p>
                    <p className="font-semibold text-gray-900">Provided</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <ListingInfo listing={listing} />
            </TabsContent>

            <TabsContent value="itinerary">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Tour Itinerary
                  </h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {listing.itinerary}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <ListingReviews listingId={listing.id} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <ListingSidebar listing={listing} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;