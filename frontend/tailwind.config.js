/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    'node_modules/flowbite-react/lib/esm/**/*.js'],

  theme: {
    extend: {
      colors:{
        'prime': '#1A5D1A',
        'second':'#FCE09B',
        'third':'#B5CB99',
        'fourth':'#B2533E',
       }
    },
    
  },
  plugins: [require('flowbite/plugin')],
}

