export const formatPrice = (
  amount: number,
  currency: string = "USD"
): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch (error) {
    console.error("Error formatting price:", error);
    return `$${amount.toFixed(2)}`;
  }
};

export const formatPriceWithSymbol = (
  amount: number,
  symbol: string = "$"
): string => {
  return `${symbol}${amount.toFixed(2)}`;
};

export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
  currency: string = "USD"
): string => {
  const min = formatPrice(minPrice, currency);
  const max = formatPrice(maxPrice, currency);
  return `${min} - ${max}`;
};

export const formatPriceCompact = (
  amount: number,
  currency: string = "USD"
): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      notation: "compact",
      compactDisplay: "short",
    }).format(amount);
  } catch (error) {
    return formatPrice(amount, currency);
  }
};

export const formatPriceNoDecimals = (
  amount: number,
  currency: string = "USD"
): string => {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch (error) {
    return `$${Math.round(amount)}`;
  }
};

export const parsePrice = (priceString: string): number => {
  try {
    const cleanedString = priceString.replace(/[^0-9.-]+/g, "");
    return parseFloat(cleanedString) || 0;
  } catch (error) {
    return 0;
  }
};

export const calculateDiscount = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

export const formatDiscount = (
  originalPrice: number,
  discountedPrice: number
): string => {
  const discount = calculateDiscount(originalPrice, discountedPrice);
  return discount > 0 ? `${discount}% off` : "";
};

export const getCurrencySymbol = (currency: string = "USD"): string => {
  const symbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    AUD: "A$",
    CAD: "C$",
    INR: "₹",
  };
  return symbols[currency.toUpperCase()] || "$";
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

export const calculatePlatformFee = (
  amount: number,
  feePercentage: number = 10
): number => {
  return (amount * feePercentage) / 100;
};

export const calculateTotalWithFee = (
  amount: number,
  feePercentage: number = 10
): number => {
  return amount + calculatePlatformFee(amount, feePercentage);
};