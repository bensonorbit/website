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
