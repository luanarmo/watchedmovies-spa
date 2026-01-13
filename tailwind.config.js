/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        'dusty-grape': {
          50: '#f0eef7',
          100: '#e0dcef',
          200: '#c2bade',
          300: '#a397ce',
          400: '#8474be',
          500: '#6552ad',
          600: '#51418b',
          700: '#3d3168',
          800: '#292145',
          900: '#141023',
          950: '#0e0b18',
        }
      }
    },
  },
  plugins: [],
}

