import type { AdvancedFilters, GalleryLayout, SortOption } from "@/types/gallery";

export const APP_NAME = "Vortex Gallery";

export const STORAGE_KEYS = {
  favorites: "vortex-favorites",
  preferences: "vortex-preferences",
} as const;

export const DEFAULT_LAYOUT: GalleryLayout = "masonry";
export const DEFAULT_SORT: SortOption = "popular";
export const DEFAULT_CATEGORY = "all";
export const RECENTLY_VIEWED_LIMIT = 10;
export const GALLERY_PAGE_SIZE = 12;

export const DEFAULT_ADVANCED_FILTERS: AdvancedFilters = {
  categories: [],
  orientation: null,
  popularity: "all",
  date: null,
};

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popular", label: "Most Popular" },
  { value: "viewed", label: "Most Viewed" },
  { value: "newest", label: "Recently Added" },
  { value: "oldest", label: "Oldest" },
  { value: "az", label: "A–Z" },
  { value: "za", label: "Z–A" },
];

export const LAYOUT_OPTIONS: { value: GalleryLayout; label: string }[] = [
  { value: "masonry", label: "Masonry" },
  { value: "grid", label: "Grid" },
  { value: "compact", label: "Compact" },
];
