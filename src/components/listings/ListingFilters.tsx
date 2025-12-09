/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import { TourCategory } from "@/src/types";
import { TOUR_CATEGORIES } from "@/src/constants";

interface ListingFiltersProps {
  filters: any;
  onFilterChange: (filters: any) => void;
}

export const ListingFilters = ({
  filters,
  onFilterChange,
}: ListingFiltersProps) => {
  const [priceRange, setPriceRange] = useState([
    filters.minPrice || 0,
    filters.maxPrice || 1000,
  ]);

  const handleCategoryChange = (category: TourCategory, checked: boolean) => {
    const currentCategories = filters.category || [];
    const newCategories = checked
      ? [...currentCategories, category]
      : currentCategories.filter((c: TourCategory) => c !== category);

    onFilterChange({ ...filters, category: newCategories });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const applyPriceFilter = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    onFilterChange({});
  };

  const hasActiveFilters =
    filters.category?.length > 0 || filters.minPrice || filters.maxPrice;

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-900">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold text-gray-900 mb-3 block">
            Price Range
          </Label>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={1000}
              step={10}
              className="w-full"
            />
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange([parseInt(e.target.value), priceRange[1]])
                }
                className="w-full"
                placeholder="Min"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full"
                placeholder="Max"
              />
            </div>
            <Button onClick={applyPriceFilter} variant="outline" className="w-full">
              Apply
            </Button>
          </div>
        </div>

        <Separator />

        <div>
          <Label className="text-base font-semibold text-gray-900 mb-3 block">
            Categories
          </Label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {Object.values(TOUR_CATEGORIES).map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  id={category}
                  checked={filters.category?.includes(category)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <label
                  htmlFor={category}
                  className="text-sm text-gray-700 cursor-pointer flex-1"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {filters.category?.length > 0 && (
          <>
            <Separator />
            <div>
              <Label className="text-sm text-gray-600 mb-2 block">
                Active Filters
              </Label>
              <div className="flex flex-wrap gap-2">
                {filters.category.map((cat: TourCategory) => (
                  <Badge
                    key={cat}
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-100"
                    onClick={() => handleCategoryChange(cat, false)}
                  >
                    {cat}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ListingFilters;