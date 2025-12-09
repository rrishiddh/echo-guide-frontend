"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  X,
  Home,
  Compass,
  Users,
  HelpCircle,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import UserAvatar from "../users/UserAvatar";
import { useAuth } from "@/src/hooks/useAuth";
import { useUserRole } from "@/src/hooks/useUserRole";
import { getDashboardRoute } from "@/src/constants";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const { role } = useUserRole();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    onClose();
  };

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore Tours", href: "/listings", icon: Compass },
    { label: "Find Guides", href: "/guides", icon: Users },
    { label: "How It Works", href: "/how-it-works", icon: HelpCircle },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-lg font-bold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {isAuthenticated && user && (
            <div className="p-4 border-b">
              <div className="flex items-center gap-3 mb-3">
                <UserAvatar user={user} size="lg" />
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavClick(role ? getDashboardRoute(role) : "/dashboard")}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          )}

          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">{item.label}</span>
                </button>
              ))}
            </div>

            {isAuthenticated && (
              <>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavClick("/profile")}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Profile</span>
                  </button>
                  <button
                    onClick={() => handleNavClick("/profile/settings")}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 rounded-lg transition-colors text-left"
                  >
                    <Settings className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-900">Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-red-600">Logout</span>
                  </button>
                </div>
              </>
            )}
          </nav>

          {!isAuthenticated && (
            <div className="p-4 border-t space-y-2">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => handleNavClick("/auth/login")}
              >
                Sign in
              </Button>
              <Button
                className="w-full"
                onClick={() => handleNavClick("/auth/register")}
              >
                Sign up
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNav;