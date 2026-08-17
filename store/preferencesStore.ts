import { create } from "zustand";
import {
  DEFAULT_LAYOUT,
  DEFAULT_SORT,
  RECENTLY_VIEWED_LIMIT,
  STORAGE_KEYS,
} from "@/data/constants";
import { getItem, setItem } from "@/lib/storage";
import type { GalleryLayout, SortOption, ThemeMode } from "@/types/gallery";

type Preferences = {
  theme: ThemeMode;
  layout: GalleryLayout;
  sortBy: SortOption;
  reducedMotion: boolean;
  recentlyViewedIds: string[];
};

type PreferencesState = Preferences & {
  hydrated: boolean;
  hydrate: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setLayout: (layout: GalleryLayout) => void;
  setSortBy: (sortBy: SortOption) => void;
  setReducedMotion: (value: boolean) => void;
  addRecentlyViewed: (id: string) => void;
  clearRecentlyViewed: () => void;
};

const DEFAULT_PREFERENCES: Preferences = {
  theme: "dark",
  layout: DEFAULT_LAYOUT,
  sortBy: DEFAULT_SORT,
  reducedMotion: false,
  recentlyViewedIds: [],
};

function persist(state: PreferencesState): void {
  const payload: Preferences = {
    theme: state.theme,
    layout: state.layout,
    sortBy: state.sortBy,
    reducedMotion: state.reducedMotion,
    recentlyViewedIds: state.recentlyViewedIds,
  };
  setItem(STORAGE_KEYS.preferences, payload);
}

function applyTheme(theme: ThemeMode): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}

export const usePreferencesStore = create<PreferencesState>((set, get) => ({
  ...DEFAULT_PREFERENCES,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    const stored = getItem<Partial<Preferences>>(STORAGE_KEYS.preferences, {});
    const next: Preferences = {
      theme: stored.theme === "light" ? "light" : "dark",
      layout:
        stored.layout === "grid" || stored.layout === "compact"
          ? stored.layout
          : DEFAULT_LAYOUT,
      sortBy: stored.sortBy ?? DEFAULT_SORT,
      reducedMotion: Boolean(stored.reducedMotion),
      recentlyViewedIds: Array.isArray(stored.recentlyViewedIds)
        ? stored.recentlyViewedIds.slice(0, RECENTLY_VIEWED_LIMIT)
        : [],
    };
    applyTheme(next.theme);
    set({ ...next, hydrated: true });
  },
  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
    persist(get());
  },
  toggleTheme: () => {
    const theme = get().theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    set({ theme });
    persist(get());
  },
  setLayout: (layout) => {
    set({ layout });
    persist(get());
  },
  setSortBy: (sortBy) => {
    set({ sortBy });
    persist(get());
  },
  setReducedMotion: (reducedMotion) => {
    set({ reducedMotion });
    persist(get());
  },
  addRecentlyViewed: (id) => {
    const recentlyViewedIds = [
      id,
      ...get().recentlyViewedIds.filter((item) => item !== id),
    ].slice(0, RECENTLY_VIEWED_LIMIT);
    set({ recentlyViewedIds });
    persist(get());
  },
  clearRecentlyViewed: () => {
    set({ recentlyViewedIds: [] });
    persist(get());
  },
}));
