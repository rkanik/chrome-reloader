import vue from "@vitejs/plugin-vue";

import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [vue()],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@@": fileURLToPath(new URL("../common/../../src", import.meta.url)),
    },
  },
  build: {
    outDir: "../../build/popup",
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: "[name].js",
      },
    },
  },
});
