/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Review {
  id: string;
  touristId: string;
  guideId: string;
  listingId: string;
  bookingId: string;
  tourist?: User;
  guide?: User;
  listing?: Listing;
  booking?: Booking;
  rating: number;
  comment: string;
  guideRating?: number;
  communicationRating?: number;
  valueRating?: number;
  experienceRating?: number;
  isVerified: boolean;
  isEdited: boolean;
  helpful: number;
  reportCount: number;
  isHidden: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateReviewData {
  listingId: string;
  bookingId: string;
  rating: number;
  comment: string;
  guideRating?: number;
  communicationRating?: number;
  valueRating?: number;
  experienceRating?: number;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
  guideRating?: number;
  communicationRating?: number;
  valueRating?: number;
  experienceRating?: number;
}

export interface ReviewQuery {
  touristId?: string;
  guideId?: string;
  listingId?: string;
  minRating?: number;
  maxRating?: number;
  isVerified?: boolean;
  isHidden?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface ReviewListResponse {
  reviews: Review[];
  meta: PaginationMeta & {
    averageRating: number;
    ratingDistribution: RatingDistribution[];
  };
}

export interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  verifiedReviews: number;
  hiddenReviews: number;
  ratingDistribution: RatingDistribution[];
  recentReviews: Review[];
  topRatedListings: any[];
  topRatedGuides: any[];
}

export interface GuideReviewSummary {
  totalReviews: number;
  averageRating: number;
  averageGuideRating: number;
  averageCommunicationRating: number;
  averageValueRating: number;
  averageExperienceRating: number;
  ratingDistribution: RatingDistribution[];
  recentReviews: Review[];
}

export interface ReportReviewData {
  reason: string;
}

export interface MarkHelpfulData {
  helpful: boolean;
}