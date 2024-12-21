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
  // Ignorar errores de plataforma
  webpack: (config, { isServer }) => {
    // Evitar errores de plataforma
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
}

module.exports = nextConfig
