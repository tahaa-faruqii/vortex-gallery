"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { ImageDetails } from "@/components/image/ImageDetails";
import { ImageNavigation } from "@/components/image/ImageNavigation";
import { SafeImage } from "@/components/image/SafeImage";
import { GALLERY_IMAGES } from "@/data/galleryData";
import { useReducedMotion } from "@/lib/useFilteredImages";
import { useGalleryStore } from "@/store/galleryStore";

export function ImageLightbox() {
  const selectedImageId = useGalleryStore((state) => state.selectedImageId);
  const selectImage = useGalleryStore((state) => state.selectImage);
  const showNextImage = useGalleryStore((state) => state.showNextImage);
  const showPreviousImage = useGalleryStore((state) => state.showPreviousImage);
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const image = GALLERY_IMAGES.find((item) => item.id === selectedImageId);

  useEffect(() => {
    if (!selectedImageId) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") selectImage(null);
      if (event.key === "ArrowRight") showNextImage();
      if (event.key === "ArrowLeft") showPreviousImage();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedImageId, selectImage, showNextImage, showPreviousImage]);

  return (
    <AnimatePresence>
      {image ? (
        <motion.div
          className="fixed inset-0 z-[75] flex items-stretch bg-black/80 backdrop-blur-md"
          initial={reduced ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            className="relative flex h-full w-full flex-col lg:flex-row"
            onTouchStart={(event) => {
              touchStartX.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchStartX.current;
              const end = event.changedTouches[0]?.clientX;
              if (start == null || end == null) return;
              const delta = end - start;
              if (delta > 50) showPreviousImage();
              if (delta < -50) showNextImage();
            }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => selectImage(null)}
              className="absolute top-4 right-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative flex min-h-[48vh] flex-1 items-center justify-center bg-black lg:min-h-full">
              <SafeImage
                src={image.imageUrl}
                alt={image.title}
                width={image.width}
                height={image.height}
                sizes="(max-width: 1024px) 100vw, 70vw"
                priority
                className="max-h-[48vh] w-auto max-w-full object-contain lg:max-h-screen"
              />
              <ImageNavigation
                onPrevious={showPreviousImage}
                onNext={showNextImage}
              />
            </div>

            <aside className="max-h-[52vh] overflow-y-auto border-t border-border bg-background p-5 lg:max-h-none lg:w-[400px] lg:border-t-0 lg:border-l lg:p-8">
              <h2 id="lightbox-title" className="sr-only">
                {image.title}
              </h2>
              <ImageDetails image={image} />
            </aside>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
