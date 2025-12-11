
import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { ReviewList } from "@/components/reviews/ReviewList";
import { Star, MessageSquare, Edit, Trash2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "My Reviews | Tourist Dashboard",
  description: "View and manage your tour reviews",
};

const TouristReviewsPage = () => {
  const myReviews = [
    {
      id: "1",
      listing: "Hidden Jazz Bars of New Orleans",
      guide: "John Doe",
      rating: 5,
      comment: "Amazing experience! John was knowledgeable and friendly.",
      createdAt: "2024-06-10",
      canEdit: true,
    },
    {
      id: "2",
      listing: "Street Food Tour",
      guide: "Jane Smith",
      rating: 4,
      comment: "Great food and interesting stories. A bit crowded though.",
      createdAt: "2024-05-20",
      canEdit: false,
    },
  ];

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
              <div className="space-y-4">
                {myReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {review.listing}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Guide: {review.guide}
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
                      <div className="flex gap-2">
                        {review.canEdit && (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                You have 2 completed tours awaiting your review.
              </p>
              <div className="space-y-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Historical Walking Tour
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Guide: Mike Johnson | Completed on June 5, 2024
                  </p>
                  <Link href="/reviews/booking-123">
                    <Button size="sm">Leave Review</Button>
                  </Link>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Cultural Heritage Tour
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Guide: Sarah Williams | Completed on June 1, 2024
                  </p>
                  <Link href="/reviews/booking-124">
                    <Button size="sm">Leave Review</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TouristReviewsPage;