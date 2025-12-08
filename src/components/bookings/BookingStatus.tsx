"use client";

import { Badge } from "@/components/ui/badge";
import { BookingStatus as BookingStatusType } from "@/src/types";

import {
  BOOKING_STATUS_COLORS,
  BOOKING_STATUS_ICONS,
  BOOKING_STATUS_LABELS,
} from "@/src/constants/bookingStatus";

interface BookingStatusProps {
  status: BookingStatusType;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

export const BookingStatus = ({
  status,
  showIcon = true,
  size = "md",
}: BookingStatusProps) => {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <Badge
      className={`${BOOKING_STATUS_COLORS[status]} ${sizeClasses[size]} border`}
    >
      {showIcon && <span className="mr-1">{BOOKING_STATUS_ICONS[status]}</span>}
      {BOOKING_STATUS_LABELS[status]}
    </Badge>
  );
};

export default BookingStatus;
