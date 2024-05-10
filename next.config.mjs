/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: ""
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port:""
      }
    ]
  }
};

export default nextConfig;
