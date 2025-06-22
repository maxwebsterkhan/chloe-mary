import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modern SEO & Performance Optimizations for 2025 (Stable Version)
  experimental: {
    // Optimize bundling for better performance
    optimizePackageImports: ['lucide-react', 'gsap'],
  },
  
  // Image optimization for better LCP scores
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
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
};

export default nextConfig;
