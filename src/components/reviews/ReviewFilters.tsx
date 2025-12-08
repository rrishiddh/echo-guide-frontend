"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Filter, X } from "lucide-react";
import { ReviewQuery } from "@/src/types";

interface ReviewFiltersProps {
  filters: ReviewQuery;
  onFilterChange: (filters: Partial<ReviewQuery>) => void;
}

export const ReviewFilters = ({ filters, onFilterChange }: ReviewFiltersProps) => {
  const ratings = [5, 4, 3, 2, 1];

  const hasActiveFilters = filters.minRating || filters.sortBy !== "-createdAt";

  const clearFilters = () => {
    onFilterChange({
      minRating: undefined,
      sortBy: "-createdAt",
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-1">
            <Select
              value={filters.minRating?.toString() || "all"}
              onValueChange={(value) =>
                onFilterChange({
                  minRating: value === "all" ? undefined : parseInt(value),
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All ratings" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All ratings</SelectItem>
                {ratings.map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{rating}+ stars</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.sortBy || "-createdAt"}
              onValueChange={(value) => onFilterChange({ sortBy: value })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-createdAt">Most Recent</SelectItem>
                <SelectItem value="createdAt">Oldest First</SelectItem>
                <SelectItem value="-rating">Highest Rating</SelectItem>
                <SelectItem value="rating">Lowest Rating</SelectItem>
                <SelectItem value="-helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-900"
              >
                <X className="w-4 h-4 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewFilters;