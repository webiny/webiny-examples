const tailwindcss = require("tailwindcss");
const { traverseLoaders } = require("@webiny/project-utils");

/**
 * A helper function to modify Webpack config.
 */
module.exports = config => {
  /**
   * Traverse all loaders, find `postcss-loader`, and overwrite plugins.
   */
  traverseLoaders(config.module.rules, loader => {
    // `loader` can also be a string, so check for `.loader` property.
    if (loader.loader && loader.loader.includes("postcss-loader")) {
      loader.options.postcssOptions.plugins = [
        ...loader.options.postcssOptions.plugins(),
        tailwindcss()
      ];
    }
  });

  return config;
};
