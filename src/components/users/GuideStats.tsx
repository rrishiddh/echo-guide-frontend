"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, TrendingUp, Users } from "lucide-react";
import { GuideProfile } from "@/src/types";
import AnimatedCounter from "../animations/AnimatedCounter";
// import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

interface GuideStatsProps {
  guide: GuideProfile;
}

export const GuideStats = ({ guide }: GuideStatsProps) => {
  const stats = [
    {
      label: "Average Rating",
      value: guide.averageRating || 5.0,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      suffix: "/5",
      decimals: 1,
    },
    {
      label: "Total Reviews",
      value: guide.totalReviews || 0,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      label: "Tours Completed",
      value: guide.totalTours || 0,
      icon: Award,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      label: "Response Rate",
      value: 98,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      suffix: "%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}
              >
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default GuideStats;