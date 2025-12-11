"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/src/components/common/PageHeader";
import GuideProfile from "@/src/components/users/GuideProfile";
import BackButton from "@/src/components/common/BackButton";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import ReviewList from "@/src/components/reviews/ReviewList";

import { Guide } from "@/src/types";  

const GuideDetailPage = () => {
  const params = useParams();
  const guideId = params.id as string;

  const [guide, setGuide] = useState<Guide | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const mockGuide: Guide = {
      id: guideId,
      name: "John Doe",
      email: "john@example.com",
      profilePic: "/images/user-placeholder.png",
      bio: "Passionate about showing travelers the real New Orleans. I love jazz, food, and sharing stories about my city.",
      languagesSpoken: ["English", "French", "Spanish"],
      expertise: ["Nightlife", "Food", "History"],
      dailyRate: 75,
      isVerified: true,
      isActive: true,
      createdAt: "2023-01-15",
      updatedAt: "2024-04-01", 
      averageRating: 4.8,
      totalReviews: 156,
      totalTours: 45,
      role: "guide",
    };

    setTimeout(() => {
      setGuide(mockGuide);  
      setIsLoading(false);
    }, 500);
  }, [guideId]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!guide) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-600">Guide not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader title={guide.name} description="Local Guide Profile">
        <BackButton fallbackUrl="/guides" />
      </PageHeader>

      <div className="container px-4 py-8 space-y-8">
        <GuideProfile guide={guide} showBookButton={true} />

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
          <ReviewList guideId={guideId} showFilters={true} />
        </div>
      </div>
    </div>
  );
};

export default GuideDetailPage;
