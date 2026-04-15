// next.config.ts
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'img.icons8.com',
      },
    ],
  },
}

export default nextConfig
