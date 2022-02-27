const path = require('path');

/** Helper to auto-prefix a font src url with the path to local fonts. */
const getFontUrl = (src) => path.join('/assets/fonts', src);

const FontStyle = {
  NORMAL: 'normal',
  ITALIC: 'italic',
};

const FontDisplay = {
  SWAP: 'swap',
};

const FontVariant = {
  Light: 'Light',
  Regular: 'Regular',
  Bold: 'Bold',
  Italic: 'Italic',
  BoldItalic: 'Bold Italic',
};

const fonts = {
  body: {
    family: 'Ubuntu',
    fallbacks: [
      `-apple-system`,
      `BlinkMacSystemFont`,
      `Segoe UI`,
      `Roboto`,
      `Oxygen`,
      `Cantarell`,
      `Open Sans`,
      `Helvetica Neue`,
      `sans-serif`,
    ],
    weights: {
      light: {
        variant: FontVariant.Light,
        weight: 300,
        style: FontStyle.NORMAL,
        url: getFontUrl('Ubuntu-Light.ttf'),
        display: FontDisplay.SWAP,
      },
      regular: {
        variant: FontVariant.Regular,
        weight: 400,
        style: FontStyle.NORMAL,
        url: getFontUrl('Ubuntu-Regular.ttf'),
        display: FontDisplay.SWAP,
      },
      regularItalic: {
        variant: FontVariant.Italic,
        weight: 400,
        style: FontStyle.ITALIC,
        url: getFontUrl('Ubuntu-RegularItalic.ttf'),
        display: FontDisplay.SWAP,
      },
      bold: {
        variant: FontVariant.Bold,
        weight: 700,
        style: FontStyle.NORMAL,
        url: getFontUrl('Ubuntu-Bold.ttf'),
        display: FontDisplay.SWAP,
      },
      boldItalic: {
        variant: FontVariant.BoldItalic,
        weight: 700,
        style: FontStyle.ITALIC,
        url: getFontUrl('Ubuntu-BoldItalic.ttf'),
        display: FontDisplay.SWAP,
      },
    },
  },
  code: {
    family: 'Inconsolata',
    fallbacks: [`Monaco`, `Consolas`, `Courier New`, `monospace`],
    weights: {
      regular: {
        variant: FontVariant.Regular,
        weight: 500,
        style: FontStyle.NORMAL,
        url: getFontUrl('inconsolata-500.woff2'),
        display: FontDisplay.SWAP,
      },
      bold: {
        variant: FontVariant.Bold,
        weight: 700,
        style: FontStyle.NORMAL,
        url: getFontUrl('inconsolata-700.woff2'),
        display: FontDisplay.SWAP,
      },
    },
  },
};

module.exports = fonts;
