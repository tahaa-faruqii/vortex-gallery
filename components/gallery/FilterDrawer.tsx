"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { CATEGORIES } from "@/data/categories";
import { DEFAULT_ADVANCED_FILTERS } from "@/data/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useGalleryStore } from "@/store/galleryStore";
import { useUiStore } from "@/store/uiStore";
import type { AdvancedFilters, DateFilter, Orientation, PopularityFilter } from "@/types/gallery";

export function FilterDrawer() {
  const open = useUiStore((state) => state.filterDrawerOpen);
  const setOpen = useUiStore((state) => state.setFilterDrawerOpen);
  const addToast = useUiStore((state) => state.addToast);
  const current = useGalleryStore((state) => state.advancedFilters);
  const selectedCategory = useGalleryStore((state) => state.selectedCategory);
  const setAdvancedFilters = useGalleryStore((state) => state.setAdvancedFilters);
  const resetFilters = useGalleryStore((state) => state.resetFilters);
  const reduced = useReducedMotion();
  const [draft, setDraft] = useState<AdvancedFilters>(current);
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setDraft({
        ...current,
        categories:
          current.categories.length > 0
            ? current.categories
            : selectedCategory !== "all"
              ? [selectedCategory]
              : [],
      });
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const toggleCategory = (slug: string) => {
    setDraft((prev) => ({
      ...prev,
      categories: prev.categories.includes(slug)
        ? prev.categories.filter((item) => item !== slug)
        : [...prev.categories, slug],
    }));
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="filter-title"
            initial={
              reduced
                ? { opacity: 0 }
                : { opacity: 0, y: 40, x: 0 }
            }
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 32 }}
            className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-3xl border border-border bg-background p-6 shadow-2xl md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[420px] md:rounded-none md:rounded-l-3xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="filter-title" className="font-serif text-3xl">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
                aria-label="Close filters"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <section className="space-y-3">
              <h3 className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                Category
              </h3>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((category) => {
                  const active = draft.categories.includes(category.slug);
                  return (
                    <button
                      key={category.slug}
                      type="button"
                      onClick={() => toggleCategory(category.slug)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-sm",
                        active
                          ? "border-foreground bg-foreground text-background"
                          : "border-border text-muted hover:text-foreground",
                      )}
                    >
                      {category.name}
                    </button>
                  );
                })}
              </div>
            </section>

            <ChipGroup
              title="Orientation"
              value={draft.orientation}
              options={[
                { value: "landscape", label: "Landscape" },
                { value: "portrait", label: "Portrait" },
                { value: "square", label: "Square" },
              ]}
              onChange={(orientation) =>
                setDraft((prev) => ({
                  ...prev,
                  orientation: orientation as Orientation | null,
                }))
              }
            />

            <ChipGroup
              title="Popularity"
              value={draft.popularity}
              allowEmpty={false}
              options={[
                { value: "all", label: "All" },
                { value: "popular", label: "Popular" },
                { value: "trending", label: "Trending" },
              ]}
              onChange={(popularity) =>
                setDraft((prev) => ({
                  ...prev,
                  popularity: (popularity ?? "all") as PopularityFilter,
                }))
              }
            />

            <ChipGroup
              title="Date"
              value={draft.date}
              options={[
                { value: "newest", label: "Newest" },
                { value: "month", label: "This Month" },
                { value: "older", label: "Older" },
              ]}
              onChange={(date) =>
                setDraft((prev) => ({
                  ...prev,
                  date: date as DateFilter | null,
                }))
              }
            />

            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setDraft(DEFAULT_ADVANCED_FILTERS);
                  resetFilters();
                  addToast("Filters reset");
                  setOpen(false);
                }}
              >
                Reset Filters
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  setAdvancedFilters(draft);
                  addToast("Filters applied");
                  setOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function ChipGroup<T extends string>({
  title,
  value,
  options,
  onChange,
  allowEmpty = true,
}: {
  title: string;
  value: T | null;
  options: { value: T; label: string }[];
  onChange: (value: T | null) => void;
  allowEmpty?: boolean;
}) {
  return (
    <section className="mt-7 space-y-3">
      <h3 className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() =>
                onChange(active && allowEmpty ? null : option.value)
              }
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
