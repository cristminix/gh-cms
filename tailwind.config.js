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
  theme: {
    extend: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
    },
  },
  plugins: [require("preline/plugin")],
}
