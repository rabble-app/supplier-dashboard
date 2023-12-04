/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
