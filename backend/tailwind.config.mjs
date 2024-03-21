/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "src/**/*.pug",
    "src/**/*.twig",
    ,
    "themes/**/*.twig",
    "node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("preline/plugin")]
};
