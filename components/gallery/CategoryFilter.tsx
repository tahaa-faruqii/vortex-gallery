"use client";

import { CATEGORY_CHIPS } from "@/data/categories";
import { cn } from "@/lib/cn";
import { useGalleryStore } from "@/store/galleryStore";

type CategoryFilterProps = {
  onSelect?: (slug: string) => void;
};

export function CategoryFilter({ onSelect }: CategoryFilterProps) {
  const selectedCategory = useGalleryStore((state) => state.selectedCategory);
  const setCategory = useGalleryStore((state) => state.setCategory);

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CATEGORY_CHIPS.map((category) => {
        const active = selectedCategory === category.slug;
        return (
          <button
            key={category.slug}
            type="button"
            onClick={() => {
              setCategory(category.slug);
              onSelect?.(category.slug);
            }}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              active
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background/40 text-muted hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {category.name}
          </button>
        );
      })}
    </div>
  );
}
