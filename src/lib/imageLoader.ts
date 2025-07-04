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
    format: 'webp' | 'auto';
    quality: number;
  };
}

/**
 * Calculates optimal quality based on image width and device DPR
 */
function getOptimalQuality(width: number): number {
  if (typeof window !== 'undefined') {
    const dpr = window.devicePixelRatio || 1;
    
    // Photography-optimized quality settings
    if (width <= 480) return dpr > 1 ? 85 : 80;
    if (width <= 768) return dpr > 1 ? 90 : 85;
    if (width <= 1024) return dpr > 1 ? 95 : 90;
    if (width <= 1440) return dpr > 1 ? 95 : 92;
    return dpr > 1 ? 100 : 95;
  }

  // Server-side quality settings - keep high for photography
  if (width <= 480) return 80;
  if (width <= 768) return 85;
  if (width <= 1024) return 90;
  if (width <= 1440) return 92;
  return 95;
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

  // Adjust width based on device pixel ratio for high-res displays
  let targetWidth = width;
  if (typeof window !== 'undefined') {
    const dpr = window.devicePixelRatio || 1;
    // Allow higher DPR multipliers for photography
    const effectiveDpr = Math.min(dpr, width <= 768 ? 2 : 3);
    targetWidth = Math.round(width * effectiveDpr);
  }

  // Increased maximum widths for high-res displays
  if (typeof window !== 'undefined') {
    const maxWidth = window.innerWidth <= 768 ? 1600 : 3840;
    targetWidth = Math.min(targetWidth, maxWidth);
  } else {
    targetWidth = Math.min(targetWidth, 3840);
  }

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