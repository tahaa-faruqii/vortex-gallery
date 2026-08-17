"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { SearchInput } from "@/components/gallery/SearchInput";
import { SortDropdown } from "@/components/gallery/SortDropdown";
import { LayoutSelector } from "@/components/gallery/LayoutSelector";
import { GalleryView } from "@/components/gallery/GalleryView";
import { EmptyState } from "@/components/ui/EmptyState";
import { useFavoriteImages } from "@/lib/useFilteredImages";
import { useFavoritesStore } from "@/store/favoritesStore";

export function FavoritesPage() {
  const [query, setQuery] = useState("");
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
  const images = useFavoriteImages(query);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Saved</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">Your Favorites</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
        Your personally curated collection. It remains here after refresh.
      </p>
      <p className="mt-4 text-sm text-foreground">
        {favoriteCount} saved visual{favoriteCount === 1 ? "" : "s"}
      </p>

      {favoriteCount === 0 ? (
        <div className="mt-10">
          <EmptyState
            icon={<Heart className="h-6 w-6" aria-hidden="true" />}
            title="Your collection is empty"
            description="Save visuals you love and they will appear here."
            actionLabel="Explore Gallery"
            href="/explore"
          />
        </div>
      ) : (
        <>
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder="Search your favorites"
              className="lg:max-w-md"
            />
            <div className="flex flex-wrap gap-2 lg:ml-auto">
              <SortDropdown id="favorites-sort" />
              <LayoutSelector />
            </div>
          </div>
          <div className="mt-8">
            <GalleryView
              images={images}
              emptyTitle="No matching favorites"
              emptyDescription="Try another keyword inside your saved collection."
              onClear={() => setQuery("")}
            />
          </div>
        </>
      )}
    </div>
  );
}
