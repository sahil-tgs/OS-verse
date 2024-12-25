// next.config.ts
const nextConfig = {
  typescript: {
    // During initial development with stricter rules, you might want
    // to temporarily set this to true
    ignoreBuildErrors: false,
  },
  eslint: {
    // Same here - set to false to enforce better code quality
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['img.icons8.com'],
  },
}

export default nextConfig