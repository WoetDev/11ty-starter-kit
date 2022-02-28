const fs = require('fs');
const automaticNoopener = require('eleventy-plugin-automatic-noopener');
const Image = require('@11ty/eleventy-img');
const sharp = require('sharp');
const htmlmin = require('html-minifier');
const eleventyPluginFilesMinifier = require('@sherby/eleventy-plugin-files-minifier');

async function imageShortcode(src, alt, sizes = '100vw') {
  if (alt === undefined) {
    // You bet we throw an error on missing alt (alt="" works okay)
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
  }

  let metadata = await Image(src, {
    widths: [25, 320, 640, 960, 1200, 1800, 2400],
    formats: ['webp', 'jpeg'],
    urlPath: '/images/',
    outputDir: './_site/public/images/',
  });

  let lowsrc = metadata.jpeg[0];
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

  const placeholder = await sharp(lowsrc.outputPath)
    .resize({ fit: sharp.fit.inside })
    .blur()
    .toBuffer();

  const base64Placeholder = `data:image/png;base64,${placeholder.toString(
    'base64',
  )}`;

  return `<picture>
    ${Object.values(metadata)
      .map((imageFormat) => {
        return `  <source type="${
          imageFormat[0].sourceType
        }" data-srcset="${imageFormat
          .map((entry) => entry.srcset)
          .join(', ')}" data-sizes="${sizes}">`;
      })
      .join('\n')}
      <img
        class="lazy"
        src="${base64Placeholder}"
        data-src="${lowsrc.url}"
        width="${highsrc.width}"
        height="${highsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = function (config) {
  config.addFilter('values', Object.values);
  config.addPlugin(automaticNoopener, {
    noreferrer: true,
  });

  config.addLiquidShortcode('image', imageShortcode);

  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/assets');
  config.addPassthroughCopy('./src/main.js');

  // Minifying output
  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      return htmlmin.minify(content, {
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true,
      });
    }

    return content;
  });

  config.addPlugin(eleventyPluginFilesMinifier);

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    passthroughFileCopy: true,
    templateFormats: ['html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
    dataTemplateEngine: 'liquid',
    markdownTemplateEngine: 'liquid',
  };
};
