/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_BASE_URL } from "../constants";
import { ApiResponse } from "../types";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorage";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config) => {
        const token = getLocalStorage<string>("auth_token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = getLocalStorage<string>("refresh_token");
            if (refreshToken) {
              const response = await this.api.post("/auth/refresh-token", {
                refreshToken,
              });
              const { accessToken } = response.data;

              localStorage.setItem("auth_token", JSON.stringify(accessToken));
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;

              return this.api(originalRequest);
            }
          } catch (refreshError) {
            removeLocalStorage("auth_token");
            removeLocalStorage("refresh_token");
            removeLocalStorage("user_data");
            window.location.href = "/auth/login";
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.get(url, config);
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.post(url, data, config);
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.put(url, data, config);
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.patch(url, data, config);
  }

  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<ApiResponse<T>>> {
    return this.api.delete(url, config);
  }

  getApiInstance(): AxiosInstance {
    return this.api;
  }
}

export const apiService = new ApiService();
export default apiService;
