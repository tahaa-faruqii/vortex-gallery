"use client";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import type { GalleryImage } from "@/types/gallery";

export function MasonryGallery({ images }: { images: GalleryImage[] }) {
  return <GalleryGrid images={images} layout="masonry" />;
}
