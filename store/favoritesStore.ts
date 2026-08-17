import { create } from "zustand";
import { STORAGE_KEYS } from "@/data/constants";
import { getItem, setItem } from "@/lib/storage";
import { useUiStore } from "@/store/uiStore";

type FavoritesState = {
  favoriteIds: string[];
  hydrated: boolean;
  hydrate: () => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
};

function persist(ids: string[]): void {
  setItem(STORAGE_KEYS.favorites, ids);
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    const favoriteIds = getItem<string[]>(STORAGE_KEYS.favorites, []);
    set({
      favoriteIds: Array.isArray(favoriteIds) ? favoriteIds : [],
      hydrated: true,
    });
  },
  isFavorite: (id) => get().favoriteIds.includes(id),
  toggleFavorite: (id) => {
    const exists = get().favoriteIds.includes(id);
    const favoriteIds = exists
      ? get().favoriteIds.filter((item) => item !== id)
      : [id, ...get().favoriteIds];
    persist(favoriteIds);
    set({ favoriteIds });
    useUiStore
      .getState()
      .addToast(exists ? "Removed from favorites" : "Added to favorites");
  },
  removeFavorite: (id) => {
    const favoriteIds = get().favoriteIds.filter((item) => item !== id);
    persist(favoriteIds);
    set({ favoriteIds });
    useUiStore.getState().addToast("Removed from favorites");
  },
  clearFavorites: () => {
    persist([]);
    set({ favoriteIds: [] });
    useUiStore.getState().addToast("Favorites cleared");
  },
}));
