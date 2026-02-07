/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo-600
          dark: '#4338CA', // Indigo-700
          light: '#6366F1', // Indigo-500
        },
        accent: '#10B981', // Emerald-500
        neutral: {
          light: '#F9FAFB', // Gray-50
          dark: '#1F2937', // Gray-900
        },
      }
    },
  },
  plugins: [],
}