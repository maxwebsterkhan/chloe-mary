import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Modern SEO & Performance Optimizations for 2025 (Stable Version)
  experimental: {
    // Optimize bundling for better performance
    optimizePackageImports: ['lucide-react', 'gsap', '@phosphor-icons/react'],
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
