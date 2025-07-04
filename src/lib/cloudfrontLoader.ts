import { cfImage } from './cfImage';

export default function cloudfrontLoader({ src, width }: { src: string; width: number }) {
  // If src starts with 'http' or points to a Next.js public asset (starts with '/'), just return it untouched
  if (src.startsWith('/') && !src.startsWith('/uploads/') && !src.startsWith('/img/')) {
    return src;
  }
  return cfImage(src.replace(/^\//, ''), { w: width });
} 