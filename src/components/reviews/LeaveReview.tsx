"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useReviews } from "@/src/hooks/useReviews";
import { CreateReviewData } from "@/src/types";

interface LeaveReviewProps {
  bookingId: string;
  listingId: string;
  listingTitle?: string;
  onSuccess?: () => void;
}

export const LeaveReview = ({
  bookingId,
  listingId,
  listingTitle,
  onSuccess,
}: LeaveReviewProps) => {
  const router = useRouter();
  const { createReview, isLoading } = useReviews();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: "",
    guideRating: 0,
    communicationRating: 0,
    valueRating: 0,
    experienceRating: 0,
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select an overall rating");
      return;
    }

    if (!formData.comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    if (formData.comment.trim().length < 10) {
      toast.error("Review must be at least 10 characters");
      return;
    }

    try {
      const reviewData: CreateReviewData = {
        bookingId,
        listingId,
        rating: formData.rating,
        comment: formData.comment.trim(),
        guideRating: formData.guideRating || undefined,
        communicationRating: formData.communicationRating || undefined,
        valueRating: formData.valueRating || undefined,
        experienceRating: formData.experienceRating || undefined,
      };

      await createReview(reviewData);

      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/tourist/reviews");
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  const renderStars = (
    category: string,
    currentRating: number,
    setRating: (rating: number) => void
  ) => {
    const displayRating =
      hoveredCategory === category && hoveredRating > 0
        ? hoveredRating
        : currentRating;

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => {
              setHoveredRating(star);
              setHoveredCategory(category);
            }}
            onMouseLeave={() => {
              setHoveredRating(0);
              setHoveredCategory(null);
            }}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= displayRating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
        {listingTitle && (
          <p className="text-sm text-gray-600 mt-2">{listingTitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Overall Rating *</Label>
            <div className="flex items-center gap-2">
              {renderStars("overall", formData.rating, (rating) =>
                setFormData({ ...formData, rating })
              )}
              {formData.rating > 0 && (
                <span className="text-sm font-medium text-gray-600">
                  {formData.rating} / 5
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-sm text-gray-600">
              Rate specific aspects (optional)
            </Label>

            <div className="space-y-4">
              <div>
                <Label className="text-sm mb-2 block">Guide Quality</Label>
                {renderStars("guide", formData.guideRating, (rating) =>
                  setFormData({ ...formData, guideRating: rating })
                )}
              </div>

              <div>
                <Label className="text-sm mb-2 block">Communication</Label>
                {renderStars(
                  "communication",
                  formData.communicationRating,
                  (rating) =>
                    setFormData({ ...formData, communicationRating: rating })
                )}
              </div>

              <div>
                <Label className="text-sm mb-2 block">Value for Money</Label>
                {renderStars("value", formData.valueRating, (rating) =>
                  setFormData({ ...formData, valueRating: rating })
                )}
              </div>

              <div>
                <Label className="text-sm mb-2 block">Overall Experience</Label>
                {renderStars(
                  "experience",
                  formData.experienceRating,
                  (rating) =>
                    setFormData({ ...formData, experienceRating: rating })
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Review *</Label>
            <Textarea
              id="comment"
              placeholder="Share your experience with this tour and guide..."
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
              rows={6}
              required
            />
            <p className="text-xs text-gray-500">
              Minimum 10 characters ({formData.comment.length}/10)
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              Your review will be visible to other travelers and will help them
              make informed decisions. Please be honest and constructive.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading || formData.rating === 0}
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default LeaveReview;
