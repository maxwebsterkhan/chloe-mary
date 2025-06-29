import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modern SEO & Performance Optimizations for 2025 (Stable Version)
  experimental: {
    // Optimize bundling for better performance
    optimizePackageImports: ['lucide-react', 'gsap', '@phosphor-icons/react'],
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
          // Additional SEO and security headers
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
    ];
  },
  
  // Compress responses for better performance
  compress: true,
  
  // Optimize for production builds
  poweredByHeader: false,
  
  // Enable static optimization
  trailingSlash: false,

  // Additional build optimizations
  swcMinify: true,
  reactStrictMode: true,
  
  // Configure TypeScript for better performance
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
};

export default nextConfig;
