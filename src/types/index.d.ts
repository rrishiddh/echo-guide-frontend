export * from "./auth";
export * from "./user";
export * from "./listing";
export * from "./booking";
export * from "./payment";
export * from "./review";
export * from "./api";
export * from "./common";

export type UserRole = "tourist" | "guide" | "admin";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed" | "rejected";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";
export type ListingStatus = "active" | "inactive" | "draft";
export type TourCategory = 
  | "Food"
  | "Art"
  | "Adventure"
  | "History"
  | "Culture"
  | "Nightlife"
  | "Shopping"
  | "Nature"
  | "Photography"
  | "Sports"
  | "Wellness"
  | "Family";

export interface GlobalState {
  auth: {
    user: AuthUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  };
  ui: {
    theme: "light" | "dark";
    sidebarOpen: boolean;
    notifications: Notification[];
  };
}