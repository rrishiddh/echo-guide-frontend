import { PUBLIC_ROUTES, DASHBOARD_ROUTES, USER_ROLES } from "../constants";
import { UserRole } from "../types";

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  external?: boolean;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: "Home",
    href: PUBLIC_ROUTES.HOME,
  },
  {
    label: "Explore Tours",
    href: PUBLIC_ROUTES.LISTINGS,
  },
  {
    label: "Find Guides",
    href: PUBLIC_ROUTES.GUIDES,
  },
  {
    label: "How It Works",
    href: PUBLIC_ROUTES.HOW_IT_WORKS,
  },
  {
    label: "Become a Guide",
    href: PUBLIC_ROUTES.BECOME_GUIDE,
  },
];

export const footerNav = {
  company: [
    { label: "About Us", href: PUBLIC_ROUTES.ABOUT },
    { label: "How It Works", href: PUBLIC_ROUTES.HOW_IT_WORKS },
    { label: "Become a Guide", href: PUBLIC_ROUTES.BECOME_GUIDE },
    { label: "Contact", href: PUBLIC_ROUTES.CONTACT },
  ],
  support: [
    { label: "FAQ", href: PUBLIC_ROUTES.FAQ },
    { label: "Help Center", href: PUBLIC_ROUTES.CONTACT },
    { label: "Privacy Policy",href: PUBLIC_ROUTES.CONTACT},
    { label: "Terms of Service", href: "/contact" },
  ],
  discover: [
    { label: "Popular Tours", href: `${PUBLIC_ROUTES.LISTINGS}?sort=popular` },
    { label: "Top Guides", href: `${PUBLIC_ROUTES.GUIDES}?sort=rating` },
    { label: "Featured Experiences", href: `${PUBLIC_ROUTES.LISTINGS}?featured=true` },
  ],
};

export const touristNav: NavItem[] = [
  {
    label: "Dashboard",
    href: DASHBOARD_ROUTES.TOURIST,
    icon: "LayoutDashboard",
  },
  {
    label: "My Bookings",
    href: DASHBOARD_ROUTES.TOURIST_BOOKINGS,
    icon: "Calendar",
  },
  {
    label: "My Reviews",
    href: DASHBOARD_ROUTES.TOURIST_REVIEWS,
    icon: "Star",
  },
  {
    label: "Wishlist",
    href: DASHBOARD_ROUTES.TOURIST_WISHLIST,
    icon: "Heart",
  },
];

export const guideNav: NavItem[] = [
  {
    label: "Dashboard",
    href: DASHBOARD_ROUTES.GUIDE,
    icon: "LayoutDashboard",
  },
  {
    label: "My Listings",
    href: DASHBOARD_ROUTES.GUIDE_LISTINGS,
    icon: "MapPin",
  },
  {
    label: "Bookings",
    href: DASHBOARD_ROUTES.GUIDE_BOOKINGS,
    icon: "Calendar",
  },
  {
    label: "Earnings",
    href: DASHBOARD_ROUTES.GUIDE_EARNINGS,
    icon: "DollarSign",
  },
  
  {
    label: "Analytics",
    href: DASHBOARD_ROUTES.GUIDE_ANALYTICS,
    icon: "BarChart",
  },
];

export const adminNav: NavItem[] = [
  {
    label: "Dashboard",
    href: DASHBOARD_ROUTES.ADMIN,
    icon: "LayoutDashboard",
  },
  {
    label: "Users",
    href: DASHBOARD_ROUTES.ADMIN_USERS,
    icon: "Users",
  },
  {
    label: "Guides",
    href: DASHBOARD_ROUTES.ADMIN_GUIDES,
    icon: "UserCheck",
  },
  {
    label: "Listings",
    href: DASHBOARD_ROUTES.ADMIN_LISTINGS,
    icon: "MapPin",
  },
  {
    label: "Bookings",
    href: DASHBOARD_ROUTES.ADMIN_BOOKINGS,
    icon: "Calendar",
  },
  {
    label: "Payments",
    href: DASHBOARD_ROUTES.ADMIN_PAYMENTS,
    icon: "CreditCard",
  },
  {
    label: "Reviews",
    href: DASHBOARD_ROUTES.ADMIN_REVIEWS,
    icon: "MessageSquare",
  },
  {
    label: "Analytics",
    href: DASHBOARD_ROUTES.ADMIN_ANALYTICS,
    icon: "TrendingUp",
  },
  {
    label: "Reports",
    href: DASHBOARD_ROUTES.ADMIN_REPORTS,
    icon: "FileText",
  },
  {
    label: "Settings",
    href: DASHBOARD_ROUTES.ADMIN_SETTINGS,
    icon: "Settings",
  },
];

export const getDashboardNav = (role: UserRole): NavItem[] => {
  switch (role) {
    case USER_ROLES.TOURIST:
      return touristNav;
    case USER_ROLES.GUIDE:
      return guideNav;
    case USER_ROLES.ADMIN:
      return adminNav;
    default:
      return touristNav;
  }
};

export const profileNav: NavItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: "User",
  },
  {
    label: "Settings",
    href: "/profile/settings",
    icon: "Settings",
  },
  {
    label: "Change Password",
    href: "/profile/change-password",
    icon: "Lock",
  },
  {
    label: "Preferences",
    href: "/profile/preferences",
    icon: "Sliders",
  },
];

export const mobileNav: NavItem[] = [
  ...mainNav,
  {
    label: "Login",
    href: "/auth/login",
  },
  {
    label: "Register",
    href: "/auth/register",
  },
];