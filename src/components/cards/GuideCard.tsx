"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GuideProfile } from "@/src/types";
import { Star, MapPin, MessageSquare, CheckCircle } from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import UserAvatar from "../users/UserAvatar";

interface GuideCardProps {
  guide: GuideProfile;
}

export const GuideCard = ({ guide }: GuideCardProps) => {
  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center mb-4">
            <div className="relative mb-4">
              <UserAvatar user={guide} size="xl" />
              {guide.isVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
              {guide.name}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {guide.averageRating?.toFixed(1) || "5.0"}
              </span>
              <span className="text-sm text-gray-600">
                ({guide.totalReviews || 0} reviews)
              </span>
            </div>
          </div>

          {guide.expertise && guide.expertise.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {guide.expertise.slice(0, 3).map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          )}

          {guide.bio && (
            <p className="text-sm text-gray-600 text-center line-clamp-2 mb-4">
              {guide.bio}
            </p>
          )}

          <div className="space-y-2 text-sm">
            {guide.languagesSpoken && guide.languagesSpoken.length > 0 && (
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{guide.languagesSpoken.slice(0, 2).join(", ")}</span>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <MessageSquare className="w-4 h-4" />
              <span>{guide.totalTours || 0} tours completed</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 mt-4 border-t">
            <div>
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(guide.dailyRate)}
              </span>
              <span className="text-xs text-gray-600"> /day</span>
            </div>
            <Button size="sm" variant="outline">
              View Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GuideCard;
