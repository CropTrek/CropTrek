/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
// const nextconfig2 = {
//   presets: ['next/babel'],
// };
//module.exports = nextConfig
module.exports = {
  async rewrites() {

    return [
      {
        source: '/Cart/Cart',
        destination: '/Cart/Cart2/Panier',
      },
    ]
  },
  basePath: '',
  assetPrefix: '',
  nextConfig
  ,
  images: {
    domains: ['localhost'],
  },
};

