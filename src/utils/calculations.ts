export const calculatePercentage = (
  value: number,
  total: number,
  decimals: number = 2
): number => {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
};

export const calculateAverage = (
  numbers: number[],
  decimals: number = 2
): number => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return Number((sum / numbers.length).toFixed(decimals));
};

export const calculatePriceWithTax = (price: number, taxRate: number): number => {
  return price + (price * taxRate) / 100;
};

export const calculateDiscountAmount = (
  price: number,
  discountPercentage: number
): number => {
  return (price * discountPercentage) / 100;
};

export const calculateDiscountedPrice = (
  price: number,
  discountPercentage: number
): number => {
  return price - calculateDiscountAmount(price, discountPercentage);
};

export const calculateRatingPercentage = (rating: number): number => {
  return (rating / 5) * 100;
};

export const calculateTotal = (items: { price: number }[]): number => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

export const roundToNearest = (value: number, nearest: number = 1): number => {
  return Math.round(value / nearest) * nearest;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const calculatePagination = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): (number | string)[] => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | string)[] = [];
  const halfVisible = Math.floor(maxVisible / 2);
  let start = Math.max(1, currentPage - halfVisible);
  let end = Math.min(totalPages, currentPage + halfVisible);
  if (currentPage <= halfVisible) {
    end = maxVisible;
  }
  if (currentPage >= totalPages - halfVisible) {
    start = totalPages - maxVisible + 1;
  }
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("...");
  }
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (end < totalPages) {
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
};