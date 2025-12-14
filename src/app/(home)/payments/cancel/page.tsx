"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";

export default function PaymentCancelPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="container px-4 max-w-2xl">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
              <CardTitle className="text-center">Payment Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-center text-gray-600">
                Your payment has been cancelled. Your booking is not confirmed yet.
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Your booking has not been finalized. Please complete your payment to secure your reservation.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">What you can do:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Go back and try a different payment method</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Check that your payment details are correct</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Contact your bank if the issue persists</span>
                  </li>
                  <li className="flex gap-2">
                    <span>•</span>
                    <span>Contact our support team for assistance</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => router.back()} className="flex-1">
                  Try Again
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/bookings")}
                  className="flex-1"
                >
                  View My Bookings
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  Need help? Visit our <a href="#" className="font-semibold hover:underline">support center</a> or contact us at support@echoguide.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
