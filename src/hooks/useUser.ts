/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import userService from "../services/user.service";
import { User,UpdateUserData } from "../types";


export const useUser = (userId?: string) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userService.getUser(id);
      setUser(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch user";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const updateUser = useCallback(async (id: string, data: UpdateUserData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = await userService.updateProfile(id, data);
      setUser(updatedUser);
      toast.success("Profile updated successfully");
      return updatedUser;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to update profile";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const deleteUser = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await userService.deleteAccount(id);
      toast.success("Account deleted successfully");
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to delete account";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    user,
    isLoading,
    error,
    fetchUser,
    updateUser,
    deleteUser,
  };
};
