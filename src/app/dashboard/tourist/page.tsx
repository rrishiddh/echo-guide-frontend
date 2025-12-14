
'use client';
// import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { BookingCard } from "@/components/cards/BookingCard";
import { Calendar, Heart, MapPin, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import PastBookings from "@/src/components/bookings/PastBookings";
import UpcomingBookings from "@/src/components/bookings/UpcomingBookings";
import PageHeader from "@/src/components/common/PageHeader";

// export const metadata: Metadata = {
//   title: "Tourist Dashboard | Echo Guide",
//   description: "Manage your tours and bookings",
// };

const TouristDashboardPage = () => {
  const stats = [
    {
      label: "Upcoming Tours",
      value: "3",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Completed Tours",
      value: "12",
      icon: MapPin,
      color: "green",
    },
    {
      label: "Total Spent",
      value: "$2,450",
      icon: Star,
      color: "orange",
    },
    {
      label: "Wishlist",
      value: "8",
      icon: Heart,
      color: "red",
    },
  ];

  const quickLinks = [
    {
      title: "Explore Tours",
      description: "Browse and book new experiences",
      href: "/listings",
      icon: MapPin,
    },
    {
      title: "My Bookings",
      description: "View your tour reservations",
      href: "/dashboard/tourist/bookings",
      icon: Calendar,
    },
    {
      title: "My Reviews",
      description: "See your tour reviews",
      href: "/dashboard/tourist/reviews",
      icon: Star,
    },
    {
      title: "Wishlist",
      description: "View saved tours",
      href: "/dashboard/tourist/wishlist",
      icon: Heart,
    },
  ];

  return (
    <ProtectedRoute allowedRoles={["tourist"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Welcome back!"
          description="Manage your tours and bookings"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <UpcomingBookings />
            <PastBookings />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickLinks.map((link) => (
                  <Link key={link.title} href={link.href}>
                    <div className="p-4 border-2 rounded-lg hover:border-blue-500 transition-all cursor-pointer h-full">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <link.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {link.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {link.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Jazz Bar Tour
                      </h3>
                      <p className="text-sm text-gray-600">
                        New Orleans • June 15, 2024
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Confirmed
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">2 guests • $150</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Street Food Tour
                      </h3>
                      <p className="text-sm text-gray-600">
                        Bangkok • July 10, 2024
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">4 guests • $200</span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Featured Tours for You</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  {/* <Image
                    src="/images/placeholder.jpg"
                    alt="Tour"
                    fill
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  /> */}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Historical Rome Walking Tour
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Explore ancient history with expert guides
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">$65</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  {/* <Image
                    src="/images/placeholder.jpg"
                    alt="Tour"
                    fill
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  /> */}
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Tokyo Night Experience
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Discover Tokyo&apos;s vibrant nightlife scene
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">$85</span>
                    <Button size="sm">Book Now</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default TouristDashboardPage;