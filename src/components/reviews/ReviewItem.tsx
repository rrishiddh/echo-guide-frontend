"use client";

import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, Flag } from "lucide-react";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import reviewService from "@/src/services/review.service";
import { getTimeAgo } from "@/src/utils/formatDate";
import { getInitials } from "@/src/utils/helpers";
import { Review } from "@/src/types";

interface ReviewItemProps {
  review: Review;
  showActions?: boolean;
}

export const ReviewItem = ({ review, showActions = true }: ReviewItemProps) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [reportReason, setReportReason] = useState("");
  const [isReporting, setIsReporting] = useState(false);

  const handleMarkHelpful = async () => {
    try {
      await reviewService.markReviewHelpful(review.id, { helpful: !isHelpful });
      setIsHelpful(!isHelpful);
      setHelpfulCount(isHelpful ? helpfulCount - 1 : helpfulCount + 1);
      toast.success(isHelpful ? "Removed helpful mark" : "Marked as helpful");
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleReport = async () => {
    if (!reportReason.trim()) {
      toast.error("Please provide a reason");
      return;
    }

    setIsReporting(true);
    try {
      await reviewService.reportReview(review.id, { reason: reportReason });
      toast.success("Review reported successfully");
      setReportReason("");
    } catch (error) {
      toast.error("Failed to report review");
    } finally {
      setIsReporting(false);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-6 border-b last:border-b-0">
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

        <div className="flex-1 space-y-3">
          <div className="flex items-start justify-between gap-4">
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
                {review.isEdited && (
                  <span className="text-xs text-gray-500">(Edited)</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                {renderStars(review.rating)}
                <span className="text-sm text-gray-500">
                  {getTimeAgo(review.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {review.comment}
          </p>

          {(review.guideRating ||
            review.communicationRating ||
            review.valueRating ||
            review.experienceRating) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {review.guideRating && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Guide:</span>
                  {renderStars(review.guideRating)}
                </div>
              )}
              {review.communicationRating && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Communication:</span>
                  {renderStars(review.communicationRating)}
                </div>
              )}
              {review.valueRating && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Value:</span>
                  {renderStars(review.valueRating)}
                </div>
              )}
              {review.experienceRating && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Experience:</span>
                  {renderStars(review.experienceRating)}
                </div>
              )}
            </div>
          )}

          {showActions && (
            <div className="flex items-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkHelpful}
                className={isHelpful ? "text-blue-600" : ""}
              >
                <ThumbsUp
                  className={`w-4 h-4 mr-1 ${isHelpful ? "fill-current" : ""}`}
                />
                Helpful ({helpfulCount})
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Flag className="w-4 h-4 mr-1" />
                    Report
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Report Review</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please provide a reason for reporting this review. Our team
                      will review it shortly.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Why are you reporting this review?"
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    rows={4}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleReport}
                      disabled={isReporting}
                    >
                      {isReporting ? "Reporting..." : "Submit Report"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;