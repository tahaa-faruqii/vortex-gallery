"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SafeImage } from "@/components/image/SafeImage";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { matchesSearch } from "@/lib/galleryUtils";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useGalleryStore } from "@/store/galleryStore";
import { useUiStore } from "@/store/uiStore";

export function SearchDialog() {
  const open = useUiStore((state) => state.searchOpen);
  const setOpen = useUiStore((state) => state.setSearchOpen);
  const selectImage = useGalleryStore((state) => state.selectImage);
  const setSearchQuery = useGalleryStore((state) => state.setSearchQuery);
  const router = useRouter();
  const reduced = useReducedMotion();
  const [query, setQuery] = useState("");
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setQuery("");
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const results = useMemo(
    () => GALLERY_IMAGES.filter((image) => matchesSearch(image, query)).slice(0, 8),
    [query],
  );

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh]">
          <motion.button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search gallery"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            <label className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted" aria-hidden="true" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    setSearchQuery(query);
                    setOpen(false);
                    router.push(
                      query
                        ? `/explore?q=${encodeURIComponent(query)}`
                        : "/explore",
                    );
                  }
                }}
                placeholder="Search titles, tags, artists"
                className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </label>
            <ul className="max-h-[50vh] overflow-y-auto p-2">
              {results.map((image) => (
                <li key={image.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      selectImage(
                        image.id,
                        results.map((item) => item.id),
                      );
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl px-2 py-2 text-left hover:bg-foreground/5"
                  >
                    <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                      <SafeImage
                        src={image.imageUrl}
                        alt=""
                        width={96}
                        height={96}
                        className="h-12 w-12 object-cover"
                      />
                    </div>
                    <span>
                      <span className="block text-sm text-foreground">
                        {image.title}
                      </span>
                      <span className="block text-xs text-muted">
                        {image.author} · {image.category}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {query && results.length === 0 ? (
                <li className="px-3 py-8 text-center text-sm text-muted">
                  No visuals found
                </li>
              ) : null}
            </ul>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
