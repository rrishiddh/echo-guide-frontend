import { format, parseISO, isValid } from "date-fns";

export const formatTime = (time: string | Date): string => {
  try {
    const date = typeof time === "string" ? parseISO(time) : time;

    if (!isValid(date)) {
      return "Invalid time";
    }

    return format(date, "HH:mm");
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid time";
  }
};

export const formatTime12Hour = (time: string | Date): string => {
  try {
    const date = typeof time === "string" ? parseISO(time) : time;

    if (!isValid(date)) {
      return "Invalid time";
    }

    return format(date, "h:mm a");
  } catch (error) {
    return "Invalid time";
  }
};

export const formatTimeRange = (
  startTime: string | Date,
  endTime: string | Date
): string => {
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  return `${start} - ${end}`;
};

export const formatTimeRange12Hour = (
  startTime: string | Date,
  endTime: string | Date
): string => {
  const start = formatTime12Hour(startTime);
  const end = formatTime12Hour(endTime);
  return `${start} - ${end}`;
};

export const parseTime = (timeString: string): Date | null => {
  try {
    const [hours, minutes] = timeString.split(":").map(Number);

    if (isNaN(hours) || isNaN(minutes)) {
      return null;
    }

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date;
  } catch (error) {
    return null;
  }
};

export const calculateDuration = (
  startTime: string | Date,
  endTime: string | Date
): number => {
  try {
    const start = typeof startTime === "string" ? parseTime(startTime) : startTime;
    const end = typeof endTime === "string" ? parseTime(endTime) : endTime;

    if (!start || !end) {
      return 0;
    }

    return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
  } catch (error) {
    return 0;
  }
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}m`;
};

export const formatDurationLong = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""}`;
  }

  return `${hours} hour${hours !== 1 ? "s" : ""} ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""}`;
};

export const addMinutes = (time: string | Date, minutes: number): Date => {
  const date = typeof time === "string" ? parseTime(time) : new Date(time);

  if (!date) {
    return new Date();
  }

  return new Date(date.getTime() + minutes * 60000);
};

export const isValidTime = (timeString: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
};