/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { LISTING_ENDPOINTS } from "../constants";
import {
  Listing,
  CreateListingData,
  UpdateListingData,
  ListingQuery,
  ListingListResponse,
  ListingStats,
} from "../types";

class ListingService {
  async getAllListings(query: ListingQuery): Promise<ListingListResponse> {
    const response = await apiService.get<Listing[]>(LISTING_ENDPOINTS.ALL, {
      params: query,
    });
    return {
      listings: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async searchListings(query: ListingQuery): Promise<ListingListResponse> {
    const response = await apiService.get<Listing[]>(
      LISTING_ENDPOINTS.SEARCH,
      { params: query }
    );
    return {
      listings: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getFeaturedListings(limit?: number): Promise<Listing[]> {
    const response = await apiService.get<Listing[]>(
      LISTING_ENDPOINTS.FEATURED,
      { params: { limit } }
    );
    return response.data.data!;
  }

  async getPopularListings(limit?: number): Promise<Listing[]> {
    const response = await apiService.get<Listing[]>(
      LISTING_ENDPOINTS.POPULAR,
      { params: { limit } }
    );
    return response.data.data!;
  }

  async getRecentListings(limit?: number): Promise<Listing[]> {
    const response = await apiService.get<Listing[]>(LISTING_ENDPOINTS.RECENT, {
      params: { limit },
    });
    return response.data.data!;
  }

  async getListingsByGuide(
    guideId: string,
    query: ListingQuery
  ): Promise<ListingListResponse> {
    const response = await apiService.get<Listing[]>(
      LISTING_ENDPOINTS.BY_GUIDE(guideId),
      { params: query }
    );
    return {
      listings: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getListing(id: string): Promise<Listing> {
    const response = await apiService.get<Listing>(
      LISTING_ENDPOINTS.DETAIL(id)
    );
    return response.data.data!;
  }

  async createListing(data: CreateListingData): Promise<Listing> {
    const response = await apiService.post<Listing>(
      LISTING_ENDPOINTS.CREATE,
      data
    );
    return response.data.data!;
  }

  async updateListing(
    id: string,
    data: UpdateListingData
  ): Promise<Listing> {
    const response = await apiService.patch<Listing>(
      LISTING_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data.data!;
  }

  async deleteListing(id: string): Promise<void> {
    await apiService.delete(LISTING_ENDPOINTS.DELETE(id));
  }

  async getListingStats(): Promise<ListingStats> {
    const response = await apiService.get<ListingStats>(
      LISTING_ENDPOINTS.STATS
    );
    return response.data.data!;
  }
}

export const listingService = new ListingService();
export default listingService;