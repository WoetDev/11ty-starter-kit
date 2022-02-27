const fs = require('fs');
const automaticNoopener = require('eleventy-plugin-automatic-noopener');

module.exports = function (config) {
  config.addFilter('values', Object.values);
  config.addPlugin(automaticNoopener, {
    noreferrer: true
  });

  config.setLiquidOptions({
    dynamicPartials: true,
  });

  // Static assets to pass through
  config.addPassthroughCopy('./src/public');
  config.addPassthroughCopy('./src/assets');
  config.addPassthroughCopy('./src/main.js');

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
