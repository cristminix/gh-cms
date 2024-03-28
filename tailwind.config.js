/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./preview/index.html",
    "./cp/index.html",
    "themes/**/*.twig",
    "themes/**/*.{js,jsx}",
    "cp/**/*.{js,jsx}",
    "themes/green-ponpes/index.html",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
}
