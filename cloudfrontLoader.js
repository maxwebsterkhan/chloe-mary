/*
  This file must be .js because Next.js requires the custom image loader to be a CommonJS module at the project root.
  It cannot be a TypeScript file or use ESM syntax.
*/
/* eslint-disable */
const CF_DOMAIN = 'https://d3enbndjwmdc7e.cloudfront.net/';

function cloudfrontLoader({ src, width }) {
  // If src starts with 'http' or points to a Next.js public asset (starts with '/'), just return it untouched
  if (src.startsWith('/') && !src.startsWith('/uploads/') && !src.startsWith('/img/')) {
    return src;
  }

  // Strip leading slash if present and any domain
  let cleanKey = src.replace(/^\//, '');
  if (cleanKey.startsWith(CF_DOMAIN)) {
    cleanKey = cleanKey.replace(CF_DOMAIN, '');
  } else if (/^https?:\/\//.test(cleanKey)) {
    // Remove any domain if present
    cleanKey = cleanKey.replace(/^https?:\/\/[^/]+\//, '');
  }

  // Build the image request object
  const request = {
    key: cleanKey,
    edits: {
      resize: {
        width: width,
        fit: 'cover'
      },
      format: 'webp',
      quality: width >= 1200 ? 85 : width >= 800 ? 75 : 65
    }
  };

  // Convert to base64 and build the URL
  const base64Request = Buffer.from(JSON.stringify(request)).toString('base64');
  return `${CF_DOMAIN}${base64Request}`;
}

module.exports = cloudfrontLoader; 