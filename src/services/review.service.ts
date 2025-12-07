/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { REVIEW_ENDPOINTS } from "../constants";
import {
  Review,
  CreateReviewData,
  UpdateReviewData,
  ReviewQuery,
  ReviewListResponse,
  ReviewStats,
  GuideReviewSummary,
  ReportReviewData,
  MarkHelpfulData,
} from "../types";

class ReviewService {
  async createReview(data: CreateReviewData): Promise<Review> {
    const response = await apiService.post<Review>(
      REVIEW_ENDPOINTS.CREATE,
      data
    );
    return response.data.data!;
  }

  async getReview(id: string): Promise<Review> {
    const response = await apiService.get<Review>(
      REVIEW_ENDPOINTS.DETAIL(id)
    );
    return response.data.data!;
  }

  async getAllReviews(query: ReviewQuery): Promise<ReviewListResponse> {
    const response = await apiService.get<Review[]>(REVIEW_ENDPOINTS.ALL, {
      params: query,
    });
    return {
      reviews: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getMyReviews(query: ReviewQuery): Promise<ReviewListResponse> {
    const response = await apiService.get<Review[]>(
      REVIEW_ENDPOINTS.MY_REVIEWS,
      { params: query }
    );
    return {
      reviews: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getReviewsByListing(
    listingId: string,
    query: ReviewQuery
  ): Promise<ReviewListResponse> {
    const response = await apiService.get<Review[]>(
      REVIEW_ENDPOINTS.BY_LISTING(listingId),
      { params: query }
    );
    return {
      reviews: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getReviewsByGuide(
    guideId: string,
    query: ReviewQuery
  ): Promise<ReviewListResponse> {
    const response = await apiService.get<Review[]>(
      REVIEW_ENDPOINTS.BY_GUIDE(guideId),
      { params: query }
    );
    return {
      reviews: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getGuideReviewSummary(guideId: string): Promise<GuideReviewSummary> {
    const response = await apiService.get<GuideReviewSummary>(
      REVIEW_ENDPOINTS.GUIDE_SUMMARY(guideId)
    );
    return response.data.data!;
  }

  async updateReview(id: string, data: UpdateReviewData): Promise<Review> {
    const response = await apiService.patch<Review>(
      REVIEW_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data.data!;
  }

  async deleteReview(id: string): Promise<void> {
    await apiService.delete(REVIEW_ENDPOINTS.DELETE(id));
  }

  async markReviewHelpful(id: string, data: MarkHelpfulData): Promise<void> {
    await apiService.post(REVIEW_ENDPOINTS.HELPFUL(id), data);
  }

  async reportReview(id: string, data: ReportReviewData): Promise<void> {
    await apiService.post(REVIEW_ENDPOINTS.REPORT(id), data);
  }

  async toggleReviewVisibility(
    id: string,
    isHidden: boolean,
    reason?: string
  ): Promise<void> {
    await apiService.patch(REVIEW_ENDPOINTS.VISIBILITY(id), {
      isHidden,
      reason,
    });
  }

  async getReviewStats(): Promise<ReviewStats> {
    const response = await apiService.get<ReviewStats>(REVIEW_ENDPOINTS.STATS);
    return response.data.data!;
  }
}

export const reviewService = new ReviewService();
export default reviewService;