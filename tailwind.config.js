/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"], // Added ts just in case
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Space Mono"', "monospace"],
      },
    },
  },
  plugins: [],
};
