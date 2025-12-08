"use client";

import { useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookingStatus } from "./BookingStatus";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";
import Link from "next/link";
import { useBookings } from "@/src/hooks/useBookings";
import { formatPrice } from "@/src/utils/formatPrice";

export const UpcomingBookings = () => {
  const { bookings, fetchMyBookings, isLoading } = useBookings();

  const loadBookings = useCallback(async () => {
    await fetchMyBookings({
      status: "confirmed",
      sortBy: "bookingDate",
      limit: 5,
    });
  }, [fetchMyBookings]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const upcomingBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const bookingDate = new Date(booking.bookingDate);
      return bookingDate >= new Date() && booking.status === "confirmed";
    });
  }, [bookings]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
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
        <CardTitle>Upcoming Bookings</CardTitle>
        <Link href="/bookings">
          <Button variant="ghost" size="sm">
            View All
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {upcomingBookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No upcoming bookings</p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <Link key={booking.id} href={`/bookings/${booking.id}`}>
                <div className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {booking.listing?.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {formatDate(booking.bookingDate, "MMM dd")}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(booking.startTime)}</span>
                        </div>
                      </div>
                    </div>
                    <BookingStatus status={booking.status} />
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(booking.totalPrice)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingBookings;
