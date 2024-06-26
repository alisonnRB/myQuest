/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        error: "#E16868",
        right: "#6DB154",
        firstBg: "#162238",
        secondBg: "#343959",
        thirdBg: "#69709A",
        hovered: '#979FCC',
        emphasis: "#F8BB83",
        placeholderWhite: "#FFFFFFBF"
      }
    },
  },
  plugins: [],
}

