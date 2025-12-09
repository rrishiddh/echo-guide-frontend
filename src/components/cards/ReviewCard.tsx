"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Review } from "@/src/types";
import { Star } from "lucide-react";
import { getTimeAgo } from "@/src/utils/formatDate";
import { getInitials } from "@/src/utils/helpers";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage
              src={review.tourist?.profilePic}
              alt={review.tourist?.name}
            />
            <AvatarFallback className="bg-blue-500 text-white">
              {getInitials(review.tourist?.name || "User")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900">
                    {review.tourist?.name || "Anonymous"}
                  </h4>
                  {review.isVerified && (
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">
                    {getTimeAgo(review.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">{review.comment}</p>

            {(review.guideRating ||
              review.communicationRating ||
              review.valueRating ||
              review.experienceRating) && (
              <div className="flex flex-wrap gap-3 pt-2 text-xs text-gray-600">
                {review.guideRating && (
                  <div className="flex items-center gap-1">
                    <span>Guide:</span>
                    {renderStars(review.guideRating)}
                  </div>
                )}
                {review.communicationRating && (
                  <div className="flex items-center gap-1">
                    <span>Communication:</span>
                    {renderStars(review.communicationRating)}
                  </div>
                )}
                {review.valueRating && (
                  <div className="flex items-center gap-1">
                    <span>Value:</span>
                    {renderStars(review.valueRating)}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;