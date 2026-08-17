"use client";

import { Columns2, LayoutGrid, Rows3 } from "lucide-react";
import { LAYOUT_OPTIONS } from "@/data/constants";
import { cn } from "@/lib/cn";
import { useGalleryStore } from "@/store/galleryStore";
import type { GalleryLayout } from "@/types/gallery";

const ICONS: Record<GalleryLayout, typeof LayoutGrid> = {
  masonry: Columns2,
  grid: LayoutGrid,
  compact: Rows3,
};

export function LayoutSelector() {
  const layout = useGalleryStore((state) => state.layout);
  const setLayout = useGalleryStore((state) => state.setLayout);

  return (
    <div
      className="inline-flex rounded-full border border-border bg-background p-1"
      role="group"
      aria-label="Gallery layout"
    >
      {LAYOUT_OPTIONS.map((option) => {
        const Icon = ICONS[option.value];
        const active = layout === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLayout(option.value)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground",
            )}
            aria-label={option.label}
            aria-pressed={active}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
