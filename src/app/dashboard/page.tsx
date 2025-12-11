import { Metadata } from "next";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard | Echo Guide",
  description: "Dashboard home page",
};

const DashboardPage = () => {
  redirect("/dashboard/tourist");
};

export default DashboardPage;