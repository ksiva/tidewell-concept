import { defineConfig } from "astro/config";

// Spec / concept site. Hosted on GitHub Pages under /tidewell-concept/.
export default defineConfig({
  site: "https://ksiva.github.io",
  base: "/tidewell-concept",
  trailingSlash: "always",
  image: { responsiveStyles: true },
});
