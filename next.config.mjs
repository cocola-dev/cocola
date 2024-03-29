/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset-cocola.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 0,
  },
};

export default nextConfig;
