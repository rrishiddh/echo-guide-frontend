"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import BackButton from "@/src/components/common/BackButton";
import {
  XCircle,
  AlertCircle,
  CreditCard,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

const PaymentFailedContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reason = searchParams.get("reason") || "unknown";
  const bookingId = searchParams.get("bookingId");

  const failureReasons: Record<
    string,
    { title: string; message: string; solutions: string[] }
  > = {
    insufficient_funds: {
      title: "Insufficient Funds",
      message: "Your card has insufficient funds to complete this transaction.",
      solutions: [
        "Ensure your card has sufficient available balance",
        "Check if you've reached your daily transaction limit",
        "Try using a different card with more available funds",
        "Contact your bank to increase your card limit",
      ],
    },
    card_declined: {
      title: "Card Declined",
      message: "Your card was declined by your bank or card issuer.",
      solutions: [
        "Contact your bank to check for security blocks",
        "Ask your bank to enable international transactions if applicable",
        "Try a different card",
        "Use an alternative payment method",
      ],
    },
    invalid_card: {
      title: "Invalid Card Details",
      message: "The card information you provided is invalid or incorrect.",
      solutions: [
        "Verify the card number is correct (usually 16 digits)",
        "Check the expiry date (MM/YY format)",
        "Confirm the CVV/CVC code is correct (3-4 digits)",
        "Ensure the cardholder name matches the card",
      ],
    },
    expired_card: {
      title: "Card Expired",
      message: "Your card has expired and can no longer be used.",
      solutions: [
        "Use a different card that is currently valid",
        "Contact your bank to request a replacement card",
        "Update your payment method with your bank",
        "Try a digital wallet payment instead",
      ],
    },
    processing_error: {
      title: "Processing Error",
      message: "An error occurred while processing your payment. Please try again.",
      solutions: [
        "Wait a few moments and try again",
        "Refresh the page and restart the payment process",
        "Try a different payment method",
        "Contact our support team if the problem persists",
      ],
    },
    network_error: {
      title: "Network Error",
      message: "A network error occurred. Please check your connection and try again.",
      solutions: [
        "Check your internet connection",
        "Disable VPN if you're using one",
        "Try again from a different network or device",
        "Wait a few moments and retry the payment",
      ],
    },
    unknown: {
      title: "Payment Failed",
      message: "An unknown error occurred during payment processing.",
      solutions: [
        "Try again with the same payment method",
        "Try a different payment method",
        "Clear your browser cache and cookies",
        "Contact our support team for assistance",
      ],
    },
  };

  const failureInfo = failureReasons[reason] || failureReasons.unknown;

  const handleRetryPayment = () => {
    if (bookingId) {
      router.push(`/payments/checkout?bookingId=${bookingId}`);
    } else {
      router.back();
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          title="Payment Failed"
          description="We couldn't process your payment"
        >
          <BackButton fallbackUrl="/bookings" />
        </PageHeader>

        <div className="container px-4 py-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Error Message */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <div>
                    <h2 className="text-xl font-semibold text-red-900 mb-2">
                      {failureInfo.title}
                    </h2>
                    <p className="text-red-800">{failureInfo.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solutions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  How to Resolve This
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {failureInfo.solutions.map((solution, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={handleRetryPayment} size="lg" className="flex-1">
                <ArrowRight className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/bookings")}
                size="lg"
                className="flex-1"
              >
                View My Bookings
              </Button>
            </div>

            <Separator />

            {/* Support */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Need Additional Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href="mailto:support@echoguide.com"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-100"
                >
                  <Mail className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm">support@echoguide.com</p>
                  </div>
                </a>

                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 p-3 bg-white rounded-lg hover:bg-blue-100"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Call Support</p>
                    <p className="text-sm">+1 (555) 123-4567</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PaymentFailedContent;
