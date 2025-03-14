/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['mauweb.monamedia.net', 'res.cloudinary.com'],
  },
}

module.exports = nextConfig
