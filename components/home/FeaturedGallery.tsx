"use client";

import { SafeImage } from "@/components/image/SafeImage";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { getFeaturedImages } from "@/lib/galleryUtils";
import { useGalleryStore } from "@/store/galleryStore";

export function FeaturedGallery() {
  const featured = getFeaturedImages(GALLERY_IMAGES);
  const hero = featured[0];
  const supporting = featured.slice(1, 5);
  const selectImage = useGalleryStore((state) => state.selectImage);
  const queue = featured.map((image) => image.id);

  if (!hero) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Header
        eyebrow="Featured"
        title="Curated for the week"
        description="A small selection of images chosen for atmosphere, craft, and quiet intensity."
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <button
          type="button"
          onClick={() => selectImage(hero.id, queue)}
          className="group relative overflow-hidden rounded-[1.75rem] border border-border text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <SafeImage
            src={hero.imageUrl}
            alt={hero.title}
            width={hero.width}
            height={hero.height}
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="aspect-[16/11] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 text-white">
            <p className="font-serif text-3xl">{hero.title}</p>
            <p className="text-sm opacity-80">{hero.author}</p>
          </div>
        </button>
        <div className="grid grid-cols-2 gap-4">
          {supporting.map((image) => (
            <button
              key={image.id}
              type="button"
              onClick={() => selectImage(image.id, queue)}
              className="group relative overflow-hidden rounded-3xl border border-border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <SafeImage
                src={image.imageUrl}
                alt={image.title}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1024px) 50vw, 21vw"
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 transition group-hover:opacity-100" />
              <span className="absolute bottom-3 left-3 text-left text-xs text-white">
                {image.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Header({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
      <h2 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
