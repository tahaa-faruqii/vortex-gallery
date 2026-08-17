import type { Category } from "@/types/gallery";

export const CATEGORIES: Category[] = [
  {
    slug: "nature",
    name: "Nature",
    description: "Forests, mountains, and living landscapes.",
    coverImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "architecture",
    name: "Architecture",
    description: "Form, structure, and spatial poetry.",
    coverImage:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "abstract",
    name: "Abstract",
    description: "Color, texture, and visual rhythm.",
    coverImage:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "portrait",
    name: "Portrait",
    description: "Faces, presence, and quiet character.",
    coverImage:
      "https://images.unsplash.com/photo-1531746020798-e6953c6c4eac?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "travel",
    name: "Travel",
    description: "Places, journeys, and distant light.",
    coverImage:
      "https://images.unsplash.com/photo-1523906834658-6e24ef23b8d8?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "minimal",
    name: "Minimal",
    description: "Restraint, space, and essential form.",
    coverImage:
      "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "urban",
    name: "Urban",
    description: "Cities after dark and in motion.",
    coverImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "technology",
    name: "Technology",
    description: "Machines, circuits, and future textures.",
    coverImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "art",
    name: "Art",
    description: "Studios, pigment, and crafted objects.",
    coverImage:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "landscape",
    name: "Landscape",
    description: "Wide horizons and cinematic terrain.",
    coverImage:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80",
  },
];

export const CATEGORY_CHIPS = [
  { slug: "all", name: "All" },
  ...CATEGORIES.map(({ slug, name }) => ({ slug, name })),
];
