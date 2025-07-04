/*
  This file must be .js because Next.js requires the custom image loader to be a CommonJS module at the project root.
  It cannot be a TypeScript file or use ESM syntax.
*/
/* eslint-disable */
const CF_DOMAIN = 'https://d3enbndjwmdc7e.cloudfront.net/';
const cfImage = require('./src/lib/cfImage').cfImage;

module.exports = function cloudfrontLoader({ src, width }) {
  // If src is a full URL, strip the domain (CloudFront or S3)
  let key = src;
  if (key.startsWith(CF_DOMAIN)) {
    key = key.replace(CF_DOMAIN, '');
  } else if (/^https?:\/\//.test(key)) {
    // Remove any domain if present
    key = key.replace(/^https?:\/\/[^/]+\//, '');
  }
  // Strip leading slash if present
  key = key.replace(/^\//, '');

  // Optionally, skip static assets
  if (src.startsWith('/') && !src.startsWith('/uploads/') && !src.startsWith('/img/')) {
    return src;
  }

  // Prevent double format=webp (cfImage should handle this, but just in case)
  return cfImage(key, { w: width });
}; 