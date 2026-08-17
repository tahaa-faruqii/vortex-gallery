"use client";

import { SlidersHorizontal } from "lucide-react";
import { CategoryFilter } from "@/components/gallery/CategoryFilter";
import { LayoutSelector } from "@/components/gallery/LayoutSelector";
import { SearchInput } from "@/components/gallery/SearchInput";
import { SortDropdown } from "@/components/gallery/SortDropdown";
import { Button } from "@/components/ui/Button";
import { useGalleryStore } from "@/store/galleryStore";
import { useUiStore } from "@/store/uiStore";

type GalleryToolbarProps = {
  onCategoryChange?: (slug: string) => void;
  onSearchChange?: (query: string) => void;
};

export function GalleryToolbar({
  onCategoryChange,
  onSearchChange,
}: GalleryToolbarProps) {
  const searchQuery = useGalleryStore((state) => state.searchQuery);
  const setSearchQuery = useGalleryStore((state) => state.setSearchQuery);
  const setFilterDrawerOpen = useUiStore((state) => state.setFilterDrawerOpen);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <SearchInput
          value={searchQuery}
          onChange={(value) => {
            setSearchQuery(value);
            onSearchChange?.(value);
          }}
          className="lg:max-w-md"
        />
        <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
          <Button
            variant="outline"
            onClick={() => setFilterDrawerOpen(true)}
            aria-haspopup="dialog"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
          </Button>
          <SortDropdown />
          <LayoutSelector />
        </div>
      </div>
      <CategoryFilter onSelect={onCategoryChange} />
    </div>
  );
}
