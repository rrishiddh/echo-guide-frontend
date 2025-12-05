/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (isAxiosError(error)) {
    return getAxiosErrorMessage(error);
  }
  return "An unexpected error occurred";
};

export const isAxiosError = (error: any): error is AxiosError => {
  return error?.isAxiosError === true;
};

export const getAxiosErrorMessage = (error: AxiosError): string => {
  if (error.response) {
    const data: any = error.response.data;

    if (data?.message) {
      return data.message;
    }

    if (data?.error) {
      return typeof data.error === "string" ? data.error : data.error.message;
    }

    return `Server error: ${error.response.status}`;
  }
  if (error.request) {
    return "No response from server. Please check your connection.";
  }
  return error.message || "Request failed";
};

export const getErrorStatus = (error: unknown): number | null => {
  if (isAxiosError(error) && error.response) {
    return error.response.status;
  }
  return null;
};

export const isNetworkError = (error: unknown): boolean => {
  if (isAxiosError(error)) {
    return !error.response && !!error.request;
  }
  return false;
};

export const isAuthError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status === 401 || status === 403;
};

export const isValidationError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status === 400 || status === 422;
};

export const isNotFoundError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  return status === 404;
};

export const getValidationErrors = (
  error: unknown): Record<string, string> | null => {
  if (!isAxiosError(error) || !error.response) {
    return null;
  }
  const data: any = error.response.data;
  if (data?.errors && typeof data.errors === "object") {
    return data.errors;
  }
  return null;
};

export const createError = (message: string, statusCode?: number) => {
  const error: any = new Error(message);
  if (statusCode) {
    error.statusCode = statusCode;
  }
  return error;
};

export const logError = (error: unknown, context?: string): void => {
  if (process.env.NODE_ENV === "development") {
    console.error(context ? `[${context}]` : "[Error]", error);
  }
};

export const formatError = (error: unknown): {
  message: string;
  status: number | null;
  isNetwork: boolean;
  isAuth: boolean;
} => {
  return {
    message: getErrorMessage(error),
    status: getErrorStatus(error),
    isNetwork: isNetworkError(error),
    isAuth: isAuthError(error),
  };
};