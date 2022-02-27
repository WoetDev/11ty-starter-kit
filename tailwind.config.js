module.exports = {
  content: ['./src/**/*.html', './src/**/*.md', './src/**/*.liquid'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
