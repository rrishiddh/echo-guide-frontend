"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  bgColor?: string;
}

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  color = "text-blue-600",
  bgColor = "bg-blue-100",
}: FeatureCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-500">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;