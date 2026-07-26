import type { MetadataRoute } from "next";

import { fullUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: fullUrl("/sitemap.xml"),
  };
}
