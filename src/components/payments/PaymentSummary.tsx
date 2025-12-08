"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { formatDate } from "@/src/utils/formatDate";
import { formatPrice } from "@/src/utils/formatPrice";

interface BookingDetails {
  listingTitle: string;
  listingImage?: string;
  guideName: string;
  date: string;
  time: string;
  duration: number;
  numberOfPeople: number;
  location: string;
  basePrice: number;
  serviceFee: number;
  tax: number;
  discount?: number;
  total: number;
}

interface PaymentSummaryProps {
  booking: BookingDetails;
  showBreakdown?: boolean;
}

export const PaymentSummary = ({
  booking,
  showBreakdown = true,
}: PaymentSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-4">
          {booking.listingImage && (
            <img
              src={booking.listingImage}
              alt={booking.listingTitle}
              className="w-24 h-24 rounded-lg object-cover"
            />
          )}
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              {booking.listingTitle}
            </h3>
            <p className="text-sm text-gray-600">Hosted by {booking.guideName}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Date:</span>
            <span className="font-medium text-gray-900">
              {formatDate(booking.date, "MMM dd, yyyy")}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Time:</span>
            <span className="font-medium text-gray-900">
              {booking.time} ({booking.duration}h)
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Guests:</span>
            <span className="font-medium text-gray-900">
              {booking.numberOfPeople} {booking.numberOfPeople === 1 ? "person" : "people"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600">Location:</span>
            <span className="font-medium text-gray-900">{booking.location}</span>
          </div>
        </div>

        {showBreakdown && (
          <>
            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Base price (${booking.basePrice} × {booking.numberOfPeople})
                </span>
                <span className="font-medium text-gray-900">
                  {formatPrice(booking.basePrice * booking.numberOfPeople)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(booking.serviceFee)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-gray-900">
                  {formatPrice(booking.tax)}
                </span>
              </div>

              {booking.discount && booking.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Discount</span>
                  <span className="font-medium text-green-600">
                    -{formatPrice(booking.discount)}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="font-bold text-2xl text-gray-900">
                  {formatPrice(booking.total)}
                </span>
              </div>
            </div>
          </>
        )}

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-800 text-center">
            <Badge variant="secondary" className="bg-green-600 text-white mr-2">
              FREE
            </Badge>
            Free cancellation up to 24 hours before the tour
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;