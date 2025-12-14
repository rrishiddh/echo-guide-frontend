/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
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
import { BookingQuery } from "@/src/types";
import { Search, Filter, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePagination } from "@/src/hooks/usePagination";
import { formatPrice } from "@/src/utils/formatPrice";
import { useBookings } from "@/src/hooks/useBookings";
import { useDebounce } from "@/src/hooks/useDebounce";
import { formatDate } from "@/src/utils/formatDate";
import { formatTime } from "@/src/utils/formatTime";
import BookingStatus from "./BookingStatus";

interface BookingListProps {
  userRole?: "tourist" | "guide" | "admin";
  statusFilter?: string;
}

export const BookingList = ({ userRole, statusFilter }: BookingListProps) => {
  const { bookings, total, fetchBookings, fetchMyBookings, isLoading } =
    useBookings();

  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<string>(statusFilter || "all");
  const [sortBy, setSortBy] = useState("-createdAt");

  const debouncedSearch = useDebounce(searchQuery, 500);

  const pagination = usePagination({
    totalItems: total,
    itemsPerPage: 10,
  });

  const loadBookings = useCallback(async () => {
    const query: BookingQuery = {
      page: pagination.currentPage,
      limit: 10,
      sortBy: sortBy,
      status: status !== "all" ? (status as any) : undefined,
      search: debouncedSearch || undefined,
    };

    if (userRole === "admin") {
      await fetchBookings(query);
    } else {
      await fetchMyBookings(query);
    }
  }, [
    pagination.currentPage,
    sortBy,
    status,
    debouncedSearch,
    userRole,
    fetchBookings,
    fetchMyBookings,
  ]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);
// console.log('bookings',bookings)
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Bookings ({total})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search bookings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-createdAt">Newest First</SelectItem>
                <SelectItem value="createdAt">Oldest First</SelectItem>
                <SelectItem value="-bookingDate">Date (Latest)</SelectItem>
                <SelectItem value="bookingDate">Date (Earliest)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Loader */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No bookings found</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Link key={booking.id} href={`/bookings/${booking.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-1">
                                  {booking.listing?.title || "Tour"}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {userRole === "guide"
                                    ? `Tourist: ${booking.tourist?.name}`
                                    : `Guide: ${booking.guide?.name}`}
                                </p>
                              </div>
                              <BookingStatus status={booking.status} />
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <span className="text-gray-600">Date:</span>
                                <p className="font-medium text-gray-900">
                                  {formatDate(
                                    booking.bookingDate,
                                    "MMM dd, yyyy"
                                  )}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Time:</span>
                                <p className="font-medium text-gray-900">
                                  {formatTime(booking.startTime)}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Guests:</span>
                                <p className="font-medium text-gray-900">
                                  {booking.numberOfPeople}
                                </p>
                              </div>
                              <div>
                                <span className="text-gray-600">Amount:</span>
                                <p className="font-medium text-gray-900">
                                  {formatPrice(booking.totalPrice)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
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

export default BookingList;
