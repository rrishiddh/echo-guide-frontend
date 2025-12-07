export type TourCategory =
  | "Food"
  | "Art"
  | "Adventure"
  | "History"
  | "Culture"
  | "Nightlife"
  | "Shopping"
  | "Nature"
  | "Photography"
  | "Sports"
  | "Wellness"
  | "Family";

export type ListingStatus = "active" | "inactive" | "draft";

export interface Listing {
  id: string;
  guideId: string;
  guide?: GuideProfile;
  title: string;
  description: string;
  itinerary: string;
  tourFee: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: TourCategory[];
  images: string[];
  status: ListingStatus;
  totalBookings: number;
  averageRating: number;
  totalReviews: number;
  city: string;
  country: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListingData {
  title: string;
  description: string;
  itinerary: string;
  tourFee: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  category: TourCategory[];
  city: string;
  country: string;
  images?: string[];
}

export interface UpdateListingData {
  title?: string;
  description?: string;
  itinerary?: string;
  tourFee?: number;
  duration?: number;
  meetingPoint?: string;
  maxGroupSize?: number;
  category?: TourCategory[];
  city?: string;
  country?: string;
  images?: string[];
  status?: ListingStatus;
}

export interface ListingQuery {
  guideId?: string;
  category?: TourCategory | TourCategory[];
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  city?: string;
  country?: string;
  search?: string;
  status?: ListingStatus;
  isActive?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface ListingListResponse {
  listings: Listing[];
  meta: PaginationMeta & {
    averageRating?: number;
    ratingDistribution?: RatingDistribution[];
  };
}

export interface ListingStats {
  totalListings: number;
  activeListings: number;
  inactiveListings: number;
  draftListings: number;
  totalBookings: number;
  averagePrice: number;
  listingsByCategory: CategoryCount[];
  topRatedListings: Listing[];
  recentListings: Listing[];
}

export interface CategoryCount {
  category: string;
  count: number;
}