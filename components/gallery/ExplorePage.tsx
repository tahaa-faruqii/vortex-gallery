"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { GalleryToolbar } from "@/components/gallery/GalleryToolbar";
import { GalleryView } from "@/components/gallery/GalleryView";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { SORT_OPTIONS } from "@/data/constants";
import { CATEGORY_CHIPS } from "@/data/categories";
import { useFilteredImages } from "@/lib/useFilteredImages";
import { useGalleryStore } from "@/store/galleryStore";
import type { SortOption } from "@/types/gallery";

export function ExplorePage() {
  const images = useFilteredImages();
  const searchQuery = useGalleryStore((state) => state.searchQuery);
  const selectedCategory = useGalleryStore((state) => state.selectedCategory);
  const sortBy = useGalleryStore((state) => state.sortBy);
  const setSearchQuery = useGalleryStore((state) => state.setSearchQuery);
  const setCategory = useGalleryStore((state) => state.setCategory);
  const setSortBy = useGalleryStore((state) => state.setSortBy);
  const resetFilters = useGalleryStore((state) => state.resetFilters);
  const selectImage = useGalleryStore((state) => state.selectImage);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const skipUrlWrite = useRef(true);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const category = searchParams.get("category") ?? "all";
    const sort = searchParams.get("sort");
    const imageId = searchParams.get("image");
    const validCategory = CATEGORY_CHIPS.some((item) => item.slug === category)
      ? category
      : "all";
    const validSort = SORT_OPTIONS.some((item) => item.value === sort)
      ? (sort as SortOption)
      : null;

    setSearchQuery(q);
    setCategory(validCategory);
    if (validSort) setSortBy(validSort);
    if (imageId && GALLERY_IMAGES.some((image) => image.id === imageId)) {
      selectImage(
        imageId,
        GALLERY_IMAGES.map((image) => image.id),
      );
    }
    // Sync from the landing URL once; later updates are written back below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (skipUrlWrite.current) {
      skipUrlWrite.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (sortBy !== "popular") params.set("sort", sortBy);
    const next = params.toString();
    const current = searchParams.toString();
    const nextUrl = next ? `${pathname}?${next}` : pathname;
    const currentUrl = current ? `${pathname}?${current}` : pathname;
    if (nextUrl !== currentUrl) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [
    searchQuery,
    selectedCategory,
    sortBy,
    pathname,
    router,
    searchParams,
  ]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Archive</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Explore Gallery</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
        Search, filter, and rearrange the collection. Everything stays on this
        device — no account required.
      </p>
      <div className="mt-8">
        <GalleryToolbar
          onCategoryChange={(slug) => {
            setCategory(slug);
          }}
        />
      </div>
      <div className="mt-8">
        <GalleryView
          images={images}
          onClear={resetFilters}
          clearLabel="Clear Search"
        />
      </div>
    </div>
  );
}
