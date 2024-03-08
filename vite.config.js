import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import path from "path"
import { resolve } from "path"

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
  ollupOptions: {
    input: {
      option: resolve("./src/cp/option-pages.option.html"),
    },
  },
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve("./src/"),
      buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
    },
  },
  define: {
    global: {},
  },
})
