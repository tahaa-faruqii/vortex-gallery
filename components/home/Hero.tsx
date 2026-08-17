"use client";

import { ArrowRight } from "lucide-react";
import { SafeImage } from "@/components/image/SafeImage";
import { Button } from "@/components/ui/Button";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { formatCount } from "@/lib/galleryUtils";
import { useFavoritesStore } from "@/store/favoritesStore";
import { useGalleryStore } from "@/store/galleryStore";

export function Hero() {
  const featured =
    GALLERY_IMAGES.find((image) => image.id === "northern-quiet") ??
    GALLERY_IMAGES[0];
  const selectImage = useGalleryStore((state) => state.selectImage);
  const favoriteCount = useFavoritesStore((state) => state.favoriteIds.length);
  const totalLikes = GALLERY_IMAGES.reduce((sum, image) => sum + image.likes, 0);

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        <div>
          <p className="text-xs tracking-[0.22em] text-accent uppercase">
            Visual discovery
          </p>
          <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.95] text-foreground sm:text-6xl lg:text-7xl">
            Explore Visual Stories
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">
            Discover curated photography, artwork, landscapes and creative
            visuals. A quieter way to find images that stay with you.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/explore">
              Explore Gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href="/favorites" variant="outline">
              View Favorites
            </Button>
          </div>
          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
            <Stat label="Visuals" value={formatCount(GALLERY_IMAGES.length)} />
            <Stat label="Likes" value={formatCount(totalLikes)} />
            <Stat
              label="Saved"
              value={formatCount(favoriteCount)}
            />
          </dl>
        </div>

        <button
          type="button"
          onClick={() =>
            selectImage(
              featured.id,
              GALLERY_IMAGES.filter((image) => image.featured).map(
                (image) => image.id,
              ),
            )
          }
          className="group relative overflow-hidden rounded-[2rem] border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          aria-label={`Open featured image ${featured.title}`}
        >
          <SafeImage
            src={featured.imageUrl}
            alt={featured.title}
            width={featured.width}
            height={featured.height}
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 text-left text-white">
            <p className="text-xs tracking-[0.16em] uppercase opacity-80">
              Featured
            </p>
            <p className="mt-1 font-serif text-3xl">{featured.title}</p>
            <p className="text-sm opacity-80">{featured.author}</p>
          </div>
        </button>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs tracking-[0.16em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-serif text-2xl text-foreground">{value}</dd>
    </div>
  );
}
