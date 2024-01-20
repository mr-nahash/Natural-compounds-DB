const CopyPlugin = require("copy-webpack-plugin");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@heroicons/react/24', '@material-tailwind/react'],
  },
};

module.exports = withBundleAnalyzer(nextConfig);
