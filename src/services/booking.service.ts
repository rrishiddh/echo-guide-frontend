/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { BOOKING_ENDPOINTS } from "../constants";
import {
  Booking,
  CreateBookingData,
  UpdateBookingStatusData,
  CancelBookingData,
  BookingQuery,
  BookingListResponse,
  BookingStats,
  GuideEarnings,
} from "../types";

class BookingService {
  async createBooking(data: CreateBookingData): Promise<Booking> {
    const response = await apiService.post<Booking>(
      BOOKING_ENDPOINTS.CREATE,
      data
    );
    return response.data.data!;
  }

  async getBooking(id: string): Promise<Booking> {
    const response = await apiService.get<Booking>(
      BOOKING_ENDPOINTS.DETAIL(id)
    );
    return response.data.data!;
  }

  async getAllBookings(query: BookingQuery): Promise<BookingListResponse> {
    const response = await apiService.get<Booking[]>(BOOKING_ENDPOINTS.ALL, {
      params: query,
    });
    return {
      bookings: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getMyBookings(query: BookingQuery): Promise<BookingListResponse> {
    const response = await apiService.get<Booking[]>(
      BOOKING_ENDPOINTS.MY_BOOKINGS,
      { params: query }
    );
    return {
      bookings: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getUpcomingBookings(): Promise<Booking[]> {
    const response = await apiService.get<Booking[]>(
      BOOKING_ENDPOINTS.UPCOMING
    );
    return response.data.data!;
  }

  async getPastBookings(): Promise<Booking[]> {
    const response = await apiService.get<Booking[]>(BOOKING_ENDPOINTS.PAST);
    return response.data.data!;
  }

  async updateBookingStatus(
    id: string,
    data: UpdateBookingStatusData
  ): Promise<Booking> {
    const response = await apiService.patch<Booking>(
      BOOKING_ENDPOINTS.UPDATE_STATUS(id),
      data
    );
    return response.data.data!;
  }

  async cancelBooking(
    id: string,
    data: CancelBookingData
  ): Promise<Booking> {
    const response = await apiService.patch<Booking>(
      BOOKING_ENDPOINTS.CANCEL(id),
      data
    );
    return response.data.data!;
  }

  async completeBooking(id: string): Promise<Booking> {
    const response = await apiService.patch<Booking>(
      BOOKING_ENDPOINTS.COMPLETE(id)
    );
    return response.data.data!;
  }

  async getGuideEarnings(): Promise<GuideEarnings> {
    const response = await apiService.get<GuideEarnings>(
      BOOKING_ENDPOINTS.EARNINGS
    );
    return response.data.data!;
  }

  async getBookingStats(): Promise<BookingStats> {
    const response = await apiService.get<BookingStats>(
      BOOKING_ENDPOINTS.STATS
    );
    return response.data.data!;
  }
}

export const bookingService = new BookingService();
export default bookingService;