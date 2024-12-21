/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/gy-web' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/gy-web/' : '',
  images: {
    unoptimized: true,
  },
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
}

module.exports = nextConfig
