/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as Icons from "lucide-react";
import { useUserRole } from "@/src/hooks/useUserRole";
import { getDashboardNav } from "@/src/config/navigation";
import Sidebar from "./Sidebar";

export const DashboardSidebar = () => {
  const { role } = useUserRole();

  if (!role) return null;

  const navItems = getDashboardNav(role);

 const itemsWithIcons = navItems.map((item) => ({
  ...item,
  icon: item.icon ? (Icons as any)[item.icon] : Icons.Circle,
}));


  return <Sidebar items={itemsWithIcons} />;
};

export default DashboardSidebar;