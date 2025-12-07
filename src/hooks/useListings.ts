/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";

import { toast } from "sonner";
import {
  Listing,
  ListingQuery,
  CreateListingData,
  UpdateListingData,
} from "../types";
import listingService from "../services/listing.service";

export const useListings = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const fetchListings = useCallback(async (query: ListingQuery = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listingService.getAllListings(query);
      setListings(response.listings);
      setTotal(response.meta.total);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch listings";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const searchListings = useCallback(async (query: ListingQuery) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await listingService.searchListings(query);
      setListings(response.listings);
      setTotal(response.meta.total);
      return response;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to search listings";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchListing = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await listingService.getListing(id);
      setListing(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch listing";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const createListing = useCallback(async (data: CreateListingData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newListing = await listingService.createListing(data);
      toast.success("Listing created successfully");
      return newListing;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create listing";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const updateListing = useCallback(
    async (id: string, data: UpdateListingData) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedListing = await listingService.updateListing(id, data);
        setListing(updatedListing);
        toast.success("Listing updated successfully");
        return updatedListing;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to update listing";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const deleteListing = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await listingService.deleteListing(id);
      toast.success("Listing deleted successfully");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete listing";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    listings,
    listing,
    isLoading,
    error,
    total,
    fetchListings,
    searchListings,
    fetchListing,
    createListing,
    updateListing,
    deleteListing,
  };
};
