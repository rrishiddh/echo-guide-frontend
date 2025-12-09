"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TourCategory } from "@/src/types";
import { getCategoryGradient, getCategoryIcon } from "@/src/constants";

interface CategoryCardProps {
  category: TourCategory;
  tourCount?: number;
}

export const CategoryCard = ({ category, tourCount }: CategoryCardProps) => {
  return (
    <Link href={`/listings?category=${category}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-blue-500 h-full">
        <CardContent className="p-0">
          <div
            className={`h-32 bg-gradient-to-br ${getCategoryGradient(
              category
            )} flex items-center justify-center relative overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
            <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
              {getCategoryIcon(category)}
            </span>
          </div>
          <div className="p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors mb-1">
              {category}
            </h3>
            {tourCount !== undefined && (
              <p className="text-sm text-gray-600 text-center">
                {tourCount} {tourCount === 1 ? "tour" : "tours"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CategoryCard;