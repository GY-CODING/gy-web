/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configuración para el dominio de producción
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://www.gycoding.com' : '',
  // Add configuration for static exports
  optimizeFonts: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
