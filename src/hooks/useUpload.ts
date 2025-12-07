/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
import { UploadResponse } from "../types";
import { toast } from "sonner";
import uploadService from "../services/upload.service";

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const uploadImage = useCallback(
    async (file: File): Promise<UploadResponse> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);
      try {
        const result = await uploadService.uploadImage(file);
        setProgress(100);
        toast.success("Image uploaded successfully");
        return result;
      } catch (err: any) {
        const message = err.response?.data?.message || "Failed to upload image";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    []
  );
  const uploadImages = useCallback(
    async (files: File[]): Promise<UploadResponse[]> => {
      setIsUploading(true);
      setError(null);
      setProgress(0);
      try {
        const results = await uploadService.uploadImages(files);
        setProgress(100);
        toast.success(`${files.length} images uploaded successfully`);
        return results;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to upload images";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsUploading(false);
        setTimeout(() => setProgress(0), 1000);
      }
    },
    []
  );
  const reset = useCallback(() => {
    setProgress(0);
    setError(null);
    setIsUploading(false);
  }, []);
  return {
    isUploading,
    progress,
    error,
    uploadImage,
    uploadImages,
    reset,
  };
};
