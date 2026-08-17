"use client";

import { useMemo } from "react";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { filterAndSortImages, filterBySearch, sortImages } from "@/lib/galleryUtils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useGalleryStore } from "@/store/galleryStore";
import { usePreferencesStore } from "@/store/preferencesStore";
import type { GalleryImage } from "@/types/gallery";

export function useFilteredImages(source?: GalleryImage[]): GalleryImage[] {
  const images = source ?? GALLERY_IMAGES;
  const searchQuery = useGalleryStore((state) => state.searchQuery);
  const selectedCategory = useGalleryStore((state) => state.selectedCategory);
  const sortBy = useGalleryStore((state) => state.sortBy);
  const advancedFilters = useGalleryStore((state) => state.advancedFilters);

  return useMemo(
    () =>
      filterAndSortImages(images, {
        searchQuery,
        selectedCategory,
        sortBy,
        filters: advancedFilters,
      }),
    [images, searchQuery, selectedCategory, sortBy, advancedFilters],
  );
}

export function useFavoriteImages(searchQuery: string): GalleryImage[] {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const sortBy = useGalleryStore((state) => state.sortBy);

  return useMemo(() => {
    const favorites = favoriteIds
      .map((id) => GALLERY_IMAGES.find((image) => image.id === id))
      .filter((image): image is GalleryImage => Boolean(image));
    return sortImages(filterBySearch(favorites, searchQuery), sortBy);
  }, [favoriteIds, searchQuery, sortBy]);
}

export function useRecentlyViewedImages(): GalleryImage[] {
  const ids = usePreferencesStore((state) => state.recentlyViewedIds);
  return useMemo(
    () =>
      ids
        .map((id) => GALLERY_IMAGES.find((image) => image.id === id))
        .filter((image): image is GalleryImage => Boolean(image)),
    [ids],
  );
}

export function useReducedMotion(): boolean {
  const reducedMotion = usePreferencesStore((state) => state.reducedMotion);
  return reducedMotion;
}
