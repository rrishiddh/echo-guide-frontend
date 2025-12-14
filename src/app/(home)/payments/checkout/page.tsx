"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import BackButton from "@/src/components/common/BackButton";
// import { Booking } from "@/types";
import { Lock, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useBookings } from "@/src/hooks/useBookings";
import CheckoutForm from "@/src/components/payments/CheckoutForm";
import StripeCheckout from "@/src/components/payments/StripeCheckout";
import PriceBreakdown from "@/src/components/payments/PriceBreakdown";
import PaymentSummary from "@/src/components/payments/PaymentSummary";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "";
  const clientSecret = searchParams.get("clientSecret");

  const { booking, fetchBooking, isLoading: bookingLoading } = useBookings();
  const [error, setError] = useState("");

  useEffect(() => {
  if (bookingId) {
    fetchBooking(bookingId);
  }
}, [bookingId, fetchBooking]);


  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
    router.push(`/payments/success?bookingId=${bookingId}`);
  };

  if (bookingLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
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
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Secure Checkout" description="Complete your booking payment">
          <BackButton fallbackUrl="/bookings" />
        </PageHeader>

        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Use existing CheckoutForm component */}
              <CheckoutForm
                bookingId={booking.id}
                amount={booking.totalPrice}
                onSuccess={handlePaymentSuccess}
              />

              {/* Alternative: Use Stripe Checkout if you have clientSecret */}
              {clientSecret && (
                <StripeCheckout
                  clientSecret={clientSecret}
                  amount={booking.totalPrice}
                  onSuccess={handlePaymentSuccess}
                />
              )}

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Lock className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-green-900">Secure Payment</p>
                      <p className="text-sm text-green-800 mt-1">
                        All transactions are secured with SSL encryption
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Use existing PaymentSummary component */}
              <PaymentSummary
                booking={{
                  listingTitle: booking.listing?.title || "Tour",
                  listingImage: booking.listing?.images?.[0],
                  guideName: booking.guide?.name || "Guide",
                  date: booking.bookingDate,
                  time: booking.startTime,
                  duration: booking.listing?.duration || 0,
                  numberOfPeople: booking.numberOfPeople,
                  location: booking.listing?.meetingPoint || "Location TBD",
                  basePrice: booking.listing?.tourFee || 0,
                  serviceFee: booking.totalPrice * 0.1, // 10% service fee
                  tax: booking.totalPrice * 0.08, // 8% tax
                  total: booking.totalPrice,
                }}
                showBreakdown={true}
              />

              {/* Optional: Use PriceBreakdown component for detailed view */}
              <PriceBreakdown
                basePrice={booking.listing?.tourFee || 0}
                numberOfPeople={booking.numberOfPeople}
                serviceFeePercentage={10}
                taxPercentage={8}
                showTotal={true}
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}