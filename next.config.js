/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // `npm run preview` builds into its own folder so it never clashes with `next dev`,
  // which also uses this directory as its cache.
  distDir: process.env.NEXT_DIST_DIR || 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Configuración para el dominio de producción
  // LOCAL_PREVIEW serves assets locally, so a preview build measures your changes
  // instead of the files already deployed on www.gycoding.com.
  assetPrefix:
    process.env.NODE_ENV === 'production' && !process.env.LOCAL_PREVIEW
      ? 'https://www.gycoding.com'
      : '',
  // Add configuration for static exports
  optimizeFonts: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
