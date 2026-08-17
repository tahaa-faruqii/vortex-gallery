"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { LAYOUT_OPTIONS } from "@/data/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useGalleryStore } from "@/store/galleryStore";
import { usePreferencesStore } from "@/store/preferencesStore";
import { useUiStore } from "@/store/uiStore";

export function SettingsPanel() {
  const open = useUiStore((state) => state.settingsOpen);
  const setOpen = useUiStore((state) => state.setSettingsOpen);
  const addToast = useUiStore((state) => state.addToast);
  const theme = usePreferencesStore((state) => state.theme);
  const setTheme = usePreferencesStore((state) => state.setTheme);
  const layout = usePreferencesStore((state) => state.layout);
  const setLayoutPref = usePreferencesStore((state) => state.setLayout);
  const setGalleryLayout = useGalleryStore((state) => state.setLayout);
  const reducedMotion = usePreferencesStore((state) => state.reducedMotion);
  const setReducedMotion = usePreferencesStore((state) => state.setReducedMotion);
  const clearRecentlyViewed = usePreferencesStore(
    (state) => state.clearRecentlyViewed,
  );
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <motion.button
            type="button"
            aria-label="Close settings"
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="relative w-full max-w-md rounded-3xl border border-border bg-background p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 id="settings-title" className="font-serif text-3xl">
                Settings
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <section className="space-y-3">
              <h3 className="text-xs tracking-[0.18em] text-muted uppercase">
                Theme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {(["dark", "light"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTheme(mode)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-sm capitalize",
                      theme === mode
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted",
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6 space-y-3">
              <h3 className="text-xs tracking-[0.18em] text-muted uppercase">
                Default layout
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {LAYOUT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setLayoutPref(option.value);
                      setGalleryLayout(option.value);
                    }}
                    className={cn(
                      "rounded-2xl border px-3 py-3 text-sm",
                      layout === option.value
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted",
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </section>

            <label className="mt-6 flex items-center justify-between rounded-2xl border border-border px-4 py-3">
              <span className="text-sm">Reduced motion</span>
              <input
                type="checkbox"
                checked={reducedMotion}
                onChange={(event) => setReducedMotion(event.target.checked)}
                className="h-4 w-4 accent-accent"
              />
            </label>

            <div className="mt-6 flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  clearRecentlyViewed();
                  addToast("Recently viewed cleared");
                }}
              >
                Clear recently viewed
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  clearFavorites();
                }}
              >
                Clear favorites
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
