/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'firebasestorage.googleapis.com',
      'picsum.photos',
      's1.ax1x.com'
    ]
  }
};

module.exports = nextConfig;

