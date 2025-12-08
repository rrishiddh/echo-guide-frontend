"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserAvatar } from "./UserAvatar";
import { GuideProfile as GuideProfileType } from "@/src/types";
import {
  Star,
  MapPin,
  Globe,
  DollarSign,
  CheckCircle,
  Award,
  MessageSquare,
} from "lucide-react";
import { formatDate } from "@/src/utils/formatDate";
import { formatPrice } from "@/src/utils/formatPrice";
import Link from "next/link";
import GuideStats from "./GuideStats";

interface GuideProfileProps {
  guide: GuideProfileType;
  showBookButton?: boolean;
}

export const GuideProfile = ({
  guide,
  showBookButton = true,
}: GuideProfileProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <UserAvatar user={guide} size="xl" showBadge />
              {guide.isVerified && (
                <Badge className="mt-4 bg-green-500">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified Guide
                </Badge>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {guide.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-lg">
                      {guide.averageRating?.toFixed(1) || "5.0"}
                    </span>
                    <span className="text-gray-600">
                      ({guide.totalReviews || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Award className="w-5 h-5" />
                    <span>{guide.totalTours || 0} tours completed</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                {guide.languagesSpoken && guide.languagesSpoken.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-500" />
                    <div className="flex flex-wrap gap-2">
                      {guide.languagesSpoken.map((language) => (
                        <Badge key={language} variant="secondary">
                          {language}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {guide.expertise && guide.expertise.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-2">Specialties:</p>
                  <div className="flex flex-wrap gap-2">
                    {guide.expertise.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {guide.bio && (
                <div className="pt-2">
                  <p className="text-gray-700 leading-relaxed">{guide.bio}</p>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-gray-500" />
                  <div>
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(guide.dailyRate)}
                    </span>
                    <span className="text-gray-600"> / day</span>
                  </div>
                </div>
                {showBookButton && (
                  <Link href={`/listings?guideId=${guide.id}`}>
                    <Button size="lg">View Tours</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <GuideStats guide={guide} />

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="reviews">
            Reviews ({guide.totalReviews || 0})
          </TabsTrigger>
          <TabsTrigger value="tours">Tours</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>About {guide.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {guide.bio && (
                <p className="text-gray-700 leading-relaxed">{guide.bio}</p>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(guide.createdAt, "MMMM yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Response Rate</p>
                  <p className="font-medium text-gray-900">98%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Response Time</p>
                  <p className="font-medium text-gray-900">Within an hour</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Languages</p>
                  <p className="font-medium text-gray-900">
                    {guide.languagesSpoken?.join(", ") || "Not specified"}
                  </p>
                </div>
              </div>

              {guide.expertise && guide.expertise.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Specialties</p>
                    <div className="flex flex-wrap gap-2">
                      {guide.expertise.map((specialty) => (
                        <Badge key={specialty} variant="outline">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Reviews will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tours">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tour listings will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GuideProfile;