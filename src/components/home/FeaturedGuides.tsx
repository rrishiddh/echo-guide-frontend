"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import userService from "@/src/services/user.service";
import { GuideProfile } from "@/src/types";
import { getInitials } from "@/src/utils/helpers";
import StaggerChildren, { StaggerItem } from "../animations/StaggerChildren";

export const FeaturedGuides = () => {
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedGuides();
  }, []);

  const fetchFeaturedGuides = async () => {
    try {
      const response = await userService.getGuides({
        limit: 6,
        sortBy: "-rating",
        isVerified: true,
      });
      setGuides(response.users as GuideProfile[]);
    } catch (error) {
      console.error("Failed to fetch guides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Featured Local Guides</h2>
            <p className="text-xl text-gray-600 mt-4">
              Meet our top-rated guides ready to show you around
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Featured Local Guides</h2>
          <p className="text-xl text-gray-600 mt-4">
            Meet our top-rated guides ready to show you around
          </p>
        </div>

        <StaggerChildren staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <StaggerItem key={guide.id}>
                <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                          <AvatarImage src={guide.profilePic} alt={guide.name} />
                          <AvatarFallback className="text-2xl bg-white text-blue-600">
                            {getInitials(guide.name)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      {guide.isVerified && (
                        <Badge className="absolute top-4 right-4 bg-green-500">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {guide.name}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">
                          {guide.languagesSpoken?.join(", ") || "Multiple languages"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">
                            {guide.averageRating?.toFixed(1) || "5.0"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-sm">
                            {guide.totalReviews || 0} reviews
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.expertise?.slice(0, 3).map((exp) => (
                          <Badge key={exp} variant="secondary" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {guide.bio || "Passionate local guide ready to show you the best of the city"}
                      </p>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">
                            ${guide.dailyRate}
                          </span>
                          <span className="text-gray-600 text-sm">/day</span>
                        </div>
                        <Link href={`/guides/${guide.id}`}>
                          <Button variant="outline">View Profile</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </div>
        </StaggerChildren>

        <div className="text-center mt-12">
          <Link href="/guides">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Guides
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;