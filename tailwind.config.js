/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        'content' : 'calc(100% - 112px)'
      },
    },
  },
  plugins: [],
}

