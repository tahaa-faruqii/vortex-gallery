"use client";

import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Header } from "@/components/home/FeaturedGallery";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { getRecentImages, getTrendingImages } from "@/lib/galleryUtils";

export function TrendingGallery() {
  const images = getTrendingImages(GALLERY_IMAGES, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Header
        eyebrow="Trending"
        title="What people are returning to"
        description="Ranked locally from likes, views, and recency — not a remote feed."
      />
      <div className="mt-8">
        <GalleryGrid images={images} layout="grid" />
      </div>
    </section>
  );
}

export function RecentlyAdded() {
  const images = getRecentImages(GALLERY_IMAGES, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Header
        eyebrow="New"
        title="Recently added"
        description="Fresh arrivals to the collection, still settling into the archive."
      />
      <div className="mt-8">
        <GalleryGrid images={images} layout="masonry" />
      </div>
    </section>
  );
}
