/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- THIS TELLS TAILWIND TO SCAN YOUR JSX FILES
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        amber: {
          500: '#f59e0b',
        }
      }
    },
  },
  plugins: [],
}