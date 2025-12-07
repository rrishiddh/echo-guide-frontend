"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import authService from "../services/auth.service";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "../utils/localStorage";
import { AUTH_ROUTES } from "../constants";
import { AuthUser, LoginCredentials, RegisterData } from "../types";
export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    checkAuth();
  }, []);
  const checkAuth = useCallback(async () => {
    try {
      const token = getLocalStorage<string>("auth_token");
      const savedUser = getLocalStorage<AuthUser>("user_data");
      if (token && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      setLocalStorage("auth_token", response.accessToken);
      setLocalStorage("refresh_token", response.refreshToken);
      setLocalStorage("user_data", response.user);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success("Login successful!");
      return response.user;
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };
  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setLocalStorage("auth_token", response.accessToken);
      setLocalStorage("refresh_token", response.refreshToken);
      setLocalStorage("user_data", response.user);

      setUser(response.user);
      setIsAuthenticated(true);

      toast.success("Registration successful!");
      return response.user;
    } catch (error) {
      toast.error("Registration failed");
      throw error;
    }
  };
  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      removeLocalStorage("auth_token");
      removeLocalStorage("refresh_token");
      removeLocalStorage("user_data");
      setUser(null);
      setIsAuthenticated(false);

      router.push(AUTH_ROUTES.LOGIN);
      toast.success("Logged out successfully");
    }
  };
  const updateUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);
    setLocalStorage("user_data", updatedUser);
  }, []);
  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  };
};
