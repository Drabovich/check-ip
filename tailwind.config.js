/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-grey': '#F2F0F0',
      },
      fontFamily: {
        geologica: ['Geologica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

