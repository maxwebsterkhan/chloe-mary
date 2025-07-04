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
    
    // Mobile-first quality settings
    if (width <= 480) return dpr > 1 ? 70 : 65;
    if (width <= 768) return dpr > 1 ? 75 : 70;
    if (width <= 1024) return dpr > 1 ? 80 : 75;
    if (width <= 1440) return dpr > 1 ? 82 : 78;
    return dpr > 1 ? 85 : 82;
  }

  // Server-side quality settings
  if (width <= 480) return 65;
  if (width <= 768) return 70;
  if (width <= 1024) return 75;
  if (width <= 1440) return 78;
  return 82;
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
    // Cap the DPR multiplier at 1.5x for mobile, 2x for desktop
    const effectiveDpr = Math.min(dpr, width <= 768 ? 1.5 : 2);
    targetWidth = Math.round(width * effectiveDpr);
  }

  // Cap maximum width based on viewport
  if (typeof window !== 'undefined') {
    const maxWidth = window.innerWidth <= 768 ? 800 : 1400;
    targetWidth = Math.min(targetWidth, maxWidth);
  } else {
    targetWidth = Math.min(targetWidth, 1400);
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