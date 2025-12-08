export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "rejected";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export interface Booking {
  id: string;
  touristId: string;
  guideId: string;
  listingId: string;
  tourist?: User;
  guide?: User;
  listing?: Listing;
  bookingDate: string;
  startTime: string;
  endTime: string;
  numberOfPeople: number;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentIntentId?: string;
  specialRequests?: string;
  cancellationReason?: string;
  cancelledBy?: string;
  cancelledAt?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingData {
  listingId: string;
  bookingDate: string;
  startTime: string;
  numberOfPeople: number;
  specialRequests?: string;
}

export interface UpdateBookingStatusData {
  status: BookingStatus;
  rejectionReason?: string;
}

export interface CancelBookingData {
  cancellationReason: string;
}

export interface BookingQuery {
  touristId?: string;
  guideId?: string;
  listingId?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
}

export interface BookingListResponse {
  bookings: Booking[];
  meta: PaginationMeta;
}

export interface BookingStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  bookingsByStatus: StatusCount[];
  recentBookings: Booking[];
  upcomingBookings: Booking[];
}

export interface StatusCount {
  status: string;
  count: number;
  amount?: number;
}

export interface GuideEarnings {
  totalEarnings: number;
  completedBookings: number;
  pendingEarnings: number;
  averageEarningPerBooking: number;
  earningsByMonth: MonthlyEarnings[];
}

export interface MonthlyEarnings {
  month: string;
  earnings: number;
  bookings: number;
}