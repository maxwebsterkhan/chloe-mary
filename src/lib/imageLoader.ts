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
  // ---------------------------------------------------------------------
  // 1. Normalise width BEFORE any calculations. If Next.js supplies 0 or
  //    a tiny value because the element was hidden during first paint, we
  //    fall back to 320 px – the smallest practical mobile width.
  // ---------------------------------------------------------------------
  const effectiveWidth = Math.max(width, 320);

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

  // Use the width provided by Next.js (after normalisation); the browser
  // selects an appropriate candidate from the srcset based on DPR.
  let targetWidth = effectiveWidth;

  // Cap target width to a reasonable maximum (4K on desktop, 1600px on narrow screens)
  const MAX_DESKTOP_WIDTH = 3840;
  const MAX_MOBILE_WIDTH = 1600;

  if (typeof window !== 'undefined') {
    const isMobileScreen = window.innerWidth <= 768;
    targetWidth = Math.min(targetWidth, isMobileScreen ? MAX_MOBILE_WIDTH : MAX_DESKTOP_WIDTH);

    // For high-DPR mobile / tablet screens we allow up to 2× width when the logical
    // width is <= 1200 px. This gives crisper images without huge files.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (targetWidth <= 1200) {
      targetWidth = Math.round(targetWidth * dpr);
    }
  } else {
    targetWidth = Math.min(targetWidth, MAX_DESKTOP_WIDTH);
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