export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "tourist" | "guide";
  bio?: string;
  languagesSpoken?: string[];
  expertise?: string[];
  dailyRate?: number;
  travelPreferences?: string[];
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "tourist" | "guide" | "admin";
  profilePic?: string;
  isVerified: boolean;
  isActive: boolean;
}
export interface GuideUser extends AuthUser {
  bio?: string;
  languagesSpoken?: string[];
  expertise?: string[];
  dailyRate?: number;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface TokenPayload {
  userId: string;
  email: string;
  role: "tourist" | "guide" | "admin";
  iat?: number;
  exp?: number;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface RefreshTokenData {
  refreshToken: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}