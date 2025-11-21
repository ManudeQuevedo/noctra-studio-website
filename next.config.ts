import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
const nextConfig: NextConfig = {
  // Tree shake these heavy libraries
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'react-icons'],
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Ensure we aren't downloading huge images
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
 
export default withNextIntl(nextConfig);
