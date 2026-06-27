import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

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
};

export default withNextIntl(nextConfig);


