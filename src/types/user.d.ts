export type UserRole = "tourist" | "guide" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePic?: string;
  bio?: string;
  languagesSpoken?: string[];
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  expertise?: string[];
  dailyRate?: number;
  travelPreferences?: string[];
  stripeCustomerId?: string;
}

export interface TouristProfile extends User {
  role: "tourist";
  travelPreferences?: string[];
  totalBookings?: number;
  totalReviews?: number;
}

export interface GuideProfile extends User {
  role: "guide";
  expertise: string[];
  dailyRate: number;
  rating?: number;
  totalReviews?: number;
  totalTours?: number;
  averageRating?: number;
}

export interface UpdateUserData {
  name?: string;
  bio?: string;
  languagesSpoken?: string[];
  profilePic?: string;
  expertise?: string[];
  dailyRate?: number;
  travelPreferences?: string[];
}

export interface UserStats {
  totalUsers: number;
  totalTourists: number;
  totalGuides: number;
  totalAdmins: number;
  verifiedUsers: number;
  activeUsers: number;
  newUsersThisMonth: number;
}

export interface UserQuery {
  role?: UserRole;
  isVerified?: boolean;
  isActive?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
}

export interface UserListResponse {
  users: User[];
  meta: PaginationMeta;
}