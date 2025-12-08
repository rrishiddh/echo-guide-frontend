/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  DollarSign,
  Star,
  User,
  MapPin,
  Clock,
} from "lucide-react";
import { getInitials } from "@/src/utils/helpers";
import { getTimeAgo } from "@/src/utils/formatDate";

interface Activity {
  id: string;
  type: "booking" | "payment" | "review" | "registration" | "listing";
  user: {
    name: string;
    avatar?: string;
  };
  description: string;
  timestamp: string;
  metadata?: any;
}

interface ActivityFeedProps {
  activities: Activity[];
  title?: string;
  maxItems?: number;
}

export const ActivityFeed = ({
  activities,
  title = "Recent Activity",
  maxItems = 10,
}: ActivityFeedProps) => {
  const displayActivities = activities.slice(0, maxItems);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "booking":
        return Calendar;
      case "payment":
        return DollarSign;
      case "review":
        return Star;
      case "registration":
        return User;
      case "listing":
        return MapPin;
      default:
        return Clock;
    }
  };

  const getActivityColor = (type: Activity["type"]) => {
    switch (type) {
      case "booking":
        return "text-blue-600 bg-blue-100";
      case "payment":
        return "text-green-600 bg-green-100";
      case "review":
        return "text-yellow-600 bg-yellow-100";
      case "registration":
        return "text-purple-600 bg-purple-100";
      case "listing":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Clock className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No recent activity</p>
            </div>
          ) : (
            displayActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={activity.user.avatar}
                        alt={activity.user.name}
                      />
                      <AvatarFallback className="bg-blue-500 text-white text-sm">
                        {getInitials(activity.user.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {activity.user.name}
                      </span>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {activity.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {getTimeAgo (activity.timestamp)}
                    </p>
                  </div>

                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {activities.length > maxItems && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Activity
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;