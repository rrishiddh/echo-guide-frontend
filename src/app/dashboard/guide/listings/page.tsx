import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "My Listings | Guide Dashboard",
  description: "Manage your tour listings",
};

const GuideListingsPage = () => {
  const listings = [
    {
      id: "1",
      title: "Hidden Jazz Bars of New Orleans",
      city: "New Orleans",
      price: 75,
      status: "active",
      views: 234,
      bookings: 12,
      rating: 4.8,
      image: "/images/placeholder.jpg",
    },
    {
      id: "2",
      title: "Street Food Tour",
      city: "Bangkok",
      price: 50,
      status: "active",
      views: 456,
      bookings: 28,
      rating: 4.9,
      image: "/images/placeholder.jpg",
    },
    {
      id: "3",
      title: "Historical Walking Tour",
      city: "Rome",
      price: 65,
      status: "draft",
      views: 0,
      bookings: 0,
      rating: 0,
      image: "/images/placeholder.jpg",
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["guide"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="My Listings"
          description="Manage your tour listings"
        >
          <Link href="/dashboard/guide/listings/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Tour
            </Button>
          </Link>
        </PageHeader>

        <div className="container px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Your Tours</CardTitle>
            </CardHeader>
            <CardContent>
              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No tours created yet</p>
                  <Link href="/dashboard/guide/listings/create">
                    <Button>Create Your First Tour</Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div
                      key={listing.id}
                      className="p-4 border rounded-lg hover:border-blue-500 transition-all"
                    >
                      <div className="flex flex-col md:flex-row gap-4">
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          fill
                          className="w-full md:w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-gray-900">
                                  {listing.title}
                                </h3>
                                <Badge
                                  variant={
                                    listing.status === "active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {listing.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {listing.city} • ${listing.price} per person
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-6 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span>{listing.views} views</span>
                            </div>
                            <div>
                              <span>{listing.bookings} bookings</span>
                            </div>
                            {listing.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <span>⭐ {listing.rating}</span>
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/listings/${listing.id}`}>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-2" />
                                View
                              </Button>
                            </Link>
                            <Link
                              href={`/dashboard/guide/listings/${listing.id}/edit`}
                            >
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <Button variant="outline" size="sm">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default GuideListingsPage;