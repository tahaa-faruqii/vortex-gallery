import { CategoriesPage } from "@/components/gallery/CategoriesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse Vortex Gallery by visual category.",
};

export default function Page() {
  return <CategoriesPage />;
}
