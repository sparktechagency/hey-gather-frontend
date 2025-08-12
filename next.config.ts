import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['randomuser.me', '10.10.20.40', '10.10.20.40', 'dummyimage.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
