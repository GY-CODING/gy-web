/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com',
      'api.gycoding.com',
    ],
    unoptimized: true,
    loader: 'default',
    path: '',
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/gy-web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gy-web/' : '',
  // Asegurarse de que los assets estáticos se copien
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
