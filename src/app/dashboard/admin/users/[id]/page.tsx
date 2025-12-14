"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PageHeader from "@/src/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Ban, CheckCircle, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/src/components/common/BackButton";
import UserProfile from "@/src/components/users/UserProfile";
import { useUser } from "@/src/hooks/useUser";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import { User } from "@/src/types";

const AdminUserDetailPage = () => {
  const params = useParams();
  const userId = params.id as string;
  const { user, fetchUser, isLoading } = useUser();
  const [localUser, setLocalUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const data = await fetchUser(userId);
        setLocalUser(data);
      } catch (error) {
        toast.error("Failed to load user");
      }
    };

    fetchData();
  }, [userId, fetchUser]);

  const handleToggleStatus = async () => {
    if (!localUser) return;
    toast.success(`User ${localUser.isActive ? "deactivated" : "activated"}`);
  };

  const handleVerify = async () => {
    if (!localUser) return;
    toast.success("User verified successfully");
  };

  const handleDelete = async () => {
    if (!localUser) return;
    if (confirm("Are you sure you want to delete this user?")) {
      toast.success("User deleted successfully");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!localUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">User not found</p>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="User Details"
          description={`Manage ${localUser.name}`}
        >
          <BackButton fallbackUrl="/dashboard/admin/users" />
        </PageHeader>

        <div className="container px-4 py-8 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={handleToggleStatus}>
                  {localUser.isActive ? (
                    <>
                      <Ban className="w-4 h-4 mr-2" />
                      Deactivate User
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate User
                    </>
                  )}
                </Button>

                {!localUser.isVerified && (
                  <Button variant="outline" onClick={handleVerify}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Verify User
                  </Button>
                )}

                {/* <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button> */}

                <Button variant="destructive" onClick={handleDelete}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Reviews Given</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <Badge variant={localUser.isActive ? "default" : "secondary"}>
                    {localUser.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <UserProfile user={localUser} isOwner={false} showActions={false} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUserDetailPage;
