/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { ADMIN_ENDPOINTS } from "../constants";
import { BulkActionData, BulkActionResponse } from "../types";

class AdminService {
  async getDashboardOverview(startDate?: string, endDate?: string): Promise<any> {
    const response = await apiService.get(ADMIN_ENDPOINTS.DASHBOARD, {
      params: { startDate, endDate },
    });
    return response.data.data!;
  }

  async getAnalytics(period?: string): Promise<any> {
    const response = await apiService.get(ADMIN_ENDPOINTS.ANALYTICS, {
      params: { period },
    });
    return response.data.data!;
  }

  async bulkUpdateUsers(data: BulkActionData): Promise<BulkActionResponse> {
    const response = await apiService.post<BulkActionResponse>(
      ADMIN_ENDPOINTS.BULK_UPDATE_USERS,
      data
    );
    return response.data.data!;
  }

  async bulkUpdateListings(data: BulkActionData): Promise<BulkActionResponse> {
    const response = await apiService.post<BulkActionResponse>(
      ADMIN_ENDPOINTS.BULK_UPDATE_LISTINGS,
      data
    );
    return response.data.data!;
  }

  async getSystemHealth(): Promise<any> {
    const response = await apiService.get(ADMIN_ENDPOINTS.HEALTH);
    return response.data.data!;
  }

  async getReportedContent(): Promise<any> {
    const response = await apiService.get(ADMIN_ENDPOINTS.REPORTED_CONTENT);
    return response.data.data!;
  }

  async generateReport(
    type: string,
    startDate?: string,
    endDate?: string
  ): Promise<any> {
    const response = await apiService.get(ADMIN_ENDPOINTS.REPORTS(type), {
      params: { startDate, endDate },
    });
    return response.data.data!;
  }
}

export const adminService = new AdminService();
export default adminService;