"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Booking } from "@/src/types";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";
import { formatPrice } from "@/src/utils/formatPrice";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useUserRole } from "@/src/hooks/useUserRole";
import { useBookings } from "@/src/hooks/useBookings";
import BookingStatus from "./BookingStatus";
import BookingSummary from "./BookingSummary";
import BookingTimeline from "./BookingTimeline";

interface BookingDetailProps {
  booking: Booking;
  onUpdate?: () => void;
}

export const BookingDetail = ({ booking, onUpdate }: BookingDetailProps) => {
  const { updateBookingStatus, cancelBooking, isLoading } = useBookings();
  const { isGuide, isTourist } = useUserRole();
  const [cancellationReason, setCancellationReason] = useState("");

  const canConfirm = isGuide && booking.status === "pending";
  const canReject = isGuide && booking.status === "pending";
  const canCancel =
    (isTourist || isGuide) &&
    (booking.status === "pending" || booking.status === "confirmed");
  const canComplete = isGuide && booking.status === "confirmed";

  const handleConfirm = async () => {
    try {
      await updateBookingStatus(booking.id, { status: "confirmed" });
      toast.success("Booking confirmed");
      onUpdate?.();
    } catch (error) {
      console.error("Failed to confirm booking:", error);
    }
  };

  const handleReject = async () => {
    try {
      await updateBookingStatus(booking.id, {
        status: "rejected",
        rejectionReason: "Guide unavailable",
      });
      toast.success("Booking rejected");
      onUpdate?.();
    } catch (error) {
      console.error("Failed to reject booking:", error);
    }
  };

  const handleCancel = async () => {
    if (!cancellationReason.trim()) {
      toast.error("Please provide a cancellation reason");
      return;
    }

    try {
      await cancelBooking(booking.id, { cancellationReason });
      toast.success("Booking cancelled");
      onUpdate?.();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  const handleComplete = async () => {
    try {
      await updateBookingStatus(booking.id, { status: "completed" });
      toast.success("Booking marked as completed");
      onUpdate?.();
    } catch (error) {
      console.error("Failed to complete booking:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Booking Details</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Booking ID: #{booking.id.slice(0, 8)}
              </p>
            </div>
            <BookingStatus status={booking.status} />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Tour Information</h3>
              <div>
                <p className="text-sm text-gray-600 mb-1">Tour Name</p>
                <p className="font-medium text-gray-900">
                  {booking.listing?.title}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Guide</p>
                <p className="font-medium text-gray-900">{booking.guide?.name}</p>
              </div>
              {isTourist && (
                <div>
                  <p className="text-sm text-gray-600 mb-1">Guide Contact</p>
                  <p className="font-medium text-gray-900">
                    {booking.guide?.email}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Booking Information</h3>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(booking.bookingDate, "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium text-gray-900">
                    {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Number of Guests</p>
                  <p className="font-medium text-gray-900">
                    {booking.numberOfPeople}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Meeting Point</p>
                  <p className="font-medium text-gray-900">
                    {booking.listing?.meetingPoint || "To be confirmed"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {booking.specialRequests && (
            <>
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold text-gray-900">Special Requests</h3>
                </div>
                <p className="text-gray-700">{booking.specialRequests}</p>
              </div>
            </>
          )}

          <Separator />

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-semibold text-gray-900">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <Badge
                  variant={
                    booking.paymentStatus === "paid" ? "default" : "secondary"
                  }
                >
                  {booking.paymentStatus}
                </Badge>
              </div>
            </div>
          </div>

          {(booking.cancellationReason || booking.cancelledAt) && (
            <>
              <Separator />
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-900 mb-1">
                      Cancellation Information
                    </p>
                    {booking.cancellationReason && (
                      <p className="text-sm text-red-800 mb-2">
                        Reason: {booking.cancellationReason}
                      </p>
                    )}
                    {booking.cancelledAt && (
                      <p className="text-xs text-red-700">
                        Cancelled on {formatDate(booking.cancelledAt, "MMM dd, yyyy")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-3">
            {canConfirm && (
              <Button onClick={handleConfirm} disabled={isLoading}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
            )}

            {canReject && (
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isLoading}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Booking
              </Button>
            )}

            {canComplete && (
              <Button variant="outline" onClick={handleComplete} disabled={isLoading}>
                Mark as Completed
              </Button>
            )}

            {canCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Cancel Booking</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Booking</AlertDialogTitle>
                    <AlertDialogDescription>
                      Please provide a reason for cancelling this booking.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <Textarea
                    placeholder="Reason for cancellation..."
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    rows={4}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancel}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Cancel Booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BookingSummary booking={booking} />
        <BookingTimeline booking={booking} />
      </div>
    </div>
  );
};

export default BookingDetail;