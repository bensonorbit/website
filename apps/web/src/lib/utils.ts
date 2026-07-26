import type { Metadata } from "next";

export function mergeMeta(metadata: Metadata): Metadata {
  return {
    ...metadata,
    openGraph: {
      locale: "en_US",
      siteName: "The Benson Orbit",
      title: typeof metadata.title === "string" ? metadata.title : undefined,
      type: "website",
      ...metadata.openGraph,
    },
  };
}

export function assert(value: string | undefined, variable: string) {
  if (value === undefined) {
    const error = `Missing environment variable: ${variable}. See .env.example for more details.`;
    throw new Error(error);
  }

  return value;
}

function getSiteUrl() {
  if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`);
  }

  if (process.env.NODE_ENV === "development") {
    return new URL("http://localhost:3000");
  }

  return new URL("https://bensonorbit.com");
}

export const siteUrl = getSiteUrl();

export function fullUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
