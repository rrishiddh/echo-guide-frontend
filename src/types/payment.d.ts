/* eslint-disable @typescript-eslint/no-explicit-any */
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded" | "partially_refunded" | "cancelled";

export type PaymentMethod = "stripe" | "card" | "bank_transfer" | "wallet";

export type TransactionType = "payment" | "refund" | "payout";

export type Currency = "USD" | "EUR" | "GBP" | "JPY" | "AUD" | "CAD";

export interface Payment {
  id: string;
  bookingId: string;
  touristId: string;
  guideId: string;
  booking?: Booking;
  tourist?: User;
  guide?: User;
  amount: number;
  currency: Currency;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionType: TransactionType;
  paymentIntentId?: string;
  clientSecret?: string;
  stripeCustomerId?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: string;
  metadata?: Record<string, any>;
  failureReason?: string;
  processedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePaymentIntentData {
  bookingId: string;
  amount?: number;
}

export interface CreatePaymentIntentResponse {
  paymentId: string;
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export interface ConfirmPaymentData {
  paymentIntentId: string;
  paymentMethodId?: string;
  bookingId?: string;
}

export interface RefundPaymentData {
  amount?: number;
  reason: string;
}

export interface PaymentQuery {
  touristId?: string;
  guideId?: string;
  bookingId?: string;
  status?: PaymentStatus;
  transactionType?: TransactionType;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface PaymentListResponse {
  payments: Payment[];
  meta: PaginationMeta & {
    totalAmount: number;
  };
}

export interface PaymentStats {
  totalPayments: number;
  totalAmount: number;
  completedPayments: number;
  completedAmount: number;
  pendingPayments: number;
  pendingAmount: number;
  refundedPayments: number;
  refundedAmount: number;
  failedPayments: number;
  paymentsByStatus: StatusCount[];
  paymentsByMethod: MethodCount[];
  recentPayments: Payment[];
}

export interface MethodCount {
  method: string;
  count: number;
  amount: number;
}

export interface PriceBreakdown {
  basePrice: number;
  serviceFee: number;
  tax: number;
  discount?: number;
  total: number;
  currency: string;
}