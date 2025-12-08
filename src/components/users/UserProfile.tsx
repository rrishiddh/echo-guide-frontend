"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mail,
  Calendar,
  Globe,
  Edit,
  CheckCircle,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "date-fns";
import { User } from "@/src/types";
import UserAvatar from "./UserAvatar";

interface UserProfileProps {
  user: User;
  isOwner?: boolean;
  showActions?: boolean;
}

export const UserProfile = ({
  user,
  isOwner = false,
  showActions = true,
}: UserProfileProps) => {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <UserAvatar user={user} size="xl" showBadge />
              {isOwner && showActions && (
                <Link href="/profile/settings" className="mt-4">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                  {user.isVerified && (
                    <Badge className="bg-green-500">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                  {!user.isActive && (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {formatDate(user.createdAt, "MMM yyyy")}</span>
                </div>
              </div>

              {user.languagesSpoken && user.languagesSpoken.length > 0 && (
                <div className="flex items-start gap-2">
                  <Globe className="w-4 h-4 text-gray-500 mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {user.languagesSpoken.map((language) => (
                      <Badge key={language} variant="secondary">
                        {language}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {user.bio && (
                <div className="pt-4">
                  <p className="text-gray-700 leading-relaxed">{user.bio}</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Member Since</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(user.createdAt, "MMMM dd, yyyy")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <Badge variant={user.isActive ? "default" : "secondary"}>
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                {user.languagesSpoken && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Languages</p>
                    <p className="font-medium text-gray-900">
                      {user.languagesSpoken.join(", ")}
                    </p>
                  </div>
                )}
              </div>

              {user.bio && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Bio</p>
                    <p className="text-gray-700 leading-relaxed">{user.bio}</p>
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

        <TabsContent value="activity">
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Activity history will be displayed here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;