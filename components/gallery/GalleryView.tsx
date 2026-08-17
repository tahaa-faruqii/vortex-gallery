"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { GALLERY_PAGE_SIZE } from "@/data/constants";
import { useGalleryStore } from "@/store/galleryStore";
import type { GalleryImage } from "@/types/gallery";

type GalleryViewProps = {
  images: GalleryImage[];
  emptyTitle?: string;
  emptyDescription?: string;
  onClear?: () => void;
  clearLabel?: string;
};

export function GalleryView({
  images,
  emptyTitle = "No visuals found",
  emptyDescription = "Try another keyword or explore all categories.",
  onClear,
  clearLabel = "Clear Search",
}: GalleryViewProps) {
  const layout = useGalleryStore((state) => state.layout);
  const searchQuery = useGalleryStore((state) => state.searchQuery);
  const [visible, setVisible] = useState(GALLERY_PAGE_SIZE);
  const [imageSignature, setImageSignature] = useState(() =>
    images.map((image) => image.id).join("|"),
  );
  const nextSignature = images.map((image) => image.id).join("|");
  if (nextSignature !== imageSignature) {
    setImageSignature(nextSignature);
    setVisible(GALLERY_PAGE_SIZE);
  }

  const shown = useMemo(
    () => images.slice(0, visible),
    [images, visible],
  );

  if (images.length === 0) {
    return (
      <EmptyState
        icon={<Search className="h-6 w-6" aria-hidden="true" />}
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={searchQuery || onClear ? clearLabel : undefined}
        onAction={onClear}
      />
    );
  }

  return (
    <div>
      <p className="mb-5 text-sm text-muted">
        {images.length} visual{images.length === 1 ? "" : "s"}
      </p>
      <GalleryGrid images={shown} layout={layout} />
      {visible < images.length ? (
        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setVisible((count) => count + GALLERY_PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      ) : null}
    </div>
  );
}
