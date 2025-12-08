/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download, Search, Filter } from "lucide-react";

import { PaymentStatus } from "@/src/types";
import { PAYMENT_STATUS_COLORS } from "@/src/constants/paymentStatus";
import { usePayments } from "@/src/hooks/usePayments";
import { formatDate } from "@/src/utils/formatDate";
import { formatPrice } from "@/src/utils/formatPrice";

export const PaymentHistory = () => {
  const { payments, fetchPayments, isLoading } = usePayments();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");

  // Memoized loadPayments to avoid useEffect warnings
  const loadPayments = useCallback(async () => {
    const query: any = {};
    if (statusFilter !== "all") {
      query.status = statusFilter;
    }
    await fetchPayments(query);
  }, [statusFilter, fetchPayments]);

  // Fetch payments whenever statusFilter changes
  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  // Filter payments by search query
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      searchQuery === "" ||
      payment.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Export CSV
  const handleExport = () => {
    const csv = [
      ["Date", "Transaction ID", "Amount", "Status", "Method"].join(","),
      ...filteredPayments.map((p) =>
        [
          formatDate(p.createdAt),
          p.id,
          p.amount,
          p.status,
          p.paymentMethod,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-history-${Date.now()}.csv`;
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle>Payment History</CardTitle>
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by transaction ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value as any)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Payment List */}
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-20 bg-gray-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          ) : filteredPayments.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No payment history found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="p-4 border rounded-lg hover:border-blue-500 hover:shadow-sm transition-all"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-900">
                          Transaction #{payment.id.slice(0, 8)}
                        </span>
                        <Badge className={PAYMENT_STATUS_COLORS[payment.status]}>
                          {payment.status}
                        </Badge>
                      </div>

                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Date: {formatDate(payment.createdAt, "MMM dd, yyyy HH:mm")}</p>
                        <p className="capitalize">Method: {payment.paymentMethod}</p>
                        {payment.transactionType && (
                          <p className="capitalize">Type: {payment.transactionType}</p>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatPrice(payment.amount, payment.currency)}
                      </p>
                      {payment.refundAmount && payment.refundAmount > 0 && (
                        <p className="text-sm text-red-600 mt-1">
                          Refunded: {formatPrice(payment.refundAmount)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistory;
