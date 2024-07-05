import { defineConfig } from "vite";
import pluginSolid from "vite-plugin-solid";

export default defineConfig({
  plugins: [pluginSolid()],
  build: {
    rollupOptions: {
      input: {
        plugin: "src/plugin.ts",
        index: "./index.html",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
  preview: {
    port: 4400,
  },
});
