
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { getInitials } from "@/src/utils/helpers";

interface TestimonialCardProps {
  name: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
  tour?: string;
}

export const TestimonialCard = ({
  name,
  location,
  rating,
  text,
  image,
  tour,
}: TestimonialCardProps) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <Quote className="w-10 h-10 text-blue-500 mb-4" />

        <div className="flex items-center gap-1 mb-4">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed mb-6 italic">
          {text}
        </p>

        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-blue-500 text-white">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-600">{location}</p>
            {tour && (
              <p className="text-xs text-blue-600 font-medium mt-1">{tour}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;