/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-900": "#1A1A1A",
        "dark-800": "#242424",
        "dark-700": "#2F2F2F",
      },
    },
  },
  plugins: [],
};
