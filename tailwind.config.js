/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        richblack: {
          100: '#050714',
        },
      },
    },
  },
  plugins: []
};