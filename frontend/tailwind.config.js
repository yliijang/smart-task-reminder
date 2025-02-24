/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(to right, var(--tw-gradient-stops))',
        'gradient-2': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
        'gradient-3': 'linear-gradient(to bottom, var(--tw-gradient-stops))',
        'gradient-4': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-5': 'conic-gradient(from 45deg, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 