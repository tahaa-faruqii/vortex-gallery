export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: string;
  tags: string[];
  author: string;
  authorAvatar?: string;
  width: number;
  height: number;
  likes: number;
  views: number;
  createdAt: string;
  featured?: boolean;
}

export type SortOption =
  | "popular"
  | "viewed"
  | "newest"
  | "oldest"
  | "az"
  | "za";

export type GalleryLayout = "masonry" | "grid" | "compact";

export type ThemeMode = "dark" | "light";

export type Orientation = "landscape" | "portrait" | "square";

export type PopularityFilter = "all" | "popular" | "trending";

export type DateFilter = "newest" | "month" | "older";

export interface AdvancedFilters {
  categories: string[];
  orientation: Orientation | null;
  popularity: PopularityFilter;
  date: DateFilter | null;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  coverImage: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  tone?: "default" | "success" | "error";
}
