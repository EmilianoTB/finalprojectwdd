import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        beachesmexico: resolve(__dirname, "src/pages/beachesmexico.html"),
        pueblosmagicos: resolve(__dirname, "src/pages/pueblosmagicos.html"),
        product_listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
