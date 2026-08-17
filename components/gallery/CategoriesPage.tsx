"use client";

import Link from "next/link";
import { SafeImage } from "@/components/image/SafeImage";
import { CATEGORIES } from "@/data/categories";
import { GALLERY_IMAGES } from "@/data/galleryData";

export function CategoriesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">Index</p>
      <h1 className="mt-3 font-serif text-5xl sm:text-6xl">
        Explore Categories
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
        Ten rooms in the archive. Each one is a different way of looking.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((category) => {
          const count = GALLERY_IMAGES.filter(
            (image) => image.category === category.slug,
          ).length;
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border"
            >
              <SafeImage
                src={category.coverImage}
                alt={category.name}
                width={1200}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h2 className="font-serif text-3xl">{category.name}</h2>
                <p className="mt-1 text-sm text-white/80">
                  {category.description}
                </p>
                <p className="mt-2 text-xs tracking-[0.16em] uppercase opacity-80">
                  {count} visuals
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
