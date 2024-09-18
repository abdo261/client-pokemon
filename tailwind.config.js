/** @type {import('tailwindcss').Config} */
const {nextui} = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryTh: "#021526", // Add the custom primary color
      },
      backgroundColor:{
        primaryTh: "#021526",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Adds Roboto as the primary sans-serif font
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}