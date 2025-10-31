/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'eon-light': '#2cdbd8',
        'eon-dark': '#29c2c8',
        'eon-navy': '#253a7a'
      }
    },
  },
  plugins: [],
});
