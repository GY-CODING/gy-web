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
  // Left over from GitHub Pages + custom domain: every asset URL was forced absolute to
  // https://www.gycoding.com so the page worked however it was reached. On Dokploy, HTML and
  // assets are served from the same origin, and `www.` currently has no DNS record at all
  // (only the bare domain resolves) — every JS/CSS/font request to that hardcoded host failed,
  // so the app never hydrated and stayed on the loading screen. Assets now resolve relative to
  // whatever origin actually serves the page, which also makes a future domain change painless.
  assetPrefix: '',
  // Add configuration for static exports
  optimizeFonts: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
