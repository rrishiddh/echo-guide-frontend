/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import paymentService from "@/src/services/payment.service";

interface RefundRequestProps {
  paymentId: string;
  amount: number;
  onSuccess?: () => void;
}

const refundReasons = [
  { value: "duplicate", label: "Duplicate payment" },
  { value: "cancelled", label: "Tour cancelled by guide" },
  { value: "notSatisfied", label: "Not satisfied with service" },
  { value: "wrongDate", label: "Booked wrong date" },
  { value: "emergency", label: "Personal emergency" },
  { value: "other", label: "Other reason" },
];

export const RefundRequest = ({
  paymentId,
  amount,
  onSuccess,
}: RefundRequestProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    reason: "",
    description: "",
    refundType: "full",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.reason) {
      toast.error("Please select a reason for refund");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Please provide additional details");
      return;
    }

    setIsSubmitting(true);

    try {
      await paymentService.refundPayment(paymentId, {
        amount: formData.refundType === "full" ? amount : undefined,
        reason: `${formData.reason}: ${formData.description}`,
      });

      setSuccess(true);
      toast.success("Refund request submitted successfully");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to submit refund request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Refund Request Submitted
            </h3>
            <p className="text-gray-600 mb-6">
              Your refund request has been submitted successfully. We&apos;ll review
              it and process the refund within 5-7 business days.
            </p>
            <Button onClick={() => window.location.reload()}>Close</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Refund</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Alert>
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Please review our refund policy before submitting a request.
              Refunds are processed within 5-7 business days.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Label>Refund Type</Label>
            <RadioGroup
              value={formData.refundType}
              onValueChange={(value) =>
                setFormData({ ...formData, refundType: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full" className="cursor-pointer">
                  Full refund (${amount.toFixed(2)})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="partial" />
                <Label htmlFor="partial" className="cursor-pointer">
                  Partial refund
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label>Reason for Refund *</Label>
            <RadioGroup
              value={formData.reason}
              onValueChange={(value) =>
                setFormData({ ...formData, reason: value })
              }
            >
              {refundReasons.map((reason) => (
                <div key={reason.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.value} id={reason.value} />
                  <Label htmlFor={reason.value} className="cursor-pointer">
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label htmlFor="description">Additional Details *</Label>
            <Textarea
              id="description"
              placeholder="Please provide more information about your refund request..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={5}
              required
            />
            <p className="text-xs text-gray-500">
              Providing detailed information helps us process your request
              faster
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Refund requests are reviewed on a
              case-by-case basis. Approved refunds will be credited back to your
              original payment method within 5-7 business days.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
export default RefundRequest;
