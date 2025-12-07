"use client";
import { useState, useCallback, useMemo } from "react";

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = ({
  totalItems,
  itemsPerPage = 10,
  initialPage = 1,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [totalItems, itemsPerPage]);
  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);
  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems);
  }, [startIndex, itemsPerPage, totalItems]);
  const hasNextPage = useMemo(() => {
    return currentPage < totalPages;
  }, [currentPage, totalPages]);
  const hasPrevPage = useMemo(() => {
    return currentPage > 1;
  }, [currentPage]);
  const goToPage = useCallback(
    (page: number) => {
      const pageNumber = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(pageNumber);
    },
    [totalPages]
  );
  const nextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);
  const prevPage = useCallback(() => {
    if (hasPrevPage) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [hasPrevPage]);
  const reset = useCallback(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);
  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    reset,
  };
};
