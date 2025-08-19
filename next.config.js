/** @type {import('next').NextConfig} */

const adminRoute = process.env.ADMIN_ROUTE;

const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    ADMIN_ROUTE: adminRoute,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.optimization.splitChunks.cacheGroups = {
      common: {
        name: "common",
        chunks: "all",
      }
    };
    config.resolve.alias['service-worker'] = './sw.js';
    return config;
  },
  async rewrites() {
    return adminRoute
      ? [
          {
            source: `/${adminRoute}`,
            destination: '/admin',
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
