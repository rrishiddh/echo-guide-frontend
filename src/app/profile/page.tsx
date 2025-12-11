'use client';
// import { Metadata } from "next";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Lock, Bell } from "lucide-react";
import Link from "next/link";
import ProfileForm from "@/src/components/forms/ProfileForm";
import UserAvatar from "@/src/components/users/UserAvatar";
import ImageUploader from "@/src/components/common/ImageUploader";

// export const metadata: Metadata = {
//   title: "Profile | Echo Guide",
//   description: "View and edit your profile",
// };

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Profile"
          description="View and manage your profile information"
        />

        <div className="container px-4 py-8 max-w-3xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <UserAvatar
                  user={{
                    name: "John Doe",
                    profilePic: "/images/user-placeholder.png",
                  }}
                  size="xl"
                />
                <div>
                  <p className="text-sm text-gray-600 mb-4">
                    Choose a profile picture to personalize your account
                  </p>
                  <ImageUploader
                    onUpload={(urls) => {
                      console.log("Uploaded:", urls);
                    }}
                    maxFiles={1}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/profile/settings">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Settings className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Settings</p>
                      <p className="text-sm text-gray-600">
                        Manage account preferences
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>

              <Link href="/profile/change-password">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Change Password
                      </p>
                      <p className="text-sm text-gray-600">
                        Update your password
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>

              <Link href="/profile/preferences">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-all cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Preferences</p>
                      <p className="text-sm text-gray-600">
                        Notification and privacy settings
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-400">→</span>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;