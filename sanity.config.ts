import { visionTool } from "@sanity/vision";
import type { PluginOptions } from "sanity";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { BensonAstronautIcon } from "@/components/icons";
import { apiVersion, dataset, projectId } from "@/sanity/constants";
import { article } from "@/sanity/schemas/article";
import { author } from "@/sanity/schemas/author";
import { category } from "@/sanity/schemas/category";
import { settings } from "@/sanity/schemas/settings";
import { pageStructure, singletonPlugin } from "@/sanity/singleton";

const plugins: PluginOptions[] = [
  structureTool({ structure: pageStructure([settings]) }),
  singletonPlugin([settings.name]),
];

// Only include the Vision plugin in development
// https://www.sanity.io/docs/the-vision-plugin
if (process.env.NODE_ENV === "development") {
  plugins.push(visionTool({ defaultApiVersion: apiVersion }));
}

export default defineConfig({
  dataset,
  icon: () => BensonAstronautIcon({ size: 25 }),
  plugins,
  projectId,
  schema: {
    types: [settings, article, author, category],
  },
  title: "Orbit Studio",
});
