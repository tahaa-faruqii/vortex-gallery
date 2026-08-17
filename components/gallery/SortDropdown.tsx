"use client";

import { SORT_OPTIONS } from "@/data/constants";
import { useGalleryStore } from "@/store/galleryStore";
import type { SortOption } from "@/types/gallery";

type SortDropdownProps = {
  id?: string;
};

export function SortDropdown({ id = "gallery-sort" }: SortDropdownProps) {
  const sortBy = useGalleryStore((state) => state.sortBy);
  const setSortBy = useGalleryStore((state) => state.setSortBy);

  return (
    <label className="relative inline-flex min-w-[160px] items-center">
      <span className="sr-only">Sort images</span>
      <select
        id={id}
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value as SortOption)}
        className="h-11 w-full appearance-none rounded-full border border-border bg-background px-4 pr-10 text-sm text-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
