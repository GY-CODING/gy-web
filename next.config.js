// next.config.js
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',
      's.gravatar.com',
      'api.gycoding.com',
    ],
  },
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
};

module.exports = nextConfig;
