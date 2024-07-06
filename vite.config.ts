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
    proxy: {
      // Differentiate Dev and Prod versions in the plugin picker!
      "/penpot/icon.png": {
        target: "http://localhost:4400/",
        rewrite: (str) => str.replace("icon", "icon_dev"),
      },
    },
  },
  base: "/penpot/"
});
