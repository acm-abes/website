/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['node-appwrite'],
  },
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
  },
  env: {
    "PROJECT_ID": process.env.PROJECT_ID,
    DATABASE_ID: process.env.DATABASE_ID,
    BUCKET_ID: process.env.BUCKET_ID,
    EVENTS_COLLECTION: process.env.EVENTS_COLLECTION,
  }
};

export default nextConfig;
