/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CreditCard, Lock } from "lucide-react";
import { toast } from "sonner";
import { usePayments } from "@/src/hooks/usePayments";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

interface CheckoutFormProps {
  bookingId: string;
  amount: number;
  clientSecret: string;
  onSuccess?: () => void;
}

const CheckoutForm = ({ bookingId, amount, clientSecret, onSuccess }: CheckoutFormProps) => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const { createPaymentIntent, isLoading } = usePayments();

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    if (!formData.cardholderName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error("Card element not found");
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.cardholderName,
            email: formData.email,
          },
        },
      });

      if (error) {
        toast.error(error.message || "Payment failed");
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
        onSuccess?.();
      }
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(err.message || "Payment failed");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Payment Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardholderName">Cardholder Name *</Label>
              <Input
                id="cardholderName"
                name="cardholderName"
                type="text"
                placeholder="John Doe"
                value={formData.cardholderName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label>Card Details *</Label>
              <div className="border rounded-md p-3">
                <CardElement />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Secure Payment
                </p>
                <p className="text-xs text-blue-700">
                  Your payment information is encrypted and secure. We never store
                  your card details.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-relaxed cursor-pointer"
            >
              I agree to the{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isLoading || !acceptTerms}
          >
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                Pay ${amount.toFixed(2)}
                <Lock className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CheckoutForm;
