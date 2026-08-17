"use client";

import Link from "next/link";
import { Header } from "@/components/home/FeaturedGallery";
import { SafeImage } from "@/components/image/SafeImage";
import { CATEGORIES } from "@/data/categories";
import { GALLERY_IMAGES } from "@/data/galleryData";

export function CategoryShowcase() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Header
        eyebrow="Collections"
        title="Popular categories"
        description="Move through the archive by mood, subject, and place."
      />
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
        {CATEGORIES.map((category) => {
          const count = GALLERY_IMAGES.filter(
            (image) => image.category === category.slug,
          ).length;
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-border"
            >
              <SafeImage
                src={category.coverImage}
                alt={category.name}
                width={800}
                height={1000}
                sizes="(max-width: 768px) 50vw, 20vw"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="font-serif text-xl">{category.name}</p>
                <p className="text-xs opacity-80">{count} visuals</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
