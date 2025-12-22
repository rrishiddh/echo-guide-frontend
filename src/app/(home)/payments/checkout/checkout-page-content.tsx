"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import BackButton from "@/src/components/common/BackButton";
import { Loader2, AlertCircle, Lock } from "lucide-react";
import { toast } from "sonner";
import { useBookings } from "@/src/hooks/useBookings";
import CheckoutForm from "@/src/components/payments/CheckoutForm";
import PaymentSummary from "@/src/components/payments/PaymentSummary";
import PriceBreakdown from "@/src/components/payments/PriceBreakdown";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { usePayments } from "@/src/hooks/usePayments";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CheckoutPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const { booking, fetchBooking, isLoading } = useBookings();
  const { createPaymentIntent } = usePayments();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    if (!bookingId) {
      setError("Missing booking ID");
      return;
    }

    fetchBooking(bookingId);
  }, [bookingId, fetchBooking]);

  useEffect(() => {
    const fetchClientSecret = async () => {
      if (!booking) return;

      try {
        setLoadingPayment(true);
        const result = await createPaymentIntent({ bookingId: booking.id });
        setClientSecret(result.clientSecret);
      } catch (err) {
        console.error("Failed to create payment intent:", err);
        toast.error("Failed to initialize payment");
      } finally {
        setLoadingPayment(false);
      }
    };

    fetchClientSecret();
  }, [booking, bookingId, createPaymentIntent]);

  const handlePaymentSuccess = () => {
    toast.success("Payment successful!");
    router.push(`/payments/success?bookingId=${bookingId}`);
  };

  if (isLoading || loadingPayment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-gray-700">{error || "Booking not found"}</p>
            <Button onClick={() => router.push("/bookings")} className="mt-4">
              Back to Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader title="Secure Checkout">
          <BackButton fallbackUrl="/bookings" />
        </PageHeader>

        <div className="container px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  bookingId={booking.id}
                  amount={booking.totalPrice}
                  clientSecret={clientSecret}
                  onSuccess={handlePaymentSuccess}
                />
              </Elements>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Secure Payment</p>
                    <p className="text-sm text-green-800">
                      Payments are encrypted and processed securely
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* RIGHT */}
            <div className="space-y-6">
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
                  serviceFee: booking.totalPrice * 0.1,
                  tax: booking.totalPrice * 0.08,
                  total: booking.totalPrice,
                }}
                showBreakdown
              />

              <PriceBreakdown
                basePrice={booking.listing?.tourFee || 0}
                numberOfPeople={booking.numberOfPeople}
                serviceFeePercentage={10}
                taxPercentage={8}
                showTotal
              />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CheckoutPageContent;
