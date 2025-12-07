"use client";
import { useState, useCallback } from "react";
import { TourCategory } from "../types";
interface ListingFilters {
  search?: string;
  category?: TourCategory[];
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}
export const useListingFilters = (initialFilters: ListingFilters = {}) => {
  const [filters, setFilters] = useState<ListingFilters>(initialFilters);
  const updateFilter = useCallback(
  <K extends keyof ListingFilters>(key: K, value: ListingFilters[K]) => {
    setFilters((prev) => {
      if (key === "page") {
        return {
          ...prev,
          page: value as number, 
        };
      }
      return {
        ...prev,
        [key]: value,
        page: 1, 
      };
    });
  },
  []
);

  const updateFilters = useCallback((newFilters: Partial<ListingFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  }, []);
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);
  const removeFilter = useCallback(<K extends keyof ListingFilters>(key: K) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return { ...newFilters, page: 1 };
    });
  }, []);
  const hasActiveFilters = useCallback(() => {
    const { page, limit, sortBy, ...rest } = filters;
    return Object.keys(rest).length > 0;
  }, [filters]);
  return {
    filters,
    updateFilter,
    updateFilters,
    resetFilters,
    removeFilter,
    hasActiveFilters: hasActiveFilters(),
  };
};
