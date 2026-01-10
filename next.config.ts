import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images:  {
     remotePatterns: [
      {
       protocol: 'https',
       hostname: 'images.unsplash.com',
       port: '',
       pathname: '/**',
      }
     ]
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://backend:3000/:path*', // Internal docker address
      },
    ];
  },
};

export default nextConfig;
