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
import { Badge } from "@/components/ui/badge";
import { UserAvatar } from "./UserAvatar";
// import { userService } from "@/services/user.service";
import { GuideProfile, UserQuery } from "@/src/types";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Users,
  Loader2,
} from "lucide-react";
import { formatPrice } from "@/src/utils/formatPrice";
import Link from "next/link";
import { useDebounce } from "@/src/hooks/useDebounce";
import { usePagination } from "@/src/hooks/usePagination";
import userService from "@/src/services/user.service";

export const GuideList = () => {
  const [guides, setGuides] = useState<GuideProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("-rating");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const pagination = usePagination({
    totalItems: total,
    itemsPerPage: 12,
  });

  useEffect(() => {
    loadGuides();
  }, [pagination.currentPage, debouncedSearch, sortBy]);

  const loadGuides = async () => {
    setIsLoading(true);
    try {
      const query: UserQuery = {
        page: pagination.currentPage,
        limit: 12,
        search: debouncedSearch || undefined,
       
      };

      const response = await userService.getGuides(query);
      setGuides(response.users as GuideProfile[]);
      setTotal(response.meta.total);
    } catch (error) {
      console.error("Failed to load guides:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Local Guides ({total})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-rating">Highest Rated</SelectItem>
                <SelectItem value="rating">Lowest Rated</SelectItem>
                <SelectItem value="-totalTours">Most Tours</SelectItem>
                <SelectItem value="dailyRate">Lowest Price</SelectItem>
                <SelectItem value="-dailyRate">Highest Price</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : guides.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No guides found</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => (
                  <Link key={guide.id} href={`/guides/${guide.id}`}>
                    <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full">
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center mb-4">
                          <UserAvatar user={guide} size="xl" showBadge />
                          <h3 className="font-semibold text-lg text-gray-900 mt-4 mb-2">
                            {guide.name}
                          </h3>
                          <div className="flex items-center gap-1 mb-3">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">
                              {guide.averageRating?.toFixed(1) || "5.0"}
                            </span>
                            <span className="text-sm text-gray-600">
                              ({guide.totalReviews || 0})
                            </span>
                          </div>
                        </div>

                        {guide.expertise && guide.expertise.length > 0 && (
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {guide.expertise.slice(0, 3).map((specialty) => (
                              <Badge key={specialty} variant="secondary">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {guide.bio && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {guide.bio}
                          </p>
                        )}

                        <div className="space-y-2 text-sm">
                          {guide.languagesSpoken && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin className="w-4 h-4" />
                              <span>{guide.languagesSpoken.join(", ")}</span>
                            </div>
                          )}
                          <div className="flex items-center justify-between pt-2 border-t">
                            <span className="text-gray-600">Starting from</span>
                            <span className="text-xl font-bold text-gray-900">
                              {formatPrice(guide.dailyRate)}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
export default GuideList;
