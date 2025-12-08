"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import AnimatedCounter from "../animations/AnimatedCounter";

interface AnalyticsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  progress?: {
    value: number;
    label?: string;
  };
  description?: string;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  prefix?: string;
  suffix?: string;
}

export const AnalyticsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  progress,
  description,
  color = "blue",
  prefix,
  suffix,
}: AnalyticsCardProps) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      gradient: "from-green-500 to-green-600",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
    orange: {
      bg: "bg-orange-100",
      text: "text-orange-600",
      gradient: "from-orange-500 to-orange-600",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      gradient: "from-red-500 to-red-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-gray-900">
              <AnimatedCounter value={value} prefix={prefix} suffix={suffix} />
            </span>
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
                <span>{trend.value}%</span>
              </div>
            )}
          </div>

          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}

          {trend?.label && (
            <p className="text-xs text-gray-500">{trend.label}</p>
          )}

          {progress && (
            <div className="space-y-2">
              <Progress value={progress.value} className="h-2" />
              {progress.label && (
                <p className="text-xs text-gray-500">{progress.label}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;