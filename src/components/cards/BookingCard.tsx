"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Booking } from "@/src/types";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";
import BookingStatus from "../bookings/BookingStatus";

interface BookingCardProps {
  booking: Booking;
  userRole?: "tourist" | "guide";
}

export const BookingCard = ({ booking, userRole = "tourist" }: BookingCardProps) => {
  return (
    <Link href={`/bookings/${booking.id}`}>
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
                {booking.listing?.title || "Tour"}
              </h3>
              <p className="text-sm text-gray-600">
                {userRole === "guide"
                  ? `Tourist: ${booking.tourist?.name}`
                  : `Guide: ${booking.guide?.name}`}
              </p>
            </div>
            <BookingStatus status={booking.status} />
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(booking.bookingDate, "MMM dd, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>
                {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>
                {booking.numberOfPeople}{" "}
                {booking.numberOfPeople === 1 ? "guest" : "guests"}
              </span>
            </div>
            {booking.listing?.meetingPoint && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{booking.listing.meetingPoint}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <span className="text-sm text-gray-600">Total Amount</span>
              <p className="text-xl font-bold text-gray-900">
                {formatPrice(booking.totalPrice)}
              </p>
            </div>
            <Button size="sm" variant="outline">
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookingCard;