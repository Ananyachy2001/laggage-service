/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    darkMode: 'class',
    colors: {
      'custom-gray': '#f5f5f5',
      'custom-blue': '#3b82f6',
    },
  },
  plugins: [require('flowbite/plugin')],
};
