"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/common/LoadingScreen";
import { isAdmin, isGuide, isTourist, UserRole, DASHBOARD_ROUTES } from "../constants";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({
  children,
  allowedRoles,
  redirectTo,
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user && !allowedRoles.includes(user.role)) {
      const defaultRedirect = redirectTo || getDashboardByRole(user.role);
      router.push(defaultRedirect);
    }
  }, [isLoading, isAuthenticated, user, allowedRoles, redirectTo, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

const getDashboardByRole = (role: UserRole): string => {
  if (isTourist(role)) return DASHBOARD_ROUTES.TOURIST;
  if (isGuide(role)) return DASHBOARD_ROUTES.GUIDE;
  if (isAdmin(role)) return DASHBOARD_ROUTES.ADMIN;
  return DASHBOARD_ROUTES.TOURIST;
};

export const withRole = <P extends object>(
  Component: React.ComponentType<P>,
  allowedRoles: UserRole[],
  redirectTo?: string
) => {
  const WrappedComponent = (props: P) => {
    return (
      <RoleGuard allowedRoles={allowedRoles} redirectTo={redirectTo}>
        <Component {...props} />
      </RoleGuard>
    );
  };

  WrappedComponent.displayName = `withRole(${Component.displayName || Component.name})`;

  return WrappedComponent;
};

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RoleGuard allowedRoles={["admin"]}>{children}</RoleGuard>;
};

export const GuideGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RoleGuard allowedRoles={["guide", "admin"]}>{children}</RoleGuard>;
};

export const TouristGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RoleGuard allowedRoles={["tourist"]}>{children}</RoleGuard>;
};

export default RoleGuard;