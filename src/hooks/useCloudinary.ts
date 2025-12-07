/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
import { UploadResponse } from "../types";
import { toast } from "sonner";
import uploadService from "../services/upload.service";

export const useCloudinary = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const uploadToCloudinary = useCallback(
    async (file: File): Promise<UploadResponse> => {
      setIsUploading(true);
      setError(null);
      try {
        const result = await uploadService.uploadToCloudinary(file);
        toast.success("Image uploaded successfully");
        return result;
      } catch (err: any) {
        const message = err.message || "Failed to upload to Cloudinary";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );
  const uploadMultipleToCloudinary = useCallback(
    async (files: File[]): Promise<UploadResponse[]> => {
      setIsUploading(true);
      setError(null);
      try {
        const results = await uploadService.uploadMultipleToCloudinary(files);
        toast.success(`${files.length} images uploaded successfully`);
        return results;
      } catch (err: any) {
        const message = err.message || "Failed to upload to Cloudinary";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsUploading(false);
      }
    },
    []
  );
  const deleteFromCloudinary = useCallback(async (publicId: string) => {
    try {
      await uploadService.deleteFromCloudinary(publicId);
      toast.success("Image deleted successfully");
    } catch (err: any) {
      const message = err.message || "Failed to delete from Cloudinary";
      toast.error(message);
      throw err;
    }
  }, []);
  return {
    isUploading,
    error,
    uploadToCloudinary,
    uploadMultipleToCloudinary,
    deleteFromCloudinary,
  };
};
