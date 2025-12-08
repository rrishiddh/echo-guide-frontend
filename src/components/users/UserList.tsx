/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCard } from "./UserCard";
import { Search, Filter, Users as UsersIcon, Loader2 } from "lucide-react";
import userService from "@/src/services/user.service";
import { User,UserQuery, UserRole } from "@/src/types";
import { useDebounce } from "@/src/hooks/useDebounce";
import { usePagination } from "@/src/hooks/usePagination";

interface UserListProps {
  roleFilter?: UserRole;
  showActions?: boolean;
  onUserEdit?: (user: User) => void;
  onUserDelete?: (user: User) => void;
}

export const UserList = ({
  roleFilter,
  showActions = false,
  onUserEdit,
  onUserDelete,
}: UserListProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilterState, setRoleFilterState] = useState<UserRole | "all">(
    roleFilter || "all"
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">(
    "all"
  );

  const debouncedSearch = useDebounce(searchQuery, 500);

  const pagination = usePagination({
    totalItems: total,
    itemsPerPage: 12,
  });

  useEffect(() => {
    loadUsers();
  }, [
    pagination.currentPage,
    debouncedSearch,
    roleFilterState,
    statusFilter,
  ]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const query: UserQuery = {
        page: pagination.currentPage,
        limit: 12,
        search: debouncedSearch || undefined,
        role: roleFilterState !== "all" ? roleFilterState : undefined,
        isActive: statusFilter === "all" ? undefined : statusFilter === "active",
      };

      const response = await userService.getAllUsers(query);
      setUsers(response.users);
      setTotal(response.meta.total);
    } catch (error) {
      console.error("Failed to load users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    pagination.goToPage(1);
  };

  const handleRoleFilter = (value: string) => {
    setRoleFilterState(value as any);
    pagination.goToPage(1);
  };

  const handleStatusFilter = (value: string) => {
    setStatusFilter(value as any);
    pagination.goToPage(1);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              Users ({total})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {!roleFilter && (
              <Select value={roleFilterState} onValueChange={handleRoleFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="tourist">Tourist</SelectItem>
                  <SelectItem value="guide">Guide</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            )}

            <Select value={statusFilter} onValueChange={handleStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No users found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    showActions={showActions}
                    onEdit={() => onUserEdit?.(user)}
                    onDelete={() => onUserDelete?.(user)}
                  />
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={pagination.prevPage}
                    disabled={!pagination.hasPrevPage}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-600">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={pagination.nextPage}
                    disabled={!pagination.hasNextPage}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserList;