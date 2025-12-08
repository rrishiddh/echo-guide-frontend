"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking } from "@/src/types";
import { formatDate } from "@/src/utils/formatDate";
import { CheckCircle, Clock, XCircle, Calendar } from "lucide-react";

interface BookingTimelineProps {
  booking: Booking;
}

export const BookingTimeline = ({ booking }: BookingTimelineProps) => {
  const events = [
    {
      title: "Booking Created",
      date: booking.createdAt,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      completed: true,
    },
    {
      title:
        booking.status === "confirmed"
          ? "Booking Confirmed"
          : booking.status === "rejected"
          ? "Booking Rejected"
          : "Awaiting Confirmation",
      date: booking.updatedAt,
      icon: booking.status === "confirmed" ? CheckCircle : booking.status === "rejected" ? XCircle : Clock,
      color:
        booking.status === "confirmed"
          ? "text-green-600"
          : booking.status === "rejected"
          ? "text-red-600"
          : "text-yellow-600",
      bgColor:
        booking.status === "confirmed"
          ? "bg-green-100"
          : booking.status === "rejected"
          ? "bg-red-100"
          : "bg-yellow-100",
      completed: booking.status === "confirmed" || booking.status === "rejected",
    },
  ];

  if (booking.status === "completed" && booking.completedAt) {
    events.push({
      title: "Tour Completed",
      date: booking.completedAt,
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
      completed: true,
    });
  }

  if (booking.status === "cancelled" && booking.cancelledAt) {
    events.push({
      title: "Booking Cancelled",
      date: booking.cancelledAt,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      completed: true,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full ${event.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  <event.icon className={`w-5 h-5 ${event.color}`} />
                </div>
                {index < events.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                )}
              </div>

              <div className="flex-1 pb-4">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {formatDate(event.date, "MMM dd, yyyy HH:mm")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingTimeline;