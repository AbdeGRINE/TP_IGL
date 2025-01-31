/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors : {
        green : "#46BB91",
        red : "#F85D5B",
        white : "#ffffff",
        lightgray : "#F7F7F7",
        gray : "#EEEFF1",
        darkgray : "#878787",
        black : "#111111",
      }
    },
  },
  plugins: [],
}