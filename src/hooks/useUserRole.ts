"use client";
import { isTourist, isGuide, isAdmin } from "../constants";
import { UserRole } from "../types";
import { useAuth } from "./useAuth";

export const useUserRole = () => {
  const { user } = useAuth();
  const role = user?.role as UserRole | undefined;
  const checkIsTourist = () => isTourist(role);
  const checkIsGuide = () => isGuide(role);
  const checkIsAdmin = () => isAdmin(role);
  const hasRole = (allowedRoles: UserRole[]) => {
    if (!role) return false;
    return allowedRoles.includes(role);
  };
  return {
    role,
    isTourist: checkIsTourist(),
    isGuide: checkIsGuide(),
    isAdmin: checkIsAdmin(),
    hasRole,
  };
};
