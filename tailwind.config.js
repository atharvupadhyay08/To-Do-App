/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 This tells Tailwind to scan all your React files
  ],
  theme: {
    extend: {}, // 👈 You can add custom colors, fonts, etc. later here
  },
  plugins: [],
};
