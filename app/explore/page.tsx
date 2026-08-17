import { Suspense } from "react";
import { ExplorePage } from "@/components/gallery/ExplorePage";
import { ImageSkeleton } from "@/components/gallery/ImageSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore",
  description: "Search, filter, and rearrange the Vortex visual archive.",
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-16 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ImageSkeleton key={index} />
          ))}
        </div>
      }
    >
      <ExplorePage />
    </Suspense>
  );
}
