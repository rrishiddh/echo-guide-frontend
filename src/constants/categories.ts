
export const TOUR_CATEGORIES = {
  FOOD: "Food",
  ART: "Art",
  ADVENTURE: "Adventure",
  HISTORY: "History",
  CULTURE: "Culture",
  NIGHTLIFE: "Nightlife",
  SHOPPING: "Shopping",
  NATURE: "Nature",
  PHOTOGRAPHY: "Photography",
  SPORTS: "Sports",
  WELLNESS: "Wellness",
  FAMILY: "Family",
} as const;


export type TourCategory = (typeof TOUR_CATEGORIES)[keyof typeof TOUR_CATEGORIES];


export const CATEGORY_DESCRIPTIONS = {
  [TOUR_CATEGORIES.FOOD]: "Culinary experiences, food tours, cooking classes, and local cuisine",
  [TOUR_CATEGORIES.ART]: "Art galleries, museums, street art tours, and cultural exhibitions",
  [TOUR_CATEGORIES.ADVENTURE]: "Hiking, climbing, extreme sports, and outdoor activities",
  [TOUR_CATEGORIES.HISTORY]: "Historical sites, monuments, heritage tours, and archaeological sites",
  [TOUR_CATEGORIES.CULTURE]: "Cultural experiences, traditions, local customs, and festivals",
  [TOUR_CATEGORIES.NIGHTLIFE]: "Bars, clubs, night tours, and entertainment venues",
  [TOUR_CATEGORIES.SHOPPING]: "Markets, boutiques, shopping districts, and local crafts",
  [TOUR_CATEGORIES.NATURE]: "Wildlife, national parks, nature walks, and eco-tours",
  [TOUR_CATEGORIES.PHOTOGRAPHY]: "Photo tours, scenic spots, and landscape photography",
  [TOUR_CATEGORIES.SPORTS]: "Sporting events, stadiums, and sports activities",
  [TOUR_CATEGORIES.WELLNESS]: "Yoga, meditation, spa tours, and wellness retreats",
  [TOUR_CATEGORIES.FAMILY]: "Family-friendly activities and kid-friendly tours",
} as const;


export const CATEGORY_ICONS = {
  [TOUR_CATEGORIES.FOOD]: "🍽️",
  [TOUR_CATEGORIES.ART]: "🎨",
  [TOUR_CATEGORIES.ADVENTURE]: "🏔️",
  [TOUR_CATEGORIES.HISTORY]: "🏛️",
  [TOUR_CATEGORIES.CULTURE]: "🎭",
  [TOUR_CATEGORIES.NIGHTLIFE]: "🌃",
  [TOUR_CATEGORIES.SHOPPING]: "🛍️",
  [TOUR_CATEGORIES.NATURE]: "🌿",
  [TOUR_CATEGORIES.PHOTOGRAPHY]: "📸",
  [TOUR_CATEGORIES.SPORTS]: "⚽",
  [TOUR_CATEGORIES.WELLNESS]: "🧘",
  [TOUR_CATEGORIES.FAMILY]: "👨‍👩‍👧‍👦",
} as const;


export const CATEGORY_COLORS = {
  [TOUR_CATEGORIES.FOOD]: "#FF6B6B",
  [TOUR_CATEGORIES.ART]: "#9B59B6",
  [TOUR_CATEGORIES.ADVENTURE]: "#E67E22",
  [TOUR_CATEGORIES.HISTORY]: "#8B4513",
  [TOUR_CATEGORIES.CULTURE]: "#3498DB",
  [TOUR_CATEGORIES.NIGHTLIFE]: "#2C3E50",
  [TOUR_CATEGORIES.SHOPPING]: "#E91E63",
  [TOUR_CATEGORIES.NATURE]: "#27AE60",
  [TOUR_CATEGORIES.PHOTOGRAPHY]: "#34495E",
  [TOUR_CATEGORIES.SPORTS]: "#F39C12",
  [TOUR_CATEGORIES.WELLNESS]: "#1ABC9C",
  [TOUR_CATEGORIES.FAMILY]: "#F1C40F",
} as const;


export const CATEGORY_GRADIENTS = {
  [TOUR_CATEGORIES.FOOD]: "from-red-500 to-orange-500",
  [TOUR_CATEGORIES.ART]: "from-purple-500 to-pink-500",
  [TOUR_CATEGORIES.ADVENTURE]: "from-orange-500 to-red-600",
  [TOUR_CATEGORIES.HISTORY]: "from-amber-700 to-yellow-600",
  [TOUR_CATEGORIES.CULTURE]: "from-blue-500 to-cyan-500",
  [TOUR_CATEGORIES.NIGHTLIFE]: "from-gray-800 to-gray-600",
  [TOUR_CATEGORIES.SHOPPING]: "from-pink-500 to-rose-500",
  [TOUR_CATEGORIES.NATURE]: "from-green-500 to-emerald-600",
  [TOUR_CATEGORIES.PHOTOGRAPHY]: "from-slate-700 to-gray-600",
  [TOUR_CATEGORIES.SPORTS]: "from-yellow-500 to-orange-500",
  [TOUR_CATEGORIES.WELLNESS]: "from-teal-500 to-cyan-500",
  [TOUR_CATEGORIES.FAMILY]: "from-yellow-400 to-amber-500",
} as const;


export const getAllCategories = (): TourCategory[] => {
  return Object.values(TOUR_CATEGORIES);
};


export const getCategoryOptions = () => {
  return getAllCategories().map((category) => ({
    label: category,
    value: category,
    icon: CATEGORY_ICONS[category],
  }));
};


export const getCategoryDescription = (category: TourCategory): string => {
  return CATEGORY_DESCRIPTIONS[category] || "";
};


export const getCategoryIcon = (category: TourCategory): string => {
  return CATEGORY_ICONS[category] || "📍";
};


export const getCategoryColor = (category: TourCategory): string => {
  return CATEGORY_COLORS[category] || "#95A5A6";
};


export const getCategoryGradient = (category: TourCategory): string => {
  return CATEGORY_GRADIENTS[category] || "from-gray-500 to-gray-700";
};


export const POPULAR_CATEGORIES = [
  TOUR_CATEGORIES.FOOD,
  TOUR_CATEGORIES.HISTORY,
  TOUR_CATEGORIES.CULTURE,
  TOUR_CATEGORIES.ADVENTURE,
  TOUR_CATEGORIES.NATURE,
  TOUR_CATEGORIES.PHOTOGRAPHY,
] as const;