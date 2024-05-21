/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        'custom': '1000px',
      },
      colors: {
        customBorder: '#D4DEFE',
      },
      borderRadius: {
        'custom': '50px',
      }
    },
  },
  plugins: [],
}
