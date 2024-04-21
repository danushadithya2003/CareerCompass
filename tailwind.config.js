/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'txt-white': '#fdfdfd',
        'cst-pink':'#FB4BF5',
        'cst-orange':'#FF8967',
        'cst-blue': '#63B3ED',
        'cst-green':'#68D391',
        'bg-blue':'#1A202C',
      }
    },
  },
  plugins: [],
}