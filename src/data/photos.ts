import type { ImageMetadata } from "astro";

const all = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.jpg", { eager: true });

/** Photo by its contact-sheet number (Unsplash License; sources in credits.json). */
export function photo(n: number): ImageMetadata {
  const key = `../assets/photos/t-${String(n).padStart(2, "0")}.jpg`;
  const hit = all[key];
  if (!hit) throw new Error(`missing photo ${key}`);
  return hit.default;
}
