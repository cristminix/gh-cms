/** @type {import('tailwindcss').Config} */
export default {
  content: [
   "./index.html", 
   "./cp/index.html",
    "themes/**/*.twig",
    "themes/**/*.{js,ts,jsx,tsx}",
    "cp/**/*.{js,ts,jsx,tsx}",
    "themes/green-ponpes/index.html",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("preline/plugin")],
}
