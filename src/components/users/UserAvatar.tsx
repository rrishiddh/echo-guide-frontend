"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/src/types";
import { getInitials } from "@/src/utils/helpers";
import { CheckCircle } from "lucide-react";

interface UserAvatarProps {
  user: User | { name: string; profilePic?: string; isVerified?: boolean };
  size?: "sm" | "md" | "lg" | "xl";
  showBadge?: boolean;
  className?: string;
}

export const UserAvatar = ({
  user,
  size = "md",
  showBadge = false,
  className = "",
}: UserAvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <Avatar className={sizeClasses[size]}>
        <AvatarImage src={user.profilePic} alt={user.name} />
        <AvatarFallback className="bg-blue-500 text-white font-semibold">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      {showBadge && user.isVerified && (
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
          <CheckCircle className="w-5 h-5 text-green-500 fill-current" />
        </div>
      )}
    </div>
  );
};

export default UserAvatar;