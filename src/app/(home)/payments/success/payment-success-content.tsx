"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import {
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Users,
} from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";
import { useBookings } from "@/src/hooks/useBookings";
import PaymentHistory from "@/src/components/payments/PaymentHistory";

const PaymentSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";

  const { booking, fetchBooking, isLoading } = useBookings();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!bookingId) return;

    fetchBooking(bookingId);
    setShowConfetti(true);

    const timer = setTimeout(() => setShowConfetti(false), 2000);
    return () => clearTimeout(timer);
  }, [bookingId, fetchBooking]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-700">Booking not found</p>
            <Button onClick={() => router.push("/bookings")} className="mt-4">
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="fixed animate-bounce"
                style={{
                                      // eslint-disable-next-line react-hooks/purity
                  left: Math.random() * 100 + "%",
                  top: "-10px",
                                    // eslint-disable-next-line react-hooks/purity
                  animation: `fall ${2 + Math.random()}s linear`,
                }}
              >
                🎉
              </div>
            ))}
          </div>
        )}

        <div className="container px-4 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              Payment Successful!
            </h1>
            <p className="text-gray-600">
              Your booking has been confirmed. Check your email for details.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  {booking.listing?.title}
                </h3>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {formatDate(booking.bookingDate, "MMMM dd, yyyy")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(booking.startTime)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {booking.numberOfPeople}{" "}
                      {booking.numberOfPeople === 1 ? "guest" : "guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.listing?.meetingPoint}</span>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="font-medium text-gray-900 mb-3">Tour Guide</h4>
                <p className="text-gray-700 font-medium">
                  {booking.guide?.name}
                </p>
                <p className="text-sm text-gray-600">
                  {booking.guide?.email}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking ID</span>
                  <span className="font-medium text-gray-900">
                    #{booking.id.slice(0, 8)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Payment Amount</span>
                  <span className="font-medium text-gray-900">
                    {formatPrice(booking.totalPrice)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <Badge className="bg-green-500">Confirmed</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <PaymentHistory />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1"
              onClick={() =>
                router.push("/dashboard/tourist/bookings")
              }
            >
              View My Bookings
            </Button>

            <Link href={`/listings/${booking.listing?.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                View Tour Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PaymentSuccessContent;
