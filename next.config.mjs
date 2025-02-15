import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  manifest: "/manifest.json", // Add leading slash
  disable: process.env.NODE_ENV === "development",
});

const AWS_BUCKET_URL = process.env.AWS_BUCKET_URL || "default-bucket-url";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Allow images from Google Profile
      },
      {
        protocol: "https",
        hostname: AWS_BUCKET_URL,
        pathname: "/**", // This allows any path under the bucket
      },
    ], // Allow images from Google Drive
  },
};

export default withPWA(withNextIntl(nextConfig));
