/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  icon?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
  content?: React.ReactNode;
}

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

export interface FilterOption {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "in" | "contains";
  value: any;
}

export interface SortOption {
  field: string;
  order: "asc" | "desc";
}

export interface DateRange {
  startDate?: Date | string;
  endDate?: Date | string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street?: string;
  city: string;
  state?: string;
  country: string;
  zipCode?: string;
  coordinates?: Coordinates;
}

export interface FileUpload {
  file: File;
  preview?: string;
  progress?: number;
  error?: string;
}

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  label: string;
  value: number | string;
  change?: number;
  trend?: "up" | "down";
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
  }[];
}

export interface SearchFilters {
  query?: string;
  category?: string | string[];
  city?: string;
  country?: string;
  minPrice?: number;
  maxPrice?: number;
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  languages?: string[];
  date?: Date | string;
  [key: string]: any;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export interface AvailabilitySlot {
  date: Date | string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  maxCapacity?: number;
  currentBookings?: number;
}

export interface Guide {
  id: string;
  name: string;
  email: string;
  profilePic: string;
  bio: string;
  languagesSpoken: string[];
  expertise: string[];
  dailyRate: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;   
  averageRating: number;
  totalReviews: number;
  totalTours: number;
  role: "guide";
}