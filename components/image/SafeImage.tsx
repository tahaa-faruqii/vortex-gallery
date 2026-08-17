"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

type SafeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
};

export function SafeImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  priority = false,
  fill = false,
}: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-foreground/5 text-muted",
          className,
        )}
        role="img"
        aria-label={`${alt} failed to load`}
      >
        <ImageOff className="h-6 w-6" aria-hidden="true" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={cn(
        fill && "object-cover",
        "transition-opacity duration-500",
        loaded ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
