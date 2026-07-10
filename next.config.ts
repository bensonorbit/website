import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  logging: {
    fetches: { fullUrl: false },
  },
  redirects() {
    return [
      {
        destination: "https://benson.sanity.studio",
        permanent: true,
        source: "/studio",
      },
    ];
  },
};

export default nextConfig;
