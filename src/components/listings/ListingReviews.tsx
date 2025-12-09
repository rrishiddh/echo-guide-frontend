"use client";


import { useState, useEffect } from "react";
import { GuideReviewSummary } from "@/src/types";
import reviewService from "@/src/services/review.service";
import ReviewStats from "../reviews/ReviewStats";
import ReviewList from "../reviews/ReviewList";

interface ListingReviewsProps {
  listingId: string;
}

export const ListingReviews = ({ listingId }: ListingReviewsProps) => {
  const [reviewStats, setReviewStats] = useState<GuideReviewSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReviewStats();
  }, [listingId]);

  const loadReviewStats = async () => {
    try {
      const response = await reviewService.getReviewsByListing(listingId, {
        limit: 1,
      });
      if (response.meta) {
        setReviewStats({
          totalReviews: response.meta.total,
          averageRating: response.meta.averageRating,
          averageGuideRating: 0,
          averageCommunicationRating: 0,
          averageValueRating: 0,
          averageExperienceRating: 0,
          ratingDistribution: response.meta.ratingDistribution || [],
          recentReviews: [],
        });
      }
    } catch (error) {
      console.error("Failed to load review stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        {reviewStats && (
          <ReviewStats
            averageRating={reviewStats.averageRating}
            totalReviews={reviewStats.totalReviews}
            ratingDistribution={reviewStats.ratingDistribution}
          />
        )}
      </div>
      <div className="lg:col-span-2">
        <ReviewList listingId={listingId} showFilters={true} />
      </div>
    </div>
  );
};

export default ListingReviews;