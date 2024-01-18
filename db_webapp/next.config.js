const CopyPlugin = require("copy-webpack-plugin");
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { isServer }) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
        ]
      })
    );

    if (!isServer) {
      config.resolve.fallback = {
        fs: false
      };
    }

    return config;
  }
};
 
module.exports = withBundleAnalyzer(nextConfig)