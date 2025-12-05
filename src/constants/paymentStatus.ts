export const PAYMENT_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  FAILED: "failed",
  REFUNDED: "refunded",
  PARTIALLY_REFUNDED: "partially_refunded",
  CANCELLED: "cancelled",
} as const;

export type PaymentStatus = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];

export const PAYMENT_STATUS_LABELS = {
  [PAYMENT_STATUS.PENDING]: "Pending",
  [PAYMENT_STATUS.PROCESSING]: "Processing",
  [PAYMENT_STATUS.COMPLETED]: "Completed",
  [PAYMENT_STATUS.FAILED]: "Failed",
  [PAYMENT_STATUS.REFUNDED]: "Refunded",
  [PAYMENT_STATUS.PARTIALLY_REFUNDED]: "Partially Refunded",
  [PAYMENT_STATUS.CANCELLED]: "Cancelled",
} as const;

export const PAYMENT_STATUS_DESCRIPTIONS = {
  [PAYMENT_STATUS.PENDING]: "Payment is awaiting confirmation",
  [PAYMENT_STATUS.PROCESSING]: "Payment is being processed",
  [PAYMENT_STATUS.COMPLETED]: "Payment completed successfully",
  [PAYMENT_STATUS.FAILED]: "Payment failed. Please try again",
  [PAYMENT_STATUS.REFUNDED]: "Payment has been refunded",
  [PAYMENT_STATUS.PARTIALLY_REFUNDED]: "Payment has been partially refunded",
  [PAYMENT_STATUS.CANCELLED]: "Payment was cancelled",
} as const;

export const PAYMENT_STATUS_COLORS = {
  [PAYMENT_STATUS.PENDING]: "bg-yellow-100 text-yellow-800 border-yellow-300",
  [PAYMENT_STATUS.PROCESSING]: "bg-blue-100 text-blue-800 border-blue-300",
  [PAYMENT_STATUS.COMPLETED]: "bg-green-100 text-green-800 border-green-300",
  [PAYMENT_STATUS.FAILED]: "bg-red-100 text-red-800 border-red-300",
  [PAYMENT_STATUS.REFUNDED]: "bg-gray-100 text-gray-800 border-gray-300",
  [PAYMENT_STATUS.PARTIALLY_REFUNDED]:
    "bg-orange-100 text-orange-800 border-orange-300",
  [PAYMENT_STATUS.CANCELLED]: "bg-gray-100 text-gray-800 border-gray-300",
} as const;

export const PAYMENT_METHOD = {
  STRIPE: "stripe",
  CARD: "card",
  BANK_TRANSFER: "bank_transfer",
  WALLET: "wallet",
} as const;

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHOD.STRIPE]: "Stripe",
  [PAYMENT_METHOD.CARD]: "Credit/Debit Card",
  [PAYMENT_METHOD.BANK_TRANSFER]: "Bank Transfer",
  [PAYMENT_METHOD.WALLET]: "Digital Wallet",
} as const;

export const CURRENCY = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
  JPY: "JPY",
  AUD: "AUD",
  CAD: "CAD",
} as const;

export type Currency = (typeof CURRENCY)[keyof typeof CURRENCY];

export const CURRENCY_SYMBOLS = {
  [CURRENCY.USD]: "$",
  [CURRENCY.EUR]: "€",
  [CURRENCY.GBP]: "£",
  [CURRENCY.JPY]: "¥",
  [CURRENCY.AUD]: "A$",
  [CURRENCY.CAD]: "C$",
} as const;

export const getCurrencySymbol = (currency: Currency = CURRENCY.USD): string => {
  return CURRENCY_SYMBOLS[currency] || currency;
};

export const formatCurrency = (
  amount: number,
  currency: Currency = CURRENCY.USD
): string => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toFixed(2)}`;
};

export const getPaymentStatusLabel = (status: PaymentStatus): string => {
  return PAYMENT_STATUS_LABELS[status] || status;
};

export const isPaymentSuccessful = (status: PaymentStatus): boolean => {
  return status === PAYMENT_STATUS.COMPLETED;
};

export const isPaymentFailed = (status: PaymentStatus): boolean => {
  const failedStatuses: PaymentStatus[] = [
    PAYMENT_STATUS.FAILED,
    PAYMENT_STATUS.CANCELLED,
  ];
  return failedStatuses.includes(status);
};
