import { FavoritesPage } from "@/components/gallery/FavoritesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your personally curated Vortex collection.",
};

export default function Page() {
  return <FavoritesPage />;
}
