"use client";

import { Progress } from "@/components/ui/progress";
import { RatingDistribution } from "@/src/types";
import { Star } from "lucide-react";

interface RatingBreakdownProps {
  distribution: RatingDistribution[];
}

export const RatingBreakdown = ({ distribution }: RatingBreakdownProps) => {
  const sortedDistribution = [...distribution].sort((a, b) => b.rating - a.rating);

  return (
    <div className="space-y-3">
      {sortedDistribution.map((item) => (
        <div key={item.rating} className="flex items-center gap-3">
          <div className="flex items-center gap-1 w-16">
            <span className="text-sm font-medium text-gray-900">{item.rating}</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          </div>

          <div className="flex-1">
            <Progress value={item.percentage} className="h-2" />
          </div>

          <div className="w-16 text-right">
            <span className="text-sm text-gray-600">{item.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingBreakdown;