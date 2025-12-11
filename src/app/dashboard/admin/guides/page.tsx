import { Metadata } from "next";
import { Card, CardContent,  } from "@/components/ui/card";
import { Users, Star, MapPin } from "lucide-react";
import GuideList from "@/src/components/users/GuideList";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";

export const metadata: Metadata = {
  title: "Manage Guides | Admin Dashboard",
  description: "Manage all platform guides",
};

const AdminGuidesPage = () => {
  const stats = [
    {
      label: "Total Guides",
      value: "245",
      icon: Users,
      color: "blue",
    },
    {
      label: "Verified Guides",
      value: "198",
      icon: Star,
      color: "green",
    },
    {
      label: "Active Listings",
      value: "567",
      icon: MapPin,
      color: "purple",
    },
    {
      label: "Avg. Rating",
      value: "4.8",
      icon: Star,
      color: "yellow",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Guides" 
          description="View and manage all tour guides"
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

          <GuideList />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminGuidesPage;