import { DEFAULT_ADVANCED_FILTERS } from "@/data/constants";
import type {
  AdvancedFilters,
  GalleryImage,
  Orientation,
  SortOption,
} from "@/types/gallery";

const REFERENCE_NOW = new Date("2026-08-15T00:00:00.000Z").getTime();

export function getOrientation(image: GalleryImage): Orientation {
  const ratio = image.width / image.height;
  if (ratio > 1.08) return "landscape";
  if (ratio < 0.92) return "portrait";
  return "square";
}

export function getRecencyScore(
  image: GalleryImage,
  now = REFERENCE_NOW,
): number {
  const ageDays =
    (now - new Date(image.createdAt).getTime()) / (1000 * 60 * 60 * 24);
  return Math.max(0, 1 - ageDays / 365);
}

export function getTrendingScore(
  image: GalleryImage,
  now = REFERENCE_NOW,
): number {
  return (
    image.likes * 0.6 + image.views * 0.3 + getRecencyScore(image, now) * 0.1
  );
}

export function matchesSearch(image: GalleryImage, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const haystack = [
    image.title,
    image.description,
    image.category,
    image.author,
    ...image.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

export function filterBySearch(
  images: GalleryImage[],
  query: string,
): GalleryImage[] {
  const q = query.trim().toLowerCase();
  if (!q) return images;
  return images.filter((image) => matchesSearch(image, q));
}

export function filterByCategory(
  images: GalleryImage[],
  category: string,
): GalleryImage[] {
  if (!category || category === "all") return images;
  return images.filter((image) => image.category === category);
}

function matchesDate(image: GalleryImage, date: AdvancedFilters["date"]): boolean {
  if (!date) return true;
  const created = new Date(image.createdAt);
  if (Number.isNaN(created.getTime())) return false;

  if (date === "newest") {
    const sixtyDaysAgo = REFERENCE_NOW - 60 * 24 * 60 * 60 * 1000;
    return created.getTime() >= sixtyDaysAgo;
  }

  if (date === "month") {
    return created.getUTCFullYear() === 2026 && created.getUTCMonth() === 7;
  }

  return created.getUTCFullYear() < 2026;
}

function matchesPopularity(
  image: GalleryImage,
  popularity: AdvancedFilters["popularity"],
  trendingIds: Set<string>,
): boolean {
  if (popularity === "all") return true;
  if (popularity === "popular") return image.likes >= 1000;
  return trendingIds.has(image.id);
}

export function applyAdvancedFilters(
  images: GalleryImage[],
  filters: AdvancedFilters,
): GalleryImage[] {
  const trendingCutoff = [...images]
    .sort((a, b) => getTrendingScore(b) - getTrendingScore(a))
    .slice(0, Math.max(1, Math.ceil(images.length * 0.3)))
    .map((image) => image.id);
  const trendingIds = new Set(trendingCutoff);

  return images.filter((image) => {
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(image.category)
    ) {
      return false;
    }

    if (
      filters.orientation &&
      getOrientation(image) !== filters.orientation
    ) {
      return false;
    }

    if (!matchesPopularity(image, filters.popularity, trendingIds)) {
      return false;
    }

    if (!matchesDate(image, filters.date)) {
      return false;
    }

    return true;
  });
}

export function sortImages(
  images: GalleryImage[],
  sortBy: SortOption,
): GalleryImage[] {
  const sorted = [...images];

  switch (sortBy) {
    case "popular":
      sorted.sort((a, b) => b.likes - a.likes);
      break;
    case "viewed":
      sorted.sort((a, b) => b.views - a.views);
      break;
    case "newest":
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case "oldest":
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
      break;
    case "az":
      sorted.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "za":
      sorted.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return sorted;
}

export function filterAndSortImages(
  images: GalleryImage[],
  options: {
    searchQuery: string;
    selectedCategory: string;
    sortBy: SortOption;
    filters?: AdvancedFilters;
  },
): GalleryImage[] {
  const filters = options.filters ?? DEFAULT_ADVANCED_FILTERS;
  let result = filterBySearch(images, options.searchQuery);

  if (filters.categories.length > 0) {
    result = result.filter((image) =>
      filters.categories.includes(image.category),
    );
  } else {
    result = filterByCategory(result, options.selectedCategory);
  }

  result = applyAdvancedFilters(result, {
    ...filters,
    categories: [],
  });

  return sortImages(result, options.sortBy);
}

export function getFeaturedImages(images: GalleryImage[]): GalleryImage[] {
  return images.filter((image) => image.featured);
}

export function getTrendingImages(
  images: GalleryImage[],
  limit = 8,
): GalleryImage[] {
  return [...images]
    .sort((a, b) => getTrendingScore(b) - getTrendingScore(a))
    .slice(0, limit);
}

export function getRecentImages(
  images: GalleryImage[],
  limit = 8,
): GalleryImage[] {
  return sortImages(images, "newest").slice(0, limit);
}

export function getImageById(
  images: GalleryImage[],
  id: string,
): GalleryImage | undefined {
  return images.find((image) => image.id === id);
}

export function formatCount(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function categoryLabel(slug: string): string {
  if (slug === "all") return "All";
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

export function getShareUrl(image: GalleryImage): string {
  if (typeof window === "undefined") return image.imageUrl;
  const url = new URL(window.location.origin);
  url.pathname = "/explore";
  url.searchParams.set("image", image.id);
  return url.toString();
}
