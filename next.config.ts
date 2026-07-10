import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
