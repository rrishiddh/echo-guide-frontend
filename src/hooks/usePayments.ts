/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useCallback } from "react";
import { Payment, CreatePaymentIntentData, PaymentQuery } from "../types";
import { toast } from "sonner";
import paymentService from "../services/payment.service";


export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const createPaymentIntent = useCallback(
    async (data: CreatePaymentIntentData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await paymentService.createPaymentIntent(data);
        setClientSecret(response.clientSecret);
        return response;
      } catch (err: any) {
        const message =
          err.response?.data?.message || "Failed to create payment";
        setError(message);
        toast.error(message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );
  const fetchPayments = useCallback(async (query: PaymentQuery = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await paymentService.getAllPayments(query);
      setPayments(response.payments);
      return response;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch payments";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const fetchPayment = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await paymentService.getPayment(id);
      setPayment(data);
      return data;
    } catch (err: any) {
      const message = err.response?.data?.message || "Failed to fetch payment";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    payments,
    payment,
    isLoading,
    error,
    clientSecret,
    createPaymentIntent,
    fetchPayments,
    fetchPayment,
  };
};
