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
    ],
  },
};

export default nextConfig;
