"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingScreen from "@/components/common/LoadingScreen";
import { AUTH_ROUTES } from "../constants";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  redirectTo,
}) => {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      const returnUrl = window.location.pathname;
      router.push(`${AUTH_ROUTES.LOGIN}?returnUrl=${returnUrl}`);
    }

    if (!requireAuth && isAuthenticated && redirectTo) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, requireAuth, redirectTo, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated && redirectTo) {
    return null;
  }

  return <>{children}</>;
};

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireAuth?: boolean;
    redirectTo?: string;
  }
) => {
  const WrappedComponent = (props: P) => {
    return (
      <AuthGuard
        requireAuth={options?.requireAuth}
        redirectTo={options?.redirectTo}
      >
        <Component {...props} />
      </AuthGuard>
    );
  };

  WrappedComponent.displayName = `withAuth(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

export default AuthGuard;
