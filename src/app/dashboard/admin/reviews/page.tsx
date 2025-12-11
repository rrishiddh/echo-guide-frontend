import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent } from "@/components/ui/card";
import { Star, MessageSquare, ThumbsUp, Flag } from "lucide-react";
import ReviewList from "@/src/components/reviews/ReviewList";

export const metadata: Metadata = {
  title: "Manage Reviews | Admin Dashboard",
  description: "Manage all platform reviews",
};

const AdminReviewsPage = () => {
  const stats = [
    { label: "Total Reviews", value: "2,456", icon: MessageSquare, color: "blue" },
    { label: "Avg. Rating", value: "4.7", icon: Star, color: "yellow" },
    { label: "Verified Reviews", value: "2,103", icon: ThumbsUp, color: "green" },
    { label: "Flagged", value: "12", icon: Flag, color: "red" },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Reviews" 
          description="View and manage all platform reviews"
        />
        
        <div className="container px-4 py-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ReviewList showFilters={true} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminReviewsPage;