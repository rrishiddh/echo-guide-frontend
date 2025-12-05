import { format, formatDistance, formatRelative, parseISO, isValid, differenceInDays } from "date-fns";

export const formatDate = (
  date: Date | string | number,
  formatStr: string = "MMM dd, yyyy"
): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);

    if (!isValid(dateObj)) {
      return "Invalid date";
    }

    return format(dateObj, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid date";
  }
};

export const formatDateTime = (date: Date | string | number): string => {
  return formatDate(date, "MMM dd, yyyy HH:mm");
};

export const formatDateFull = (date: Date | string | number): string => {
  return formatDate(date, "EEEE, MMMM dd, yyyy");
};

export const formatDateShort = (date: Date | string | number): string => {
  return formatDate(date, "MM/dd/yy");
};

export const getTimeAgo = (date: Date | string | number): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);

    if (!isValid(dateObj)) {
      return "Invalid date";
    }

    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    console.error("Error getting time ago:", error);
    return "Invalid date";
  }
};

export const getRelativeTime = (date: Date | string | number): string => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);

    if (!isValid(dateObj)) {
      return "Invalid date";
    }

    return formatRelative(dateObj, new Date());
  } catch (error) {
    console.error("Error getting relative time:", error);
    return "Invalid date";
  }
};

export const isToday = (date: Date | string | number): boolean => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    const today = new Date();

    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  } catch (error) {
    return false;
  }
};

export const isPastDate = (date: Date | string | number): boolean => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    return dateObj < new Date();
  } catch (error) {
    return false;
  }
};

export const isFutureDate = (date: Date | string | number): boolean => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    return dateObj > new Date();
  } catch (error) {
    return false;
  }
};

export const getDaysUntil = (date: Date | string | number): number => {
  try {
    const dateObj = typeof date === "string" ? parseISO(date) : new Date(date);
    return differenceInDays(dateObj, new Date());
  } catch (error) {
    return 0;
  }
};

export const formatDateRange = (
  startDate: Date | string | number,
  endDate: Date | string | number
): string => {
  const start = formatDate(startDate, "MMM dd");
  const end = formatDate(endDate, "MMM dd, yyyy");
  return `${start} - ${end}`;
};

export const parseDate = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch (error) {
    return null;
  }
};