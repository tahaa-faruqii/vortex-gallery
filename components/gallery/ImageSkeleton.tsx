"use client";

import { cn } from "@/lib/cn";

type ImageSkeletonProps = {
  className?: string;
  aspect?: string;
};

export function ImageSkeleton({
  className,
  aspect = "4 / 5",
}: ImageSkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-foreground/6",
        className,
      )}
      style={{ aspectRatio: aspect }}
      aria-hidden="true"
    />
  );
}
