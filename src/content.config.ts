import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// Editorial template: one Markdown file per story (maps 1:1 to a Webflow CMS collection).
const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    dek: z.string(),
    kicker: z.string(),
    cover: z.number(),
    inline: z.array(z.number()).default([]),
    stay: z.string(),
    minutes: z.number(),
    date: z.string(),
  }),
});

export const collections = { journal };
