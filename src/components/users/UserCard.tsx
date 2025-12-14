"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./UserAvatar";
import { Mail, Calendar, MapPin, ExternalLink } from "lucide-react";
import { User } from "@/src/types";
import { formatDate } from "@/src/utils/formatDate";

interface UserCardProps {
  user: User;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const UserCard = ({
  user,
  showActions = false,
  onEdit,
  onDelete,
}: UserCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <UserAvatar user={user} size="lg" showBadge />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-600 capitalize">{user.role}</p>
              </div>
              <div className="flex gap-2">
                {user.isVerified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                )}
                <Badge variant={user.isActive ? "default" : "secondary"}>
                  {user.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Joined {formatDate(user.createdAt, "MMM dd, yyyy")}</span>
              </div>
              {user.languagesSpoken && user.languagesSpoken.length > 0 && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span className="truncate">
                    {user.languagesSpoken.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {user.bio && (
              <p className="text-sm text-gray-700 line-clamp-2 mb-4">{user.bio}</p>
            )}

            <div className="flex gap-2">
              <Link href={`/dashboard/admin/users/${user.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Link>
              {showActions && (
                <>
                  {onEdit && (
                    <Button variant="outline" size="sm" onClick={onEdit}>
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="outline" size="sm" onClick={onDelete}>
                      Delete
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;