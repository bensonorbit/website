import { visionTool } from "@sanity/vision";
import type { PluginOptions } from "sanity";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { BensonAstronautIcon } from "./src/benson-astronaut-icon";
import { apiVersion, dataset, projectId } from "./src/constants";
import { article } from "./src/schemas/article";
import { author } from "./src/schemas/author";
import { category } from "./src/schemas/category";
import { settings } from "./src/schemas/settings";
import { pageStructure, singletonPlugin } from "./src/singleton";

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
