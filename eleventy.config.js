import fs from 'fs';
import path from 'path';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';


export default function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");

   // Favicon shortcode
   let faviconPath = fs
      .readFileSync(path.join( "src", "assets", "images", "logos", "favicon.txt"), "utf8")
      .trim();
      
    eleventyConfig.addShortcode("favicon", function () {
      return `<link rel="icon" type="image/svg+xml" href="${faviconPath}">`;
    });
    
  //compile tailwind before eleventy processes the files
  eleventyConfig.on('eleventy.before', async () => {
    const tailwindInputPath = path.resolve('./src/assets/styles/index.css');

    const tailwindOutputPath = './dist/assets/styles/index.css';

    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    //compile tailwind
    tailwindcss({
      content: ['./src/**/*.{njk,md,js}'],
      theme: {
        extend: {}
      },
      safelist: ['group', 'group-hover:text-emerald-600']
    }),
    //minify tailwind css
    cssnano({
      preset: 'default',
    }),
  ]);

  return {
    dir: { 
      input: 'src', 
      output: 'dist',
      includes: '_includes' 
    }
  };
}
