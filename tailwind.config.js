/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./preview/index.html",
    "./cp/index.html",
    "themes/**/*.twig",
    //apply for twig compiled files only
    // ".compiled-twig/**/*.twig",

    ".compiled-twig-cache/**/*.twig",
    "themes/**/*.{js,jsx}",
    "cp/**/*.{js,jsx}",
    "themes/green-ponpes/index.html",
    "node_modules/preline/dist/*.js",
  ],
  darkMode: "selector",

  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("preline/plugin")],
}
