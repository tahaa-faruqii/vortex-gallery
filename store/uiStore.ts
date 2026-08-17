import { create } from "zustand";
import type { ToastMessage } from "@/types/gallery";

type UiState = {
  mobileMenuOpen: boolean;
  filterDrawerOpen: boolean;
  searchOpen: boolean;
  settingsOpen: boolean;
  toasts: ToastMessage[];
  setMobileMenuOpen: (open: boolean) => void;
  setFilterDrawerOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setSettingsOpen: (open: boolean) => void;
  addToast: (message: string, tone?: ToastMessage["tone"]) => void;
  dismissToast: (id: string) => void;
};

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  filterDrawerOpen: false,
  searchOpen: false,
  settingsOpen: false,
  toasts: [],
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  setFilterDrawerOpen: (open) => set({ filterDrawerOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setSettingsOpen: (open) => set({ settingsOpen: open }),
  addToast: (message, tone = "default") =>
    set((state) => ({
      toasts: [...state.toasts.slice(-4), { id: createId(), message, tone }],
    })),
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));
