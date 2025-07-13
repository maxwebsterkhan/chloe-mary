import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modern SEO & Performance Optimizations for 2025 (Stable Version)
  experimental: {
    // Optimize bundling for better performance
    optimizePackageImports: ['lucide-react', 'gsap', '@phosphor-icons/react'],
  },
  
  // Output configuration for better performance
  output: 'standalone',
  
  // Logging configuration for better debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Redirect configuration for old site URLs
  async redirects() {
    return [
      // HTTP to HTTPS redirect (if not handled by hosting provider)
      {
        source: '/(.*)',
        destination: 'https://www.chloemary.com/$1',
        permanent: true,
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
      },
      // Redirect old fees page to new pricing page
      {
        source: '/fees',
        destination: '/pricing',
        permanent: true,
      },
      // Handle old image paths
      {
        source: '/uploads/:path*',
        destination: '/img/:path*',
        permanent: true,
      },
      {
        source: '/edits',
        destination: '/',
        permanent: true,
      },
      {
        source: '/info',
        destination: '/pricing',
        permanent: true,
      },    {
        source: '/lbb',
        destination: '/',
        permanent: true,
      },
      {
        source: '/edits',
        destination: '/',
        permanent: true,
      },
      {
        source: '/moments',
        destination: '/stories',
        permanent: true,
      },
      {
        source: '/journal/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
  
  // Image configuration - optimized for responsive design including 4K
  images: {
    // Remove custom loader – use Next.js default `/ _next/image` optimisation
    deviceSizes: [320, 360, 414, 480, 560, 640, 750, 828, 960, 1120, 1280, 1536, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768],
    remotePatterns: process.env.NEXT_PUBLIC_IMG_HOST
      ? [
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_IMG_HOST,
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: '**.amazonaws.com',
            pathname: '/**',
          },
        ]
      : [
          {
            protocol: 'https',
            hostname: '**.amazonaws.com',
            pathname: '/**',
          },
        ],
    // Ensure optimisation pipeline stays active
    unoptimized: false,
  },
  
  // Minimal headers - let Next.js handle most caching
  async headers() {
    return [
      // Security headers only (no aggressive caching)
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          // Remove the aggressive Cache-Control header - let Next.js handle it
        ],
      },
      // Only cache truly static assets that won't change
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      // Cache SEO and manifest files
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Compress responses for better performance
  compress: true,
  
  // Optimize for production builds
  poweredByHeader: false,
  
  // Enable static optimization
  trailingSlash: false,

  // Additional build optimizations
  reactStrictMode: true,
  
  // Configure TypeScript for better performance
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  
  // Optimize bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
