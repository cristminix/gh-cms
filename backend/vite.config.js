import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import twig from "./themes/custom/cms-twig-loader"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import path from "path"
import { resolve } from "path"

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  ollupOptions: {
    input: {
      main: resolve("./themes/green-ponpes/index.html"),
    },
  },
  plugins: [react(), nodePolyfills(), twig()],
  resolve: {
    alias: {
      "@": path.resolve("./themes/green-ponpes/js/"),
      "@components": path.resolve("./themes/green-ponpes/js/components/"),
      "@public": path.resolve("./public/"),
      "@templates": path.resolve("./themes/green-ponpes/templates/"),
      "@default_templates": path.resolve("./themes/default/templates/"),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  define: {
    global: {},
  },
})
