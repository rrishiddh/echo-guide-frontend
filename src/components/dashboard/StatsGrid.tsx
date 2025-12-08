"use client";

import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import AnimatedCounter from "../animations/AnimatedCounter";

interface StatItem {
  label: string;
  value: number | string;
  icon: LucideIcon;
  change?: number;
  trend?: "up" | "down";
  color?: string;
  prefix?: string;
  suffix?: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <StaggerChildren staggerDelay={0.1}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StaggerItem key={index}>
            <StatCard stat={stat} />
          </StaggerItem>
        ))}
      </div>
    </StaggerChildren>
  );
};

const StatCard = ({ stat }: { stat: StatItem }) => {
  const IconComponent = stat.icon;
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
  };

  const bgColor = stat.color
    ? colorClasses[stat.color as keyof typeof colorClasses]
    : "bg-blue-100 text-blue-600";

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${bgColor} flex items-center justify-center`}>
            <IconComponent className="w-6 h-6" />
          </div>
          {stat.change !== undefined && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {stat.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(stat.change)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
          <p className="text-3xl font-bold text-gray-900">
            {typeof stat.value === "number" ? (
              <AnimatedCounter
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
              />
            ) : (
              stat.value
            )}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsGrid;