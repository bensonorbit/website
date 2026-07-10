"use client";

import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { author } from "@/sanity/schemas/author";
import { article } from "@/sanity/schemas/article";
import { pageStructure, singletonPlugin } from "@/sanity/singleton";
import { settings } from "@/sanity/schemas/settings";
import { hubble } from "@/sanity/schemas/hubble";
import { BensonAstronautIcon } from "@/components/Icons";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2025-01-01";

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
	title: "Orbit Studio",
	icon: () => BensonAstronautIcon({ size: 25 }),
	basePath: "/studio",
	projectId,
	dataset,
	plugins,
	schema: {
		types: [settings, article, author, hubble],
	},
});
