import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile R3F and three dependencies if needed
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  eslint: {
    // Allows production builds to complete even if the project has ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Allows production builds to complete even if the project has type errors
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'static-cdn.jtvnw.net',
      },
    ],
  },
};

export default bundleAnalyzer(withNextIntl(nextConfig));


