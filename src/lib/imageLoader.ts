export const CF_DOMAIN = 'https://d3enbndjwmdc7e.cloudfront.net/';

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

interface ImageRequest {
  key: string;
  edits: {
    resize: {
      width: number;
      fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    };
    format: 'webp' | 'jpeg' | 'png';
    quality: number;
  };
}

/**
 * Generates a CloudFront URL with image transformations
 */
export function generateImageUrl({ src, width }: ImageLoaderProps): string {
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
  const request: ImageRequest = {
    key: cleanKey,
    edits: {
      resize: {
        width,
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