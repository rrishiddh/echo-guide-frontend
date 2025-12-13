/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";

import { toast } from "sonner";
import bookingService from "../services/booking.service";
import {
  Booking,
  CreateBookingData,
  BookingQuery,
  UpdateBookingStatusData,
  CancelBookingData,
} from "../types";
export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const fetchBookings = useCallback(async (query: BookingQuery = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService.getAllBookings(query);
      setBookings(response.bookings);
      setTotal(response.meta.total);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch bookings";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchMyBookings = useCallback(async (query: BookingQuery = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await bookingService?.getMyBookings(query);
      setBookings(response.bookings);
      setTotal(response.meta.total);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch bookings";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchBooking = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await bookingService.getBooking(id);
      setBooking(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch booking";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const createBooking = useCallback(async (data: CreateBookingData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newBooking = await bookingService.createBooking(data);
      toast.success("Booking created successfully");
      return newBooking;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to create booking";
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const updateBookingStatus = useCallback(
    async (id: string, data: UpdateBookingStatusData) => {
      setIsLoading(true);
      setError(null);
      try {
        const updatedBooking = await bookingService.updateBookingStatus(
          id,
          data
        );
        setBooking(updatedBooking);
        toast.success("Booking status updated");
        return updatedBooking;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to update booking";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const cancelBooking = useCallback(
    async (id: string, data: CancelBookingData) => {
      setIsLoading(true);
      setError(null);
      try {
        const cancelledBooking = await bookingService.cancelBooking(id, data);
        setBooking(cancelledBooking);
        toast.success("Booking cancelled");
        return cancelledBooking;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to cancel booking";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  return {
    bookings,
    booking,
    isLoading,
    error,
    total,
    fetchBookings,
    fetchMyBookings,
    fetchBooking,
    createBooking,
    updateBookingStatus,
    cancelBooking,
  };
};
