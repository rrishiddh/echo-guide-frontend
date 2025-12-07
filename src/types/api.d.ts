/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta | Record<string, any>;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: any;
  statusCode?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface QueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  [key: string]: any;
}

export interface RequestConfig {
  headers?: Record<string, string>;
  params?: QueryParams;
  signal?: AbortSignal;
}

export interface UploadResponse {
  url: string;
  publicId: string;
  filename?: string;
}

export interface BulkActionData {
  ids: string[];
  action: "activate" | "deactivate" | "delete" | "verify" | "unverify";
}

export interface BulkActionResponse {
  updated: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
}