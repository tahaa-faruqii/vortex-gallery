import { notFound } from "next/navigation";
import { CategoryGalleryPage } from "@/components/gallery/CategoryGalleryPage";
import { CATEGORIES } from "@/data/categories";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category: category.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const exists = CATEGORIES.some((item) => item.slug === category);
  if (!exists) notFound();
  return <CategoryGalleryPage slug={category} />;
}
