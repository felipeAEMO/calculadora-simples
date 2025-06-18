// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // Jest configuration should NOT be here - it goes in jest.config.js
};

export default nextConfig;