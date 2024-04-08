/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['t3.ftcdn.net', 'img.freepik.com'], // Add 'img.freepik.com' to the allowed domains
  },
};

export default nextConfig;
