"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Users, Award, TrendingUp } from "lucide-react";
import { RatingDistribution } from "@/src/types";
import AnimatedCounter from "../animations/AnimatedCounter";
import RatingBreakdown from "./RatingBreakdown";

interface ReviewStatsProps {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
  verifiedReviews?: number;
  averageGuideRating?: number;
  averageCommunicationRating?: number;
  averageValueRating?: number;
  averageExperienceRating?: number;
}

export const ReviewStats = ({
  averageRating,
  totalReviews,
  ratingDistribution,
  verifiedReviews,
  averageGuideRating,
  averageCommunicationRating,
  averageValueRating,
  averageExperienceRating,
}: ReviewStatsProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              <span className="text-5xl font-bold text-gray-900">
                <AnimatedCounter value={averageRating} decimals={1} />
              </span>
            </div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              Based on{" "}
              <span className="font-semibold">
                <AnimatedCounter value={totalReviews} />
              </span>{" "}
              {totalReviews === 1 ? "review" : "reviews"}
            </p>
          </div>

          <RatingBreakdown distribution={ratingDistribution} />
        </CardContent>
      </Card>

      {(averageGuideRating ||
        averageCommunicationRating ||
        averageValueRating ||
        averageExperienceRating) && (
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Rating Breakdown</h3>
            <div className="space-y-4">
              {averageGuideRating && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Guide Quality</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(averageGuideRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {averageGuideRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {averageCommunicationRating && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Communication</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(averageCommunicationRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {averageCommunicationRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {averageValueRating && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Value for Money</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(averageValueRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {averageValueRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}

              {averageExperienceRating && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Overall Experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= Math.round(averageExperienceRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {averageExperienceRating.toFixed(1)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {verifiedReviews !== undefined && (
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Verified Reviews</span>
              <span className="text-2xl font-bold text-green-600">
                <AnimatedCounter value={verifiedReviews} />
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReviewStats;