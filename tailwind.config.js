const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.md', './src/**/*.liquid'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', ...defaultTheme.fontFamily.sans, 'sans-serif'],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
