export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  REJECTED: "rejected",
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const BOOKING_STATUS_LABELS = {
  [BOOKING_STATUS.PENDING]: "Pending",
  [BOOKING_STATUS.CONFIRMED]: "Confirmed",
  [BOOKING_STATUS.CANCELLED]: "Cancelled",
  [BOOKING_STATUS.COMPLETED]: "Completed",
  [BOOKING_STATUS.REJECTED]: "Rejected",
} as const;

export const BOOKING_STATUS_DESCRIPTIONS = {
  [BOOKING_STATUS.PENDING]: "Awaiting guide confirmation",
  [BOOKING_STATUS.CONFIRMED]: "Guide has confirmed your booking",
  [BOOKING_STATUS.CANCELLED]: "Booking has been cancelled",
  [BOOKING_STATUS.COMPLETED]: "Tour has been completed",
  [BOOKING_STATUS.REJECTED]: "Guide has rejected your request",
} as const;

export const BOOKING_STATUS_COLORS = {
  [BOOKING_STATUS.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [BOOKING_STATUS.CONFIRMED]: "bg-blue-100 text-blue-800 border-blue-300",
  [BOOKING_STATUS.CANCELLED]: "bg-red-100 text-red-800 border-red-300",
  [BOOKING_STATUS.COMPLETED]: "bg-green-100 text-green-800 border-green-300",
  [BOOKING_STATUS.REJECTED]: "bg-gray-100 text-gray-800 border-gray-300",
} as const;

export const BOOKING_STATUS_VARIANTS = {
  [BOOKING_STATUS.PENDING]: "warning",
  [BOOKING_STATUS.CONFIRMED]: "info",
  [BOOKING_STATUS.CANCELLED]: "destructive",
  [BOOKING_STATUS.COMPLETED]: "success",
  [BOOKING_STATUS.REJECTED]: "secondary",
};

export const BOOKING_STATUS_ICONS = {
  [BOOKING_STATUS.PENDING]: "⏳",
  [BOOKING_STATUS.CONFIRMED]: "✅",
  [BOOKING_STATUS.CANCELLED]: "❌",
  [BOOKING_STATUS.COMPLETED]: "🎉",
  [BOOKING_STATUS.REJECTED]: "⛔",
} as const;

export const getBookingStatusLabel = (status: BookingStatus): string => {
  return BOOKING_STATUS_LABELS[status] || status;
};

export const getBookingStatusDescription = (status: BookingStatus): string => {
  return BOOKING_STATUS_DESCRIPTIONS[status] || "";
};

export const isActiveBooking = (status: BookingStatus): boolean => {
  const activeStatuses: BookingStatus[] = [
    BOOKING_STATUS.PENDING,
    BOOKING_STATUS.CONFIRMED,
  ];
  return activeStatuses.includes(status);
};

export const isCancellableBooking = (status: BookingStatus): boolean => {
  const cancellable: BookingStatus[] = [
    BOOKING_STATUS.PENDING,
    BOOKING_STATUS.CONFIRMED,
  ];
  return cancellable.includes(status);
};

export const canReviewBooking = (status: BookingStatus): boolean => {
  return status === BOOKING_STATUS.COMPLETED;
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  REFUNDED: "refunded",
  FAILED: "failed",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: "Pending",
  [PAYMENT_STATUS.PAID]: "Paid",
  [PAYMENT_STATUS.REFUNDED]: "Refunded",
  [PAYMENT_STATUS.FAILED]: "Failed",
} as const;

export const PAYMENT_STATUS_COLORS = {
  [PAYMENT_STATUS.PENDING]: "bg-yellow-100 text-yellow-800",
  [PAYMENT_STATUS.PAID]: "bg-green-100 text-green-800",
  [PAYMENT_STATUS.REFUNDED]: "bg-gray-100 text-gray-800",
  [PAYMENT_STATUS.FAILED]: "bg-red-100 text-red-800",
} as const;
