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
      }
    ];
  },
  
  // Image configuration - direct serving without optimization
  images: {
    unoptimized: true, // Serve images directly without Vercel processing
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Security headers for better SEO trust signals
  async headers() {
    return [
      // General headers for all pages
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
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, must-revalidate',
          },
          {
            key: 'Link',
            value: '</logo.webp>; rel=preload; as=image',
          },
        ],
      },
      // Specific caching headers for images
      {
        source: '/api/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache static images in public folder - using individual patterns
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).gif',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache S3 images (if they're served through a specific path)
      {
        source: '/s3-images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
      {
        source: '/site.webmanifest',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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
