import type { GalleryImage } from "@/types/gallery";

function filenameFromTitle(title: string): string {
  const safe = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${safe || "vortex-image"}.jpg`;
}

export async function downloadImage(image: GalleryImage): Promise<boolean> {
  try {
    const response = await fetch(image.imageUrl);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filenameFromTitle(image.title);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(objectUrl);
    return true;
  } catch {
    try {
      window.open(image.imageUrl, "_blank", "noopener,noreferrer");
      return true;
    } catch {
      return false;
    }
  }
}
