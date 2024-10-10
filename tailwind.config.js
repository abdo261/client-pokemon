/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primaryTh: '#021526' // Add the custom primary color
      },
      backgroundColor: {
        primaryTh: '#021526'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'] // Adds Roboto as the primary sans-serif font
      },
      screens: {
        custemXsm: '300px', // Extra small screens, 360px and up
        custem2Xsm: '360px', // Small screens, 600px and up
        custemSm: '500px', // Medium screens, 900px and up
        custemMd: '870px', // Medium screens, 900px and up
        custemLg: '1024px', // Large screens, 1200px and up
        custemXl: '1321px', // Extra large screens, 1536px and up
        custem2xl: '1600px' // Custom large screen size at 1920px
      },
      boxShadow: {
        'soft-black': '0 0px 7px rgba(0, 0, 0, 1)'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}
