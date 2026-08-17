"use client";

import { useEffect } from "react";
import { FilterDrawer } from "@/components/gallery/FilterDrawer";
import { ImageLightbox } from "@/components/image/ImageLightbox";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { SettingsPanel } from "@/components/layout/SettingsPanel";
import { BackToTop } from "@/components/ui/BackToTop";
import { Toasts } from "@/components/ui/Toast";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useGalleryStore } from "@/store/galleryStore";
import { usePreferencesStore } from "@/store/preferencesStore";

export function AppProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    usePreferencesStore.getState().hydrate();
    useFavoritesStore.getState().hydrate();
    useGalleryStore.getState().hydrateFromPreferences();
  }, []);

  return (
    <>
      {children}
      <MobileMenu />
      <SearchDialog />
      <SettingsPanel />
      <FilterDrawer />
      <ImageLightbox />
      <Toasts />
      <BackToTop />
    </>
  );
}
