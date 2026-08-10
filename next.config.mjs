/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/quintanaweb",
  assetPrefix: "/quintanaweb",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
