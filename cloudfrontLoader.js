/*
  This file must be .js because Next.js requires the custom image loader to be a CommonJS module at the project root.
  It cannot be a TypeScript file or use ESM syntax.
*/
/* eslint-disable */
const { generateImageUrl } = require('./src/lib/imageLoader');

function cloudfrontLoader(props) {
  return generateImageUrl(props);
}

module.exports = cloudfrontLoader; 