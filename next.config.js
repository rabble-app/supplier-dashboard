/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["rabble-dev1.s3.us-east-2.amazonaws.com"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
