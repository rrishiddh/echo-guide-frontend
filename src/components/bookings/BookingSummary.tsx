"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Booking } from "@/src/types";
import { Calendar, Clock, Users, DollarSign } from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";

interface BookingSummaryProps {
  booking: Booking;
}

export const BookingSummary = ({ booking }: BookingSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Date</span>
            </div>
            <span className="font-medium text-gray-900">
              {formatDate(booking.bookingDate, "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Time</span>
            </div>
            <span className="font-medium text-gray-900">
              {formatTime(booking.startTime)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-4 h-4" />
              <span className="text-sm">Guests</span>
            </div>
            <span className="font-medium text-gray-900">
              {booking.numberOfPeople}
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">
              {formatPrice(booking.totalPrice)}
            </span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-gray-600" />
            <span className="font-semibold text-gray-900">Total</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(booking.totalPrice)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;