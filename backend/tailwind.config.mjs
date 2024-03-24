/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "src/**/*.pug",
    "src/**/*.twig",
    "themes/**/*.twig",
    "themes/**/*.{js,ts,jsx,tsx}",
    "themes/green-ponpes/index.html",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
}
