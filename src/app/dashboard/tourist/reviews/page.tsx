"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MessageSquare, Edit, Trash2 } from "lucide-react";
// import Link from "next/link";
import { reviewService } from "@/src/services/review.service";
import { Review, ReviewListResponse } from "@/src/types";
import LoadingScreen from "@/src/components/common/LoadingScreen";

const TouristReviewsPage = () => {
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response: ReviewListResponse = await reviewService.getMyReviews({ page: 1, limit: 20 });
        setMyReviews(response.reviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Failed to load your reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyReviews();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Reviews"
          description="View and manage your tour reviews"
        />

        <div className="container px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Your Reviews ({myReviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <p className="text-red-500">{error}</p>
              ) : myReviews.length === 0 ? (
                <p className="text-gray-600">You have not submitted any reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {myReviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-4 border rounded-lg hover:border-blue-500 transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {review.listing?.title || "Tour"}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Guide: {review.guide?.name || "Guide"}
                          </p>
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                            {[...Array(5 - review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-gray-300"
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                        {/* <div className="flex gap-2">
                          {review?.canEdit && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div> */}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Completed tours awaiting your review will appear here.
              </p>
              {/* Optionally, you can fetch pending bookings and map to leave review buttons */}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TouristReviewsPage;
