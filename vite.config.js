import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import twig from "./themes/custom/cms-twig-loader"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import path from "path"
import { resolve } from "path"
import appConfig from "./config/app.json"
console.log(appConfig)
export default defineConfig({
  server: {
    host: appConfig.bindHost,
    port: appConfig.vitePort,
    watch: {
      usePolling: true,
    },
  },
  rollupOptions: {
    input: {
      // main: resolve("./themes/green-ponpes/index.html"),
      preview: resolve("./preview/index.html"),
      cp: resolve("./cp/index.html"),
    },
  },
  plugins: [react(), nodePolyfills(), twig()],
  resolve: {
    alias: {
      "@cp": path.resolve("./cp/"),
      "@lib": path.resolve("./lib/"),
      "@themes": path.resolve("./themes/"),
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
