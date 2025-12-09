/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Listing } from "@/src/types";
import { Calendar as CalendarIcon, Clock, Loader2, AlertCircle } from "lucide-react";
import { useBookings } from "@/src/hooks/useBookings";
import { formatDate } from "@/src/utils/formatDate";
import { formatPrice } from "@/src/utils/formatPrice";

interface BookingFormProps {
  listing: Listing;
}

export const BookingForm = ({ listing }: BookingFormProps) => {
  const router = useRouter();
  const { createBooking, isLoading } = useBookings();
  const [error, setError] = useState("");
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    startTime: "",
    numberOfPeople: 1,
    specialRequests: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const totalPrice = listing.tourFee * formData.numberOfPeople;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a date");
      return;
    }

    if (!formData.startTime) {
      setError("Please select a time");
      return;
    }

    try {
      const booking = await createBooking({
        listingId: listing.id,
        bookingDate: date.toISOString(),
        startTime: formData.startTime,
        numberOfPeople: formData.numberOfPeople,
        specialRequests: formData.specialRequests || undefined,
      });

      router.push(`/payments/checkout?bookingId=${booking.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label>Select Date</Label>
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

      <div className="space-y-2">
        <Label htmlFor="startTime">Start Time</Label>
        <Select
          value={formData.startTime}
          onValueChange={(value) => setFormData({ ...formData, startTime: value })}
        >
          <SelectTrigger>
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i.toString().padStart(2, "0");
              return (
                <SelectItem key={hour} value={`${hour}:00`}>
                  {hour}:00
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="numberOfPeople">Number of Guests</Label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setFormData({
                ...formData,
                numberOfPeople: Math.max(1, formData.numberOfPeople - 1),
              })
            }
          >
            -
          </Button>
          <Input
            id="numberOfPeople"
            name="numberOfPeople"
            type="number"
            value={formData.numberOfPeople}
            onChange={(e) =>
              setFormData({
                ...formData,
                numberOfPeople: Math.min(
                  listing.maxGroupSize,
                  Math.max(1, parseInt(e.target.value) || 1)
                ),
              })
            }
            className="text-center"
            min={1}
            max={listing.maxGroupSize}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() =>
              setFormData({
                ...formData,
                numberOfPeople: Math.min(
                  listing.maxGroupSize,
                  formData.numberOfPeople + 1
                ),
              })
            }
          >
            +
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          Maximum {listing.maxGroupSize} people
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
        <Textarea
          id="specialRequests"
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleChange}
          rows={3}
          placeholder="Any special requirements or requests..."
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            {formatPrice(listing.tourFee)} × {formData.numberOfPeople}
          </span>
          <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span className="text-lg">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Continue to Payment"
        )}
      </Button>

      <p className="text-xs text-center text-gray-500">
        You won&apos;t be charged yet. Review your booking before payment.
      </p>
    </form>
  );
};

export default BookingForm;