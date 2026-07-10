import type { MetadataRoute } from "next";

import { categories } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#030712",
    categories: ["news", "education", "sports"],
    description: "The student-run newspaper of Benson Polytechnic High School",
    display: "standalone",
    icons: [
      {
        sizes: "any",
        src: "/icon.svg",
        type: "image/svg+xml",
      },
      {
        sizes: "180x180",
        src: "/apple-icon.png",
        type: "image/png",
      },
    ],
    name: "The Benson Orbit",
    short_name: "Benson Orbit",
    shortcuts: Object.entries(categories).map(([category, name]) => ({
      name,
      url: `/${category}`,
    })),
    start_url: "/",
  };
}
