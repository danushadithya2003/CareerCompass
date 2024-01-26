/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'primary':'#3498DB',
      'secondary':'#2ECC71',
      'primary-bg': '#ECF0F1',
      'primary-txt':'#34495E',
      'accent': '#F39C12',
    },
    extend: {
      fontFamily: {
        poppins: ["Poppins", 'sans-serif']
      }
    },
  },
  plugins: [],
}

