import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Star, Eye } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manage Listings | Admin Dashboard",
  description: "Manage all tour listings",
};

const AdminListingsPage = () => {
  const stats = [
    { label: "Total Listings", value: "567", icon: MapPin, color: "blue" },
    { label: "Active Listings", value: "432", icon: TrendingUp, color: "green" },
    { label: "Pending Approval", value: "23", icon: Eye, color: "yellow" },
    { label: "Avg. Rating", value: "4.7", icon: Star, color: "orange" },
  ];

  const mockListings = [
    {
      id: "1",
      title: "Hidden Jazz Bars of New Orleans",
      guide: "John Doe",
      price: 75,
      status: "active",
      bookings: 45,
      rating: 4.8,
    },
    {
      id: "2",
      title: "Street Food Tour in Bangkok",
      guide: "Jane Smith",
      price: 50,
      status: "active",
      bookings: 78,
      rating: 4.9,
    },
    {
      id: "3",
      title: "Historical Walking Tour of Rome",
      guide: "Mike Johnson",
      price: 65,
      status: "pending",
      bookings: 0,
      rating: 0,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Listings" 
          description="View and manage all tour listings"
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

          <Card>
            <CardHeader>
              <CardTitle>All Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="p-4 border rounded-lg hover:border-blue-500 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                          <Badge variant={listing.status === "active" ? "default" : "secondary"}>
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">Guide: {listing.guide}</p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <span>${listing.price} / person</span>
                          <span>{listing.bookings} bookings</span>
                          {listing.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{listing.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <Link href={`/dashboard/admin/listings/${listing.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminListingsPage;