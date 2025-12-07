/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { USER_ENDPOINTS } from "../constants";
import {
  User,
  UpdateUserData,
  UserQuery,
  UserListResponse,
  UserStats,
  GuideProfile,
} from "../types";

class UserService {
  async getUser(id: string): Promise<User> {
    const response = await apiService.get<User>(USER_ENDPOINTS.GET_USER(id));
    return response.data.data!;
  }

  async updateProfile(id: string, data: UpdateUserData): Promise<User> {
    const response = await apiService.patch<User>(
      USER_ENDPOINTS.UPDATE_PROFILE(id),
      data
    );
    return response.data.data!;
  }

  async deleteAccount(id: string): Promise<void> {
    await apiService.delete(USER_ENDPOINTS.DELETE_ACCOUNT(id));
  }

  async getAllUsers(query: UserQuery): Promise<UserListResponse> {
    const response = await apiService.get<User[]>(USER_ENDPOINTS.PROFILE, {
      params: query,
    });
    return {
      users: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getGuides(query: UserQuery): Promise<UserListResponse> {
    const response = await apiService.get<GuideProfile[]>(
      USER_ENDPOINTS.GUIDES,
      { params: query }
    );
    return {
      users: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async searchGuides(filters: any): Promise<UserListResponse> {
    const response = await apiService.get<GuideProfile[]>(
      USER_ENDPOINTS.GUIDES_SEARCH,
      { params: filters }
    );
    return {
      users: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getUserStats(): Promise<UserStats> {
    const response = await apiService.get<UserStats>(USER_ENDPOINTS.STATS);
    return response.data.data!;
  }

  async toggleUserStatus(
    id: string,
    isActive: boolean
  ): Promise<User> {
    const response = await apiService.patch<User>(
      USER_ENDPOINTS.TOGGLE_STATUS(id),
      { isActive }
    );
    return response.data.data!;
  }

  async verifyUser(id: string, isVerified: boolean): Promise<User> {
    const response = await apiService.patch<User>(USER_ENDPOINTS.VERIFY(id), {
      isVerified,
    });
    return response.data.data!;
  }

  async changeUserRole(id: string, role: string): Promise<User> {
    const response = await apiService.patch<User>(
      USER_ENDPOINTS.CHANGE_ROLE(id),
      { role }
    );
    return response.data.data!;
  }
}

export const userService = new UserService();
export default userService;