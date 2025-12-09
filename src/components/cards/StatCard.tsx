"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import AnimatedCounter from "../animations/AnimatedCounter";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "blue" | "green" | "purple" | "orange" | "red" | "yellow";
  prefix?: string;
  suffix?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = "blue",
  prefix,
  suffix,
}: StatCardProps) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
    },
    yellow: {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900">
          {typeof value === "number" ? (
            <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
          ) : (
            value
          )}
        </p>
      </CardContent>
    </Card>
  );
};

export default StatCard;