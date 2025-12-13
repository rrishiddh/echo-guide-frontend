import { Metadata } from "next";
import PageHeader from "@/src/components/common/PageHeader";
import ProtectedRoute from "@/src/components/common/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import UserList from "@/src/components/users/UserList";

export const metadata: Metadata = {
  title: "Manage Users | Admin Dashboard",
  description: "Manage all platform users",
};

const AdminUsersPage = () => {
  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Manage Users" 
          description="View and manage all platform users"
        >
          <Link href="/dashboard/admin/users/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </Link>
        </PageHeader>
        
        <div className="container px-4 py-8">
          <UserList showActions={true} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUsersPage;