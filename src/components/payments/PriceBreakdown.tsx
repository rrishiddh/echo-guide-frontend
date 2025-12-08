"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatPrice } from "@/src/utils/formatPrice";

interface PriceBreakdownProps {
  basePrice: number;
  numberOfPeople?: number;
  serviceFee?: number;
  serviceFeePercentage?: number;
  tax?: number;
  taxPercentage?: number;
  discount?: number;
  discountCode?: string;
  currency?: string;
  showTotal?: boolean;
}

export const PriceBreakdown = ({
  basePrice,
  numberOfPeople = 1,
  serviceFee,
  serviceFeePercentage = 10,
  tax,
  taxPercentage = 8,
  discount = 0,
  discountCode,
  currency = "USD",
  showTotal = true,
}: PriceBreakdownProps) => {
  const subtotal = basePrice * numberOfPeople;
  const calculatedServiceFee = serviceFee || (subtotal * serviceFeePercentage) / 100;
  const calculatedTax = tax || (subtotal * taxPercentage) / 100;
  const total = subtotal + calculatedServiceFee + calculatedTax - discount;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">
                Base price × {numberOfPeople}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Price per person for this tour</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-medium text-gray-900">
              {formatPrice(subtotal, currency)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Service fee</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Platform service fee ({serviceFeePercentage}%)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-medium text-gray-900">
              {formatPrice(calculatedServiceFee, currency)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Tax</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Local tax ({taxPercentage}%)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="font-medium text-gray-900">
              {formatPrice(calculatedTax, currency)}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-green-600 font-medium">Discount</span>
                {discountCode && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {discountCode}
                  </Badge>
                )}
              </div>
              <span className="font-medium text-green-600">
                -{formatPrice(discount, currency)}
              </span>
            </div>
          )}
        </div>

        {showTotal && (
          <>
            <Separator />
            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(total, currency)}
              </span>
            </div>
          </>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-sm text-blue-800">
            <strong>What&apos;s included:</strong> Platform protection, 24/7 support,
            and secure payment processing
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceBreakdown;