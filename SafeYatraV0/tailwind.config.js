/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "index.html",
    "src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: ['dark', 'dark:bg-gray-800', 'dark:text-white', 'dark:bg-gray-900', 'dark:bg-gray-700'],
}
