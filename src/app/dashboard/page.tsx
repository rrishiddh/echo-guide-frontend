"use client"
import { useUserRole } from "@/src/hooks/useUserRole";
import { redirect } from "next/navigation";



const DashboardPage = () => {
    const { role } = useUserRole();
  if (!role) return null;
  // console.log('role' , role)
  redirect(`/dashboard/${role}`);
};

export default DashboardPage;