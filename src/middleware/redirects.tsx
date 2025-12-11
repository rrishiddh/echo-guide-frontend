/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AUTH_ROUTES,getDashboardRoute,PUBLIC_ROUTES } from "../constants";
import { useAuth } from "../hooks/useAuth";

export const useAuthRedirect = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const redirectToDashboard = () => {
    if (user) {
      const dashboardRoute = getDashboardRoute(user.role);
      router.push(dashboardRoute);
    }
  };

  const redirectToLogin = (returnUrl?: string) => {
    const url = returnUrl
      ? `${AUTH_ROUTES.LOGIN}?returnUrl=${encodeURIComponent(returnUrl)}`
      : AUTH_ROUTES.LOGIN;
    router.push(url);
  };

  const redirectToHome = () => {
    router.push(PUBLIC_ROUTES.HOME);
  };

  const redirectWithReturnUrl = (url: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    const returnUrl = searchParams.get("returnUrl");

    if (returnUrl) {
      router.push(decodeURIComponent(returnUrl));
    } else {
      router.push(url);
    }
  };

  return {
    redirectToDashboard,
    redirectToLogin,
    redirectToHome,
    redirectWithReturnUrl,
  };
};

export const RedirectToLogin: React.FC = () => {
  const { redirectToLogin } = useAuthRedirect();

  useEffect(() => {
    redirectToLogin(window.location.pathname);
  }, [redirectToLogin]);

  return null;
};

export const RedirectToDashboard: React.FC = () => {
  const { redirectToDashboard } = useAuthRedirect();

  useEffect(() => {
    redirectToDashboard();
  }, [redirectToDashboard]);

  return null;
};

export const RedirectIfAuthenticated: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { redirectToDashboard } = useAuthRedirect();

  useEffect(() => {
    if (isAuthenticated && user) {
      redirectToDashboard();
    }
  }, [isAuthenticated, redirectToDashboard, user]);

  if (isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export const getReturnUrl = (): string | null => {
  if (typeof window === "undefined") return null;

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get("returnUrl");
};

export const buildReturnUrl = (basePath: string, returnUrl?: string): string => {
  if (!returnUrl) return basePath;
  return `${basePath}?returnUrl=${encodeURIComponent(returnUrl)}`;
};

export const handleAuthRedirect = (
  isAuthenticated: boolean,
  userRole?: string,
  currentPath?: string
) => {
  if (!isAuthenticated && currentPath && !isPublicRoute(currentPath)) {
    return buildReturnUrl(AUTH_ROUTES.LOGIN, currentPath);
  }

  if (isAuthenticated && userRole && isAuthRoute(currentPath)) {
    return getDashboardRoute(userRole as any);
  }

  return null;
};

export const isPublicRoute = (pathname: string): boolean => {
  const publicPaths = [
    PUBLIC_ROUTES.HOME,
    PUBLIC_ROUTES.ABOUT,
    PUBLIC_ROUTES.CONTACT,
    PUBLIC_ROUTES.HOW_IT_WORKS,
    PUBLIC_ROUTES.BECOME_GUIDE,
    PUBLIC_ROUTES.FAQ,
    PUBLIC_ROUTES.LISTINGS,
    PUBLIC_ROUTES.GUIDES,
    "/listings/",
    "/guides/",
  ];

  return publicPaths.some((path) => pathname.startsWith(path));
};

export const isAuthRoute = (pathname?: string): boolean => {
  if (!pathname) return false;

  return (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forgot-password") ||
    pathname.startsWith("/auth/reset-password")
  );
};

export const isDashboardRoute = (pathname: string): boolean => {
  return pathname.startsWith("/dashboard");
};

export const requiresAuth = (pathname: string): boolean => {
  return (
    isDashboardRoute(pathname) ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/bookings") ||
    pathname.startsWith("/payments/checkout")
  );
};