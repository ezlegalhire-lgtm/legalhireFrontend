/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Fix Watchpack errors on Windows - Simple approach
  webpack: (config) => {
    // Only use simple string patterns
    config.watchOptions = {
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/.next',
      ],
    };
    
    return config;
  },
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig