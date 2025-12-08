"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  User,
  Clock,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/src/utils/formatDate";

interface RecentBooking {
  id: string;
  listingTitle: string;
  touristName?: string;
  guideName?: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount?: number;
}

interface RecentActivityProps {
  bookings: RecentBooking[];
  userRole: "tourist" | "guide" | "admin";
  title?: string;
}

export const RecentActivity = ({
  bookings,
  userRole,
  title = "Recent Bookings",
}: RecentActivityProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        <Link href={`/dashboard/${userRole}/bookings`}>
          <Button variant="ghost" size="sm">
            View All
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No recent bookings</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {booking.listingTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      {userRole === "guide" && booking.touristName && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{booking.touristName}</span>
                        </div>
                      )}
                      {userRole === "tourist" && booking.guideName && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{booking.guideName}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(booking.date, "MMM dd, yyyy")}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(booking.status)} border`}>
                    {booking.status}
                  </Badge>
                </div>

                {booking.amount && (
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-lg font-semibold text-gray-900">
                      ${booking.amount}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;