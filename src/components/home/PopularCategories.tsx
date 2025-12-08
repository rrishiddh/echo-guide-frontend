"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import StaggerChildren, { StaggerItem } from "../animations/StaggerChildren";
import { TOUR_CATEGORIES,getCategoryIcon, getCategoryGradient } from "@/src/constants";

const popularCategories = [
  TOUR_CATEGORIES.FOOD,
  TOUR_CATEGORIES.HISTORY,
  TOUR_CATEGORIES.CULTURE,
  TOUR_CATEGORIES.ADVENTURE,
  TOUR_CATEGORIES.NATURE,
  TOUR_CATEGORIES.PHOTOGRAPHY,
  TOUR_CATEGORIES.ART,
  TOUR_CATEGORIES.NIGHTLIFE,
];

export const PopularCategories = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Explore by Category</h2>
          <p className="text-xl text-gray-600 mt-4">
            Find the perfect experience that matches your interests
          </p>
        </div>

        <StaggerChildren staggerDelay={0.08}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <StaggerItem key={category}>
                <Link href={`/listings?category=${category}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border-2 hover:border-blue-500">
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
                        <h3 className="text-lg font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
                          {category}
                        </h3>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        <div className="text-center mt-12">
          <Link href="/listings">
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg hover:underline">
              View All Categories →
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;