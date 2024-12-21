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
  // Configuración para manejar imágenes y assets estáticos
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
  // Asegurarse de que las imágenes se copien correctamente
  experimental: {
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
  // Configuración para GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.NODE_ENV === 'production' ? '/gy-web' : '',
  },
}

module.exports = nextConfig
