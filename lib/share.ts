import { getShareUrl } from "@/lib/galleryUtils";
import type { GalleryImage } from "@/types/gallery";

export type ShareResult = "shared" | "copied" | "failed";

export async function shareImage(image: GalleryImage): Promise<ShareResult> {
  const url = getShareUrl(image);
  const payload = {
    title: image.title,
    text: `${image.title} by ${image.author} — Vortex Gallery`,
    url,
  };

  if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
    try {
      await navigator.share(payload);
      return "shared";
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return "failed";
      }
    }
  }

  try {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return "failed";
    }
    await navigator.clipboard.writeText(url);
    return "copied";
  } catch {
    return "failed";
  }
}

export async function copyText(value: string): Promise<boolean> {
  try {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return false;
    }
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    return false;
  }
}
