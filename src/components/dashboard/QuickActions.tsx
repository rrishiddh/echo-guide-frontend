/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  Users,
  DollarSign,
  BarChart,
} from "lucide-react";
import { UserRole } from "@/src/types";

interface QuickAction {
  label: string;
  icon: any;
  href: string;
  color: string;
  description: string;
}

interface QuickActionsProps {
  role: UserRole;
}

export const QuickActions = ({ role }: QuickActionsProps) => {
  const touristActions: QuickAction[] = [
    {
      label: "Browse Tours",
      icon: Plus,
      href: "/listings",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Discover new experiences",
    },
    {
      label: "My Bookings",
      icon: Calendar,
      href: "/dashboard/tourist/bookings",
      color: "bg-green-500 hover:bg-green-600",
      description: "View your trips",
    },
    {
      label: "Write Review",
      icon: MessageSquare,
      href: "/dashboard/tourist/reviews",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Share your experience",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/profile/settings",
      color: "bg-gray-500 hover:bg-gray-600",
      description: "Manage your account",
    },
  ];

  const guideActions: QuickAction[] = [
    {
      label: "Create Listing",
      icon: Plus,
      href: "/dashboard/guide/listings/create",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "Add new tour",
    },
    {
      label: "Manage Bookings",
      icon: Calendar,
      href: "/dashboard/guide/bookings",
      color: "bg-green-500 hover:bg-green-600",
      description: "View requests",
    },
    {
      label: "View Earnings",
      icon: DollarSign,
      href: "/dashboard/guide/earnings",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Track revenue",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/dashboard/guide/analytics",
      color: "bg-orange-500 hover:bg-orange-600",
      description: "View insights",
    },
  ];

  const adminActions: QuickAction[] = [
    {
      label: "Manage Users",
      icon: Users,
      href: "/dashboard/admin/users",
      color: "bg-blue-500 hover:bg-blue-600",
      description: "User management",
    },
    {
      label: "View Reports",
      icon: FileText,
      href: "/dashboard/admin/reports",
      color: "bg-green-500 hover:bg-green-600",
      description: "System reports",
    },
    {
      label: "Analytics",
      icon: BarChart,
      href: "/dashboard/admin/analytics",
      color: "bg-purple-500 hover:bg-purple-600",
      description: "Platform insights",
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/dashboard/admin/settings",
      color: "bg-gray-500 hover:bg-gray-600",
      description: "System settings",
    },
  ];

  const actions =
    role === "tourist"
      ? touristActions
      : role === "guide"
      ? guideActions
      : adminActions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="group p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center flex-shrink-0 transition-colors`}
                  >
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1">
                      {action.label}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;