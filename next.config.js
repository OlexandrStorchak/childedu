/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    ADMIN_ROUTE: process.env.ADMIN_ROUTE,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
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
    const adminRoute = process.env.ADMIN_ROUTE;
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
