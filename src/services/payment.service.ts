/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiService } from "./api.service";
import { PAYMENT_ENDPOINTS } from "../constants";
import {
  Payment,
  CreatePaymentIntentData,
  CreatePaymentIntentResponse,
  ConfirmPaymentData,
  RefundPaymentData,
  PaymentQuery,
  PaymentListResponse,
  PaymentStats,
} from "../types";

class PaymentService {
  async createPaymentIntent(
    data: CreatePaymentIntentData
  ): Promise<CreatePaymentIntentResponse> {
    const response = await apiService.post<CreatePaymentIntentResponse>(
      PAYMENT_ENDPOINTS.CREATE_INTENT,
      data
    );
    return response.data.data!;
  }

  async confirmPayment(data: ConfirmPaymentData): Promise<Payment> {
    const response = await apiService.post<Payment>(
      PAYMENT_ENDPOINTS.CONFIRM,
      data
    );
    return response.data.data!;
  }

  async getPayment(id: string): Promise<Payment> {
    const response = await apiService.get<Payment>(
      PAYMENT_ENDPOINTS.DETAIL(id)
    );
    return response.data.data!;
  }

  async getAllPayments(query: PaymentQuery): Promise<PaymentListResponse> {
    const response = await apiService.get<Payment[]>(PAYMENT_ENDPOINTS.ALL, {
      params: query,
    });
    return {
      payments: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getMyPayments(query: PaymentQuery): Promise<PaymentListResponse> {
    const response = await apiService.get<Payment[]>(
      PAYMENT_ENDPOINTS.MY_PAYMENTS,
      { params: query }
    );
    return {
      payments: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async getGuideEarnings(query: PaymentQuery): Promise<PaymentListResponse> {
    const response = await apiService.get<Payment[]>(
      PAYMENT_ENDPOINTS.EARNINGS,
      { params: query }
    );
    return {
      payments: response.data.data!,
      meta: response.data.meta as any,
    };
  }

  async refundPayment(id: string, data: RefundPaymentData): Promise<Payment> {
    const response = await apiService.post<Payment>(
      PAYMENT_ENDPOINTS.REFUND(id),
      data
    );
    return response.data.data!;
  }

  async getPaymentStats(): Promise<PaymentStats> {
    const response = await apiService.get<PaymentStats>(
      PAYMENT_ENDPOINTS.STATS
    );
    return response.data.data!;
  }
}

export const paymentService = new PaymentService();
export default paymentService;