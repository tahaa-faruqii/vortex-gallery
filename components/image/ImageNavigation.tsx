"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ImageNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
};

export function ImageNavigation({ onPrevious, onNext }: ImageNavigationProps) {
  return (
    <>
      <button
        type="button"
        onClick={onPrevious}
        className="absolute top-1/2 left-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={onNext}
        className="absolute top-1/2 right-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:flex"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </>
  );
}
