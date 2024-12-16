/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6fcf97",
        secondary: "#d7d8df",
        primaryText: "#293154",
        border: "#ccced1",
        inputPrimary: "#949494",
        inputSecondary: "#bfc1c3"
      }
    },
  },
  plugins: [],
}

