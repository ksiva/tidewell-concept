// Fictional hotels for a concept site. Names, prices and details are invented;
// photos are licensed stock and do not show these places.
export type Hotel = {
  slug: string;
  name: string;
  place: string;
  country: string;
  region: "Cyclades" | "Amalfi Coast" | "Dalmatia" | "Mallorca";
  rooms: number;
  fromEUR: number;
  moods: string[];
  line: string;
  why: string[];
  facts: string[];
  cover: number;
  gallery: number[];
};

export const hotels: Hotel[] = [
  {
    slug: "lithos-house",
    name: "Lithos House",
    place: "Milos",
    country: "Greece",
    region: "Cyclades",
    rooms: 9,
    fromEUR: 240,
    moods: ["Sea view", "Quiet", "Adults only"],
    line: "Nine whitewashed rooms cut into the cliff above a fishing cove.",
    why: [
      "Every room opens onto its own terrace; you hear the water, not the road.",
      "Breakfast is whatever the owner's mother baked that morning.",
      "A ten-minute walk to a swimming ladder most visitors never find.",
    ],
    facts: ["Breakfast included", "Free cancellation to 14 days", "Open April to October", "Ferry from Piraeus, 3 h"],
    cover: 24,
    gallery: [24, 7, 17, 54, 66],
  },
  {
    slug: "casa-ombrella",
    name: "Casa Ombrella",
    place: "Atrani",
    country: "Italy",
    region: "Amalfi Coast",
    rooms: 12,
    fromEUR: 310,
    moods: ["Sea view", "Food", "Village"],
    line: "A lemon-yellow townhouse on the smallest piazza of the coast.",
    why: [
      "Five minutes on foot from Amalfi, a world away from its crowds.",
      "Rooftop dinners on Thursdays, cooked by the family's trattoria next door.",
      "Beach towels, umbrellas and a reserved spot below the arches.",
    ],
    facts: ["Breakfast included", "Free cancellation to 21 days", "Open March to November", "Naples airport, 1 h 30"],
    cover: 38,
    gallery: [38, 13, 58, 74, 3],
  },
  {
    slug: "aspro-terrace",
    name: "Aspro Terrace",
    place: "Sifnos",
    country: "Greece",
    region: "Cyclades",
    rooms: 7,
    fromEUR: 195,
    moods: ["Quiet", "Food", "Budget-friendly"],
    line: "Seven rooms, one long table, and the island's best sunset wall.",
    why: [
      "Sifnos is the food island of the Cyclades; the host runs cooking mornings.",
      "Rooms are simple and cool, with linen from a weaver in Apollonia.",
      "Bus stop at the door, so you won't need a car.",
    ],
    facts: ["Breakfast included", "Free cancellation to 7 days", "Open May to October", "Ferry from Piraeus, 2 h 40"],
    cover: 0,
    gallery: [0, 18, 72, 60, 1],
  },
  {
    slug: "dvor-smokva",
    name: "Dvor Smokva",
    place: "Vis",
    country: "Croatia",
    region: "Dalmatia",
    rooms: 6,
    fromEUR: 170,
    moods: ["Village", "Quiet", "Budget-friendly"],
    line: "A stone courtyard house under a hundred-year-old fig tree.",
    why: [
      "Vis was closed to visitors until 1989, and it still feels unhurried.",
      "Six rooms around a shaded courtyard where breakfast runs until noon.",
      "Bikes and a boat-day with a local skipper can be booked at check-in.",
    ],
    facts: ["Breakfast included", "Free cancellation to 14 days", "Open April to October", "Ferry from Split, 2 h 20"],
    cover: 93,
    gallery: [93, 95, 94, 71, 84],
  },
  {
    slug: "finca-llum",
    name: "Finca Llum",
    place: "Deià",
    country: "Spain",
    region: "Mallorca",
    rooms: 11,
    fromEUR: 260,
    moods: ["Pool", "Food", "Rural"],
    line: "An olive-farm house in the Tramuntana with a pool among the trees.",
    why: [
      "The olive oil on your table is pressed on the property every November.",
      "Eleven rooms spread across the old farm buildings, none overlooking another.",
      "The coast path to the cove starts at the bottom of the garden.",
    ],
    facts: ["Breakfast included", "Free cancellation to 14 days", "Open all year", "Palma airport, 45 min"],
    cover: 44,
    gallery: [44, 46, 42, 64, 70],
  },
  {
    slug: "albergo-pietrasole",
    name: "Albergo Pietrasole",
    place: "Positano",
    country: "Italy",
    region: "Amalfi Coast",
    rooms: 15,
    fromEUR: 380,
    moods: ["Sea view", "Pool", "Romance"],
    line: "Fifteen terraced rooms stepping down the cliff toward the bay.",
    why: [
      "Every room faces the sea; the higher you climb, the wider the view.",
      "A private boat runs guests to the beach club each morning at ten.",
      "The terrace bar is the best seat in Positano at golden hour.",
    ],
    facts: ["Breakfast included", "Free cancellation to 30 days", "Open April to October", "Naples airport, 1 h 45"],
    cover: 12,
    gallery: [12, 28, 43, 76, 39],
  },
  {
    slug: "kastro-seven",
    name: "Kastro Seven",
    place: "Folegandros",
    country: "Greece",
    region: "Cyclades",
    rooms: 7,
    fromEUR: 220,
    moods: ["Sea view", "Romance", "Adults only"],
    line: "Seven cave suites inside the walls of a medieval kastro.",
    why: [
      "Folegandros has no airport and no big hotels; that is the point.",
      "Suites keep their original vaulted ceilings and stone floors.",
      "Dinner in the village square is two minutes away, the cliff edge one.",
    ],
    facts: ["Breakfast included", "Free cancellation to 14 days", "Open May to September", "Ferry from Piraeus, 4 h"],
    cover: 25,
    gallery: [25, 26, 19, 77, 15],
  },
  {
    slug: "palazzina-mareluce",
    name: "Palazzina Mareluce",
    place: "Procida",
    country: "Italy",
    region: "Amalfi Coast",
    rooms: 10,
    fromEUR: 205,
    moods: ["Village", "Sea view", "Food"],
    line: "A pastel harbour palazzo on the island Naples keeps to itself.",
    why: [
      "Procida is the colourful, car-light island an hour from Naples.",
      "Ten rooms with balconies over the fishing boats of Corricella.",
      "Ask for the corner room: two balconies, two views.",
    ],
    facts: ["Breakfast included", "Free cancellation to 14 days", "Open March to November", "Ferry from Naples, 40 min"],
    cover: 11,
    gallery: [11, 5, 4, 71, 86],
  },
];

export const regions = ["Cyclades", "Amalfi Coast", "Dalmatia", "Mallorca"] as const;
export const moods = ["Sea view", "Quiet", "Food", "Village", "Pool", "Romance", "Adults only", "Rural", "Budget-friendly"];
export const bySlug = (s: string) => hotels.find((h) => h.slug === s)!;
