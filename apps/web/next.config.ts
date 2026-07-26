import type { NextConfig } from "next";

import { getSanityRewrites } from "./src/sanity/rewrites";

const isDevelopment = process.env.NODE_ENV === "development";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${
    isDevelopment ? " 'unsafe-eval' https://va.vercel-scripts.com" : ""
  }`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data: https://cdn.sanity.io",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  cacheComponents: true,
  headers() {
    return [
      {
        headers: [
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
        source: "/(.*)",
      },
    ];
  },
  logging: {
    fetches: { fullUrl: false },
  },
  partialPrefetching: true,
  poweredByHeader: false,
  redirects() {
    return [
      {
        destination: "https://studio.bensonorbit.com",
        permanent: true,
        source: "/studio",
      },
      {
        destination: "/:category",
        permanent: true,
        source: "/category/:category",
      },
    ];
  },
  async rewrites() {
    return await getSanityRewrites();
  },
};

export default nextConfig;
