import { apiService } from "./api.service";

import {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ForgotPasswordData,
  ResetPasswordData,
  ChangePasswordData,
  RefreshTokenData,
  AuthUser,
} from "../types";
import { AUTH_ENDPOINTS } from "../constants";

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      AUTH_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data.data!;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      AUTH_ENDPOINTS.REGISTER,
      data
    );
    return response.data.data!;
  }

  async logout(): Promise<void> {
    await apiService.post(AUTH_ENDPOINTS.LOGOUT);
  }

  async getProfile(): Promise<AuthUser> {
    const response = await apiService.get<AuthUser>(AUTH_ENDPOINTS.ME);
    return response.data.data!;
  }

  async refreshToken(data: RefreshTokenData): Promise<{ accessToken: string }> {
    const response = await apiService.post<{ accessToken: string }>(
      AUTH_ENDPOINTS.REFRESH_TOKEN,
      data
    );
    return response.data.data!;
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiService.post(AUTH_ENDPOINTS.CHANGE_PASSWORD, data);
  }

  async forgotPassword(data: ForgotPasswordData): Promise<void> {
    await apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, data);
  }

  async resetPassword(data: ResetPasswordData): Promise<void> {
    await apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
  }
}

export const authService = new AuthService();
export default authService;
