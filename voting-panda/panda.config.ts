import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./app/**/*.{ts,tsx,js,jsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  globalCss: {
    body: {
      bg: "slate.900",
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
