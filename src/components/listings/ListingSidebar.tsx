"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Listing } from "@/src/types";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/src/hooks/useAuth";
import { formatPrice } from "@/src/utils/formatPrice";
import { formatDate } from "@/src/utils/formatDate";
interface ListingSidebarProps {
  listing: Listing;
}
export const ListingSidebar = ({ listing }: ListingSidebarProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [date, setDate] = useState<Date>();
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const totalPrice = listing.tourFee * numberOfPeople;
  const handleBooking = () => {
    if (!isAuthenticated) {
      toast.error("Please login to book a tour");
      router.push("/auth/login");
      return;
    }
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    router.push(
      `/bookings/create?listingId=${
        listing.id
      }&date=${date.toISOString()}&guests=${numberOfPeople}`
    );
  };
  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(listing.tourFee)}
          </span>
          <span className="text-sm text-gray-600">/ person</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="date">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? formatDate(date, "MMM dd, yyyy") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <div>
          <Label htmlFor="guests">Number of Guests</Label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
            >
              -
            </Button>
            <Input
              id="guests"
              type="number"
              value={numberOfPeople}
              onChange={(e) =>
                setNumberOfPeople(
                  Math.min(
                    listing.maxGroupSize,
                    Math.max(1, parseInt(e.target.value) || 1)
                  )
                )
              }
              className="text-center"
              min={1}
              max={listing.maxGroupSize}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setNumberOfPeople(
                  Math.min(listing.maxGroupSize, numberOfPeople + 1)
                )
              }
            >
              +
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Max {listing.maxGroupSize} people
          </p>
        </div>

        <div className="pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              {formatPrice(listing.tourFee)} × {numberOfPeople}
            </span>
            <span className="font-medium text-gray-900">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total</span>
            <span className="text-lg">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <Button className="w-full" size="lg" onClick={handleBooking}>
          Book Now
        </Button>

        <p className="text-xs text-center text-gray-500">
          You won&apos;t be charged yet
        </p>
      </CardContent>
    </Card>
  );
};
export default ListingSidebar;
