"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MessageSquare } from "lucide-react";
import { ReviewQuery } from "@/src/types";
import { usePagination } from "@/src/hooks/usePagination";
import { useReviews } from "@/src/hooks/useReviews";
import ReviewItem from "./ReviewItem";
import ReviewFilters from "./ReviewFilters";

interface ReviewListProps {
  listingId?: string;
  guideId?: string;
  touristId?: string;
  showFilters?: boolean;
  initialLimit?: number;
}

export const ReviewList = ({
  listingId,
  guideId,
  touristId,
  showFilters = true,
  initialLimit = 10,
}: ReviewListProps) => {
  const { reviews, total, fetchReviews, fetchReviewsByListing, isLoading } =
    useReviews();

  const [filters, setFilters] = useState<ReviewQuery>({
    page: 1,
    limit: initialLimit,
    sortBy: "-createdAt",
  });

  const pagination = usePagination({
    totalItems: total,
    itemsPerPage: initialLimit,
  });

  // ---------------------------
  // ✅ FIX — useCallback ensures stable reference
  // ---------------------------
  const loadReviews = useCallback(async () => {
    const query: ReviewQuery = {
      ...filters,
      page: pagination.currentPage,
    };

    if (listingId) {
      query.listingId = listingId;
      await fetchReviewsByListing(listingId, query);
    } else if (guideId) {
      query.guideId = guideId;
      await fetchReviews(query);
    } else if (touristId) {
      query.touristId = touristId;
      await fetchReviews(query);
    } else {
      await fetchReviews(query);
    }
  }, [
    filters,
    pagination.currentPage,
    listingId,
    guideId,
    touristId,
    fetchReviews,
    fetchReviewsByListing,
  ]);

  // ---------------------------
  // Runs when filters or pagination change
  // ---------------------------
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleFilterChange = (newFilters: Partial<ReviewQuery>) => {
    setFilters({ ...filters, ...newFilters });
    pagination.goToPage(1);
  };

  if (isLoading && reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
            <p className="text-gray-600">Loading reviews...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showFilters && (
        <ReviewFilters filters={filters} onFilterChange={handleFilterChange} />
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews ({total})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600">Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={pagination.prevPage}
                    disabled={!pagination.hasPrevPage}
                  >
                    Previous
                  </Button>

                  <span className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>

                  <Button
                    variant="outline"
                    onClick={pagination.nextPage}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewList;
