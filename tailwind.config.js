/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
   theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        youtubeRed: '#FF0000',
        textPrimary: '#030303',
        textSecondary: '#606060',
        textTertiary: '#909090',
      },
    },
  },
  plugins: [],
}

