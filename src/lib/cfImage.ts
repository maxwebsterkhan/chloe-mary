export const CF_DOMAIN = 'https://d3enbndjwmdc7e.cloudfront.net';

interface Options {
  w?: number;
  h?: number;
  fit?: string;
  format?: string;
}

export function cfImage(key: string, opts: Options = {}): string {
  // Ensure no leading slash so we don`t end up with double //
  const cleanKey = key.replace(/^\//, '');
  const { w, h, fit, format } = opts;
  const params: string[] = [];
  if (w) params.push(`w=${w}`);
  if (h) params.push(`h=${h}`);
  if (fit) params.push(`fit=${fit}`);
  // Always request webp unless caller overrides
  params.push(`format=${format || 'webp'}`);
  return `${CF_DOMAIN}/${cleanKey}${params.length ? '?' + params.join('&') : ''}`;
} 