
export const USER_ROLES = {
  TOURIST: "tourist",
  GUIDE: "guide",
  ADMIN: "admin",
} as const;


export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];


export const ROLE_LABELS = {
  [USER_ROLES.TOURIST]: "Tourist",
  [USER_ROLES.GUIDE]: "Guide",
  [USER_ROLES.ADMIN]: "Administrator",
} as const;


export const ROLE_DESCRIPTIONS = {
  [USER_ROLES.TOURIST]: "Explore tours, book guides, and discover local experiences",
  [USER_ROLES.GUIDE]: "Share your knowledge, create tours, and earn money",
  [USER_ROLES.ADMIN]: "Manage platform, users, and oversee operations",
} as const;


export const ROLE_ICONS = {
  [USER_ROLES.TOURIST]: "🧳",
  [USER_ROLES.GUIDE]: "🎯",
  [USER_ROLES.ADMIN]: "👨‍💼",
} as const;


export const ROLE_COLORS = {
  [USER_ROLES.TOURIST]: "blue",
  [USER_ROLES.GUIDE]: "green",
  [USER_ROLES.ADMIN]: "purple",
} as const;


export const ROLE_DASHBOARD_ROUTES = {
  [USER_ROLES.TOURIST]: "/dashboard/tourist",
  [USER_ROLES.GUIDE]: "/dashboard/guide",
  [USER_ROLES.ADMIN]: "/dashboard/admin",
} as const;

export const getDashboardRoute = (role: UserRole): string => {
  return ROLE_DASHBOARD_ROUTES[role] || "/dashboard/tourist";
};


export const getRoleLabel = (role: UserRole): string => {
  return ROLE_LABELS[role] || role;
};


export const getRoleDescription = (role: UserRole): string => {
  return ROLE_DESCRIPTIONS[role] || "";
};


export const isTourist = (role?: UserRole): boolean => {
  return role === USER_ROLES.TOURIST;
};


export const isGuide = (role?: UserRole): boolean => {
  return role === USER_ROLES.GUIDE;
};

export const isAdmin = (role?: UserRole): boolean => {
  return role === USER_ROLES.ADMIN;
};


export const getAllRoles = (): UserRole[] => {
  return Object.values(USER_ROLES);
};