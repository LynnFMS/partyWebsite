/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Vite entry file
    "./src/**/*.{js,ts,jsx,tsx}",  // React components
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

