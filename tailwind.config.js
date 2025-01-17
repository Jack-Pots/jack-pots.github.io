/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        richblack: {
          100: 'black',
        },
        tran: {
          40:  'rgba(30, 30, 30, 0.2)',
        },
      },
    },
  },
  plugins: []
};