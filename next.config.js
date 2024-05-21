/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
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
  }
}

module.exports = nextConfig
