/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast as sonnerToast } from "sonner";

export const useToast = () => {
  const success = (message: string, description?: string) => {
    sonnerToast.success(message, {
      description,
    });
  };

  const error = (message: string, description?: string) => {
    sonnerToast.error(message, {
      description,
    });
  };

  const info = (message: string, description?: string) => {
    sonnerToast.info(message, {
      description,
    });
  };

  const warning = (message: string, description?: string) => {
    sonnerToast.warning(message, {
      description,
    });
  };

  const loading = (message: string) => {
    return sonnerToast.loading(message);
  };

  const promise = <T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, {
      loading,
      success,
      error,
    });
  };

  const dismiss = (id?: string | number) => {
    sonnerToast.dismiss(id);
  };

  return {
    success,
    error,
    info,
    warning,
    loading,
    promise,
    dismiss,
    toast: sonnerToast,
  };
};
