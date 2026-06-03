/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Malgun Gothic", "Apple SD Gothic Neo", "Noto Sans KR", "sans-serif"],
      },
    },
  },
  plugins: [],
};
