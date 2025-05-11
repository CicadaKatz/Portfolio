/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9', // sky-500
        secondary: '#1e293b', // slate-800
        dark: '#0f172a', // slate-900
      },
    },
  },
  plugins: [],
} 