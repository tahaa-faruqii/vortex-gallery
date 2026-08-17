"use client";

import { GalleryCard } from "@/components/gallery/GalleryCard";
import { cn } from "@/lib/cn";
import type { GalleryImage, GalleryLayout } from "@/types/gallery";

type GalleryGridProps = {
  images: GalleryImage[];
  layout: GalleryLayout;
};

export function GalleryGrid({ images, layout }: GalleryGridProps) {
  const queue = images.map((image) => image.id);

  if (layout === "masonry") {
    return (
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image) => (
          <GalleryCard
            key={image.id}
            image={image}
            layout={layout}
            queue={queue}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        layout === "compact"
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      )}
    >
      {images.map((image) => (
        <GalleryCard
          key={image.id}
          image={image}
          layout={layout}
          queue={queue}
        />
      ))}
    </div>
  );
}

export function MasonryGallery({ images }: { images: GalleryImage[] }) {
  return <GalleryGrid images={images} layout="masonry" />;
}
