/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";

import { toast } from "sonner";
import reviewService from "../services/review.service";
import {
  Review,
  CreateReviewData,
  UpdateReviewData,
  ReviewQuery,
} from "../types";

export const useReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [review, setReview] = useState<Review | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const fetchReviews = useCallback(async (query: ReviewQuery = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await reviewService.getAllReviews(query);
      setReviews(response.reviews);
      setTotal(response.meta.total);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch reviews";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchReviewsByListing = useCallback(
    async (listingId: string, query: ReviewQuery = {}) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await reviewService.getReviewsByListing(
          listingId,
          query
        );
        setReviews(response.reviews);
        setTotal(response.meta.total);
        return response;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to fetch reviews";
        setError(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const createReview = useCallback(async (data: CreateReviewData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newReview = await reviewService.createReview(data);
      toast.success("Review submitted successfully");
      return newReview;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to submit review";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const updateReview = useCallback(
    async (id: string, data: UpdateReviewData) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedReview = await reviewService.updateReview(id, data);
        setReview(updatedReview);
        toast.success("Review updated successfully");
        return updatedReview;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to update review";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const deleteReview = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await reviewService.deleteReview(id);
      toast.success("Review deleted successfully");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete review";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    reviews,
    review,
    isLoading,
    error,
    total,
    fetchReviews,
    fetchReviewsByListing,
    createReview,
    updateReview,
    deleteReview,
  };
};
