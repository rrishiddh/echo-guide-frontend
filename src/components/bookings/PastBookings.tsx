"use client";

import { useMemo, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingStatus } from "./BookingStatus";
import { Calendar, Star, ExternalLink } from "lucide-react";
import { formatDate } from "@/src/utils/formatDate";
import { formatPrice } from "@/src/utils/formatPrice";
import Link from "next/link";
import { useBookings } from "@/src/hooks/useBookings";

export const PastBookings = () => {
  const { bookings, fetchMyBookings, isLoading } = useBookings();

  const loadBookings = useCallback(async () => {
    await fetchMyBookings({
      status: "completed",
      sortBy: "-bookingDate",
      limit: 5,
    });
  }, [fetchMyBookings]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const pastBookings = useMemo(() => {
    return bookings.filter((booking) => booking.status === "completed");
  }, [bookings]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Past Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Past Bookings</CardTitle>
        <Link href="/bookings?status=completed">
          <Button variant="ghost" size="sm">
            View All
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>

      <CardContent>
        {pastBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No past bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pastBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {booking.listing?.title}
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(booking.bookingDate, "MMM dd, yyyy")}</span>
                    </div>
                  </div>
                  <BookingStatus status={booking.status} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-sm text-gray-600">
                    {formatPrice(booking.totalPrice)}
                  </span>

                  <Link href={`/reviews/${booking.id}`}>
                    <Button variant="outline" size="sm">
                      <Star className="w-4 h-4 mr-1" />
                      Leave Review
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PastBookings;
