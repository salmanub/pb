const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    // Add Navigation plugin
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // Other configurations can go here
};