import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@pixelsandpetals/ui'],
  experimental: {
    externalDir: true,
    esmExternals: true,
  },
  // Remove webpack configuration to use Turbopack
  // Turbopack is enabled by default in Next.js 13.1+
};

export default nextConfig;