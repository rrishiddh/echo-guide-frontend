/* eslint-disable @typescript-eslint/no-explicit-any */
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Welcome back! You've successfully logged in.",
  LOGOUT_SUCCESS: "You've been logged out successfully.",
  REGISTER_SUCCESS: "Account created successfully! Welcome aboard.",
  PASSWORD_CHANGED: "Your password has been changed successfully.",
  PASSWORD_RESET_SENT: "Password reset instructions sent to your email.",

  PROFILE_UPDATED: "Your profile has been updated successfully.",
  PROFILE_PICTURE_UPDATED: "Profile picture updated successfully.",

  LISTING_CREATED: "Tour listing created successfully!",
  LISTING_UPDATED: "Tour listing updated successfully.",
  LISTING_DELETED: "Tour listing deleted successfully.",

  BOOKING_CREATED: "Booking request sent successfully! Waiting for guide confirmation.",
  BOOKING_CONFIRMED: "Booking confirmed successfully!",
  BOOKING_CANCELLED: "Booking cancelled successfully.",
  BOOKING_COMPLETED: "Booking marked as completed.",

  REVIEW_SUBMITTED: "Thank you for your review!",
  REVIEW_UPDATED: "Review updated successfully.",
  REVIEW_DELETED: "Review deleted successfully.",
  REVIEW_HELPFUL: "Thanks for your feedback!",

  PAYMENT_SUCCESS: "Payment successful! Your booking is confirmed.",
  REFUND_SUCCESS: "Refund processed successfully.",

  SAVE_SUCCESS: "Changes saved successfully.",
  DELETE_SUCCESS: "Deleted successfully.",
  COPY_SUCCESS: "Copied to clipboard!",
  EMAIL_SENT: "Email sent successfully.",
} as const;

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: "Invalid email or password. Please try again.",
  UNAUTHORIZED: "You need to be logged in to access this page.",
  SESSION_EXPIRED: "Your session has expired. Please login again.",
  EMAIL_EXISTS: "An account with this email already exists.",
  WEAK_PASSWORD: "Password is too weak. Please choose a stronger password.",

  REQUIRED_FIELD: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PHONE: "Please enter a valid phone number.",
  INVALID_DATE: "Please select a valid date.",
  PASSWORD_MISMATCH: "Passwords do not match.",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters.`,
  MAX_LENGTH: (max: number) => `Cannot exceed ${max} characters.`,

  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Something went wrong. Please try again later.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",

  NOT_FOUND: "The requested resource was not found.",
  PAGE_NOT_FOUND: "Page not found. The page you're looking for doesn't exist.",
  USER_NOT_FOUND: "User not found.",
  LISTING_NOT_FOUND: "Tour listing not found.",
  BOOKING_NOT_FOUND: "Booking not found.",

  FORBIDDEN: "You don't have permission to perform this action.",
  ADMIN_ONLY: "This action is only available to administrators.",
  GUIDE_ONLY: "This action is only available to guides.",

  FILE_TOO_LARGE: "File size is too large. Maximum size is 5MB.",
  INVALID_FILE_TYPE: "Invalid file type. Only images are allowed.",
  UPLOAD_FAILED: "File upload failed. Please try again.",

  BOOKING_UNAVAILABLE: "This tour is not available for the selected date.",
  BOOKING_CONFLICT: "You already have a booking at this time.",
  PAST_DATE: "Cannot book tours in the past.",

  PAYMENT_FAILED: "Payment failed. Please try again or use a different payment method.",
  PAYMENT_CANCELLED: "Payment was cancelled.",
  INSUFFICIENT_FUNDS: "Payment failed due to insufficient funds.",

  ALREADY_REVIEWED: "You have already reviewed this booking.",
  REVIEW_NOT_ALLOWED: "You can only review completed bookings.",

  SOMETHING_WENT_WRONG: "Oops! Something went wrong. Please try again.",
  TRY_AGAIN: "Something went wrong. Please try again.",
  INVALID_INPUT: "Invalid input. Please check your data.",
  OPERATION_FAILED: "Operation failed. Please try again.",
} as const;

export const WARNING_MESSAGES = {
  UNSAVED_CHANGES: "You have unsaved changes. Are you sure you want to leave?",
  DELETE_CONFIRMATION: "Are you sure you want to delete this? This action cannot be undone.",
  CANCEL_BOOKING: "Are you sure you want to cancel this booking?",
  LOGOUT_CONFIRMATION: "Are you sure you want to logout?",
  PERMANENT_ACTION: "This action is permanent and cannot be reversed.",
} as const;

export const INFO_MESSAGES = {
  LOADING: "Loading...",
  PROCESSING: "Processing your request...",
  PLEASE_WAIT: "Please wait...",
  NO_RESULTS: "No results found.",
  EMPTY_LIST: "Nothing here yet.",
  COMING_SOON: "This feature is coming soon!",
  UNDER_DEVELOPMENT: "This feature is under development.",
  MAINTENANCE: "We're currently undergoing maintenance. Please check back soon.",
} as const;

export const CONFIRMATION_MESSAGES = {
  DELETE_LISTING: "Are you sure you want to delete this listing?",
  DELETE_ACCOUNT: "Are you sure you want to delete your account? This action is permanent.",
  CANCEL_BOOKING: "Are you sure you want to cancel this booking?",
  REJECT_BOOKING: "Are you sure you want to reject this booking request?",
  LOGOUT: "Are you sure you want to logout?",
} as const;

export const PLACEHOLDER_MESSAGES = {
  SEARCH: "Search tours, destinations, guides...",
  EMAIL: "Enter your email",
  PASSWORD: "Enter your password",
  NAME: "Enter your name",
  MESSAGE: "Type your message here...",
  REVIEW: "Share your experience...",
  BIO: "Tell us about yourself...",
  TITLE: "Enter a title",
  DESCRIPTION: "Describe your tour...",
  SELECT: "Select an option",
  DATE: "Select a date",
  TIME: "Select time",
} as const;

export const getErrorMessage = (error: any): string => {
  if (typeof error === "string") return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.message) return error.response.data.message;
  return ERROR_MESSAGES.SOMETHING_WENT_WRONG;
};

export const TOAST_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info",
} as const;

export type ToastType = (typeof TOAST_TYPES)[keyof typeof TOAST_TYPES];