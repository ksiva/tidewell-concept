import type { ImageMetadata } from "astro";

const all = import.meta.glob<{ default: ImageMetadata }>("../assets/photos/*.jpg", { eager: true });

/** What each photo shows, for alt text (written from the photos, 27-11-2026). */
export const alt: Record<number, string> = {
  24: "A whitewashed arch framing a small chapel and a sunny terrace",
  7: "A white barrel-roofed Cycladic house on a paved terrace",
  17: "Whitewashed steps and walls under a blue sky, the sea beyond",
  54: "A guest reading a magazine in a white bed",
  66: "Breakfast on a balcony ledge above a calm sea at dawn",
  38: "A rooftop terrace with white umbrellas above turquoise water",
  13: "A tall pale villa behind palm trees",
  58: "A double bed with lamps in a room with dark green walls",
  74: "Pancakes with jam on a plate, the sea at sunset behind",
  3: "Small boats in a harbour below a hillside village",
  0: "A white terrace with chairs and plants above a deep-blue bay",
  18: "A narrow whitewashed lane with café tables and flowers",
  72: "A woman in a bathrobe on a balcony above the caldera",
  60: "A simple white bedroom with a brass bed and framed prints",
  1: "A courtyard café with palm trees and chairs in the sun",
  93: "A stone arch opening onto a courtyard with a fountain",
  95: "A shaded lane of white houses under a vine",
  94: "A garden walk beside a white house and a pool",
  71: "A breakfast table with roses on a balcony over the town",
  84: "Terracotta roofs of an old town above a wide bay",
  44: "A whitewashed villa with a pool and potted lemon trees",
  46: "Wicker sofas under white curtains beside a pool",
  42: "An infinity pool on a cliff above the open sea",
  64: "A bedroom with deep green walls and a chandelier",
  70: "A white balcony with a table, looking out to sea",
  12: "A pink hotel façade among palms in evening light",
  28: "A hillside village lit up at dusk above the sea",
  43: "A covered terrace with sun loungers above a pool and the coast",
  76: "Two people in deckchairs looking over red roofs to the sea",
  39: "A colourful seaside town at the foot of green mountains",
  25: "White terraces with sun loungers and grey parasols",
  26: "Cave houses stepped down a cliff above the sea",
  19: "Agave leaves in front of a terrace and the sea",
  77: "A woman in a bathrobe drinking coffee on a sea-view terrace",
  15: "A white hilltop village above a blue bay",
  11: "A stepped terracotta terrace seen from above, the sea below",
  5: "Wooden loungers on a deck under a vine-covered pergola",
  4: "Two wicker chairs on a terrace facing a rocky islet",
  86: "An ochre villa on a hill above a bay",
};

/** Photo by its contact-sheet number (Unsplash License; sources in credits.json). */
export function photo(n: number): ImageMetadata {
  const key = `../assets/photos/t-${String(n).padStart(2, "0")}.jpg`;
  const hit = all[key];
  if (!hit) throw new Error(`missing photo ${key}`);
  return hit.default;
}
