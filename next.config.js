/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript:{
    ignoreBuildErrors: false,
  },
  eslint:{
    ignoreDuringBuilds: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "images-eu.ssl-images-amazon.com",
      },
    ],
  },
};

export default nextConfig;
