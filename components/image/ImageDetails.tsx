"use client";

import { Download, Heart, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { downloadImage } from "@/lib/download";
import { formatCount, formatDate } from "@/lib/galleryUtils";
import { shareImage } from "@/lib/share";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useUiStore } from "@/store/uiStore";
import type { GalleryImage } from "@/types/gallery";

type ImageActionsProps = {
  image: GalleryImage;
};

export function ImageActions({ image }: ImageActionsProps) {
  const isFavorite = useFavoritesStore((state) =>
    state.favoriteIds.includes(image.id),
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addToast = useUiStore((state) => state.addToast);

  const onShare = async () => {
    const result = await shareImage(image);
    if (result === "copied") addToast("Link copied to clipboard");
    if (result === "failed") addToast("Unable to share this image", "error");
  };

  const onDownload = async () => {
    const ok = await downloadImage(image);
    addToast(ok ? "Image downloaded" : "Download failed", ok ? "default" : "error");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={isFavorite ? "primary" : "outline"}
        onClick={() => toggleFavorite(image.id)}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className="h-4 w-4"
          fill={isFavorite ? "currentColor" : "none"}
          aria-hidden="true"
        />
        Favorite
      </Button>
      <Button variant="outline" onClick={onShare}>
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </Button>
      <Button variant="outline" onClick={onDownload}>
        <Download className="h-4 w-4" aria-hidden="true" />
        Download
      </Button>
    </div>
  );
}

export function ImageDetails({ image }: { image: GalleryImage }) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{image.category}</Badge>
          <span className="text-xs text-muted">{formatDate(image.createdAt)}</span>
        </div>
        <h2 className="mt-3 font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          {image.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-muted">{image.description}</p>
      </div>
      <p className="text-sm text-foreground">
        By <span className="font-medium">{image.author}</span>
      </p>
      <div className="flex gap-6 text-sm text-muted">
        <span>{formatCount(image.likes)} likes</span>
        <span>{formatCount(image.views)} views</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {image.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-3 py-1 text-xs text-muted"
          >
            #{tag}
          </span>
        ))}
      </div>
      <ImageActions image={image} />
    </div>
  );
}
