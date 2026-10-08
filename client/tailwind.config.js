/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#173300',
        secondary: '#3D4F2F',
        tertiary: '#9FE970',
        quaternary: '#EFF3EA',
    

      },
    },
  },
  plugins: [],
};
