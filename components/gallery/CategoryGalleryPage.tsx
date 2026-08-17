"use client";

import { useEffect } from "react";
import { GalleryToolbar } from "@/components/gallery/GalleryToolbar";
import { GalleryView } from "@/components/gallery/GalleryView";
import { CATEGORIES } from "@/data/categories";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { categoryLabel } from "@/lib/galleryUtils";
import { useFilteredImages } from "@/lib/useFilteredImages";
import { useGalleryStore } from "@/store/galleryStore";

export function CategoryGalleryPage({ slug }: { slug: string }) {
  const category = CATEGORIES.find((item) => item.slug === slug);
  const setCategory = useGalleryStore((state) => state.setCategory);
  const resetFilters = useGalleryStore((state) => state.resetFilters);
  const images = useFilteredImages();

  useEffect(() => {
    if (category) setCategory(category.slug);
  }, [category, setCategory]);

  if (!category) return null;

  const count = GALLERY_IMAGES.filter((image) => image.category === slug).length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Category</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">{category.name}</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
        {category.description} {count} visuals in this room of the archive.
      </p>
      <div className="mt-8">
        <GalleryToolbar />
      </div>
      <div className="mt-8">
        <GalleryView
          images={images}
          emptyTitle={`No ${categoryLabel(slug)} visuals`}
          emptyDescription="This combination of search and filters is empty."
          onClear={resetFilters}
        />
      </div>
    </div>
  );
}
