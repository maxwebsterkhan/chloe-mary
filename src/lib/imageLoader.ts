export const CF_DOMAIN = 'https://d3enbndjwmdc7e.cloudfront.net';

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
      height?: number;
      fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    };
    format: 'webp';
    quality: number;
  };
}

/**
 * Calculates optimal quality based on image width and device DPR
 */
function getOptimalQuality(width: number): number {
  if (typeof window !== 'undefined') {
    const dpr = window.devicePixelRatio || 1;
    
    // Adjust quality based on size and DPR
    if (width >= 1920) {
      return dpr > 1 ? 85 : 80;
    } else if (width >= 1200) {
      return dpr > 1 ? 82 : 78;
    } else if (width >= 800) {
      return dpr > 1 ? 80 : 75;
    } else if (width >= 400) {
      return dpr > 1 ? 75 : 70;
    }
    return 65; // Smaller images
  }

  // Fallback quality settings for SSR
  if (width >= 1920) return 80;
  if (width >= 1200) return 78;
  if (width >= 800) return 75;
  if (width >= 400) return 70;
  return 65;
}

/**
 * Generates a CloudFront URL with image transformations
 */
export function generateImageUrl({ src, width, quality }: ImageLoaderProps): string {
  // If src starts with 'http' or points to a Next.js public asset (starts with '/'), just return it untouched
  if (src.startsWith('/') && !src.startsWith('/uploads/') && !src.startsWith('/img/')) {
    return src;
  }

  // Strip leading slash if present and any domain
  let cleanKey = src.replace(/^\//, '');
  if (cleanKey.startsWith(CF_DOMAIN)) {
    cleanKey = cleanKey.replace(`${CF_DOMAIN}/`, '');
  } else if (/^https?:\/\//.test(cleanKey)) {
    // Remove any domain if present
    cleanKey = cleanKey.replace(/^https?:\/\/[^/]+\//, '');
  }

  // Adjust width based on device pixel ratio, but cap it for performance
  let targetWidth = width;
  if (typeof window !== 'undefined') {
    const dpr = window.devicePixelRatio || 1;
    // Cap the DPR multiplier at 2x for performance
    const effectiveDpr = Math.min(dpr, 2);
    targetWidth = Math.round(width * effectiveDpr);
  }

  // Cap maximum width to prevent oversized images
  targetWidth = Math.min(targetWidth, 1400);

  // Build the image request object
  const request: ImageRequest = {
    key: cleanKey,
    edits: {
      resize: {
        width: targetWidth,
        fit: 'cover'
      },
      format: 'webp',
      quality: quality || getOptimalQuality(targetWidth)
    }
  };

  // Convert to base64 and build the URL
  const base64Request = Buffer.from(JSON.stringify(request)).toString('base64');
  return `${CF_DOMAIN}/${base64Request}`;
} 