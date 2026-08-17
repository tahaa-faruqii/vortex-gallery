"use client";

import { Heart, Eye } from "lucide-react";
import { memo } from "react";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/image/SafeImage";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/galleryUtils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useGalleryStore } from "@/store/galleryStore";
import type { GalleryImage, GalleryLayout } from "@/types/gallery";

type GalleryCardProps = {
  image: GalleryImage;
  layout: GalleryLayout;
  queue: string[];
};

export const GalleryCard = memo(function GalleryCard({
  image,
  layout,
  queue,
}: GalleryCardProps) {
  const selectImage = useGalleryStore((state) => state.selectImage);
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(image.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const compact = layout === "compact";
  const grid = layout === "grid";

  return (
    <article
      className={cn(
        "group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-border bg-surface",
        grid && "mb-0 aspect-[4/5]",
        compact && "mb-0 aspect-square",
      )}
    >
      <button
        type="button"
        onClick={() => selectImage(image.id, queue)}
        className="relative block h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        aria-label={`View ${image.title}`}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            layout === "masonry" && "w-full",
            (grid || compact) && "absolute inset-0",
          )}
        >
          <SafeImage
            src={image.imageUrl}
            alt={image.title}
            width={image.width}
            height={image.height}
            fill={grid || compact}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
              layout === "masonry" ? "h-auto w-full" : "object-cover",
            )}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
          <Badge className="border-white/15 bg-black/30 text-white/80">
            {image.category}
          </Badge>
          <h3 className="mt-2 font-serif text-lg leading-tight text-white sm:text-xl">
            {image.title}
          </h3>
          <p className="mt-1 text-xs text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
            {image.author}
          </p>
        </div>
      </button>

      <div className="absolute top-3 right-3 z-20 flex items-center gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(image.id);
          }}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
            isFavorite && "text-rose-400",
          )}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart
            className="h-4 w-4"
            fill={isFavorite ? "currentColor" : "none"}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          onClick={() => selectImage(image.id, queue)}
          className="hidden h-10 items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 text-xs font-medium text-white backdrop-blur-md transition hover:bg-black/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:flex"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          View
        </button>
      </div>

      {image.featured ? (
        <span className="absolute top-3 left-3 z-20 rounded-full bg-accent px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-accent-fg uppercase">
          Featured
        </span>
      ) : (
        <span className="absolute top-3 left-3 z-10 hidden items-center gap-1 rounded-full bg-black/35 px-2 py-1 text-[10px] text-white/80 backdrop-blur-sm sm:group-hover:flex">
          {formatCount(image.likes)}
        </span>
      )}
    </article>
  );
});
