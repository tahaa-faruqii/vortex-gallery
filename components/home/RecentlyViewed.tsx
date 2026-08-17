"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { Header } from "@/components/home/FeaturedGallery";
import { EmptyState } from "@/components/ui/EmptyState";
import { useRecentlyViewedImages } from "@/lib/useFilteredImages";

export function RecentlyViewed() {
  const images = useRecentlyViewedImages();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Header
        eyebrow="History"
        title="Recently viewed"
        description="The last ten images you opened, kept locally on this device."
      />
      <div className="mt-8">
        {images.length === 0 ? (
          <EmptyState
            icon={<Clock className="h-6 w-6" aria-hidden="true" />}
            title="Nothing viewed yet"
            description="Open an image and it will appear here after you return."
            actionLabel="Explore Gallery"
            href="/explore"
          />
        ) : (
          <GalleryGrid images={images} layout="compact" />
        )}
      </div>
    </section>
  );
}

export function HomeCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
      <div className="rounded-[2rem] border border-border bg-surface/70 px-6 py-16 text-center">
        <p className="text-xs tracking-[0.2em] text-accent uppercase">
          Continue
        </p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
          The archive is larger than it looks
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted">
          Search by mood, wander by category, or save a private collection of
          images that feel like yours.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition hover:opacity-90"
        >
          Enter the gallery
        </Link>
      </div>
    </section>
  );
}
