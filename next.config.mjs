/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
    ], // Allow images from Google Drive
  },
  transpilePackages: ['swagger-ui-react'],
};

export default nextConfig;
