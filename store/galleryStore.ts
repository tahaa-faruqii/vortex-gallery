import { create } from "zustand";
import { DEFAULT_ADVANCED_FILTERS, DEFAULT_CATEGORY } from "@/data/constants";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { usePreferencesStore } from "@/store/preferencesStore";
import type {
  AdvancedFilters,
  GalleryImage,
  GalleryLayout,
  SortOption,
} from "@/types/gallery";

type GalleryState = {
  images: GalleryImage[];
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortOption;
  layout: GalleryLayout;
  selectedImageId: string | null;
  lightboxQueue: string[];
  advancedFilters: AdvancedFilters;
  loading: boolean;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setSortBy: (sort: SortOption) => void;
  setLayout: (layout: GalleryLayout) => void;
  setAdvancedFilters: (filters: AdvancedFilters) => void;
  resetFilters: () => void;
  selectImage: (id: string | null, queue?: string[]) => void;
  showNextImage: () => void;
  showPreviousImage: () => void;
  hydrateFromPreferences: () => void;
};

export const useGalleryStore = create<GalleryState>((set, get) => ({
  images: GALLERY_IMAGES,
  searchQuery: "",
  selectedCategory: DEFAULT_CATEGORY,
  sortBy: usePreferencesStore.getState().sortBy,
  layout: usePreferencesStore.getState().layout,
  selectedImageId: null,
  lightboxQueue: [],
  advancedFilters: DEFAULT_ADVANCED_FILTERS,
  loading: false,
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setCategory: (selectedCategory) =>
    set({
      selectedCategory,
      advancedFilters: {
        ...get().advancedFilters,
        categories: [],
      },
    }),
  setSortBy: (sortBy) => {
    set({ sortBy });
    usePreferencesStore.getState().setSortBy(sortBy);
  },
  setLayout: (layout) => {
    set({ layout });
    usePreferencesStore.getState().setLayout(layout);
  },
  setAdvancedFilters: (advancedFilters) => {
    const selectedCategory =
      advancedFilters.categories.length === 1
        ? advancedFilters.categories[0]
        : advancedFilters.categories.length > 1
          ? "all"
          : get().selectedCategory;
    set({ advancedFilters, selectedCategory });
  },
  resetFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: DEFAULT_CATEGORY,
      advancedFilters: DEFAULT_ADVANCED_FILTERS,
    }),
  selectImage: (id, queue) => {
    set({
      selectedImageId: id,
      lightboxQueue: queue ?? get().lightboxQueue,
    });
    if (id) {
      usePreferencesStore.getState().addRecentlyViewed(id);
    }
  },
  showNextImage: () => {
    const { selectedImageId, lightboxQueue } = get();
    if (!selectedImageId || lightboxQueue.length === 0) return;
    const index = lightboxQueue.indexOf(selectedImageId);
    const next = lightboxQueue[(index + 1) % lightboxQueue.length];
    get().selectImage(next, lightboxQueue);
  },
  showPreviousImage: () => {
    const { selectedImageId, lightboxQueue } = get();
    if (!selectedImageId || lightboxQueue.length === 0) return;
    const index = lightboxQueue.indexOf(selectedImageId);
    const previous =
      lightboxQueue[(index - 1 + lightboxQueue.length) % lightboxQueue.length];
    get().selectImage(previous, lightboxQueue);
  },
  hydrateFromPreferences: () => {
    const { layout, sortBy } = usePreferencesStore.getState();
    set({ layout, sortBy });
  },
}));
