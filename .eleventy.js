const { DateTime } = require("luxon");
const pluginTOC = require("eleventy-plugin-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItHighlightJS = require("markdown-it-highlightjs");
const embeds = require("eleventy-plugin-embed-everything");


const sizeOf = require('image-size');






const eleventyWebcPlugin = require("@11ty/eleventy-plugin-webc");
const { eleventyImagePlugin } = require("@11ty/eleventy-img");

const mdOptions = {
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
};

const mdAnchorOpts = {
  permalink: true,
  permalinkClass: "anchor-link",
  permalinkSymbol: "#",
  level: [1, 2, 3, 4],
};

module.exports = function (eleventyConfig) {

  eleventyConfig.addDataExtension("json", contents => JSON.parse(contents));


  eleventyConfig.addTemplateFormats("njk");

  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("src/pages", "pages");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");


  // Netlify CMS
  eleventyConfig.addPassthroughCopy('./admin');

  // Netlify/Decap CMS + config files bundled with webpack
  eleventyConfig.addPassthroughCopy('dist');

  eleventyConfig.addPairedShortcode("myShortcode", function (content) { // Method A: ✅ ideal para encapsular {% myShortcode %}  dfdfdf  {% endmyShortcode %}
    return `<div class="is-flex full-container-blog content-center">${content}</div>`;
  });






  eleventyConfig.addFilter("nextInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex + 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("nextInCollectionnext", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex + 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("prevInCollection", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("prevInCollectionnext", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });



  eleventyConfig.addShortcode("image", function(src, alt,title, cla) {

    const dimensions = sizeOf(`./src/assets/static/images/${src}`); // Ajusta el path según tu estructura de directorios
    return `<img class="${cla}" src="/assets/static/images/${src}" alt="${alt}" title="${title}" width="${dimensions.width}" height="${dimensions.height}">`;
});




  eleventyConfig.addShortcode("br", function () { // Method A: ✅ ideal para tags de espacios {% br %}
    return `
  <br>
`;
  });
  eleventyConfig.addShortcode("br2", function () { // Method A: ✅ ideal para tags de espacios {% br2 %}
    return `
  <br><br>
`;
  });
  eleventyConfig.addShortcode("br3", function () { // Method A: ✅ ideal para tags de espacios {% br3 %}
    return `
  <br><br><br>
`;
  });

  eleventyConfig.addFilter("wrapWithDiv", function(markdownString) {
    return markdownString.replace(/--(.*?)--/g, '<span class="bold">$1</span>');
});


  eleventyConfig.addPlugin(embeds);

  eleventyConfig.setLibrary(
    "md",
    markdownIt(mdOptions)
      .use(markdownItAnchor, mdAnchorOpts)
      .use(markdownItHighlightJS)
  );

  eleventyConfig.addPlugin(pluginTOC);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  function getIndex(collection, currentSlug) {
    return collection.findIndex((page) => page.fileSlug === currentSlug);
  }
  eleventyConfig.addFilter("prevInCollection1", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 1 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("prevInCollection2", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    const pages = collection.filter((page, index) => {
      return index == currentIndex - 2 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter("prevInCollection3", (collection, currentSlug) => {
    const currentIndex = getIndex(collection, currentSlug);
    // Busca dos posiciones adelante para encontrar el siguiente del siguiente
    const pages = collection.filter((page, index) => {
      return index === currentIndex - 3 ? page : false;
    });
    return pages.length ? pages[0] : false;
  });

  eleventyConfig.addFilter('reverseWords', function(value) {
    if (typeof value === 'string') {
      return value.split('').reverse().join('');
    }
    return value;
  });

  // WebC
  eleventyConfig.addPlugin(eleventyWebcPlugin, {
    components: [
      // …
      // Add as a global WebC component
      "npm:@11ty/eleventy-img/*.webc",
    ],
  });

  eleventyConfig.addPlugin(eleventyImagePlugin, {
    // Set global default options
    formats: ["webp"],
    urlPath: "/assets/static/",
    outputDir: "public/assets/static/",

    // Notably `outputDir` is resolved automatically
    // to the project output directory  npm install eleventy-plugin-seo --save falta este

    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
    },
  });

  return {
    dir: {
      data: "_data",
      input: "src",
      output: "public",
    },

    passthroughFileCopy: true,

  };
};
