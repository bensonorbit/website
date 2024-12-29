import { categories } from "@/lib/data";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "The Benson Orbit",
		short_name: "Benson Orbit",
		description: "The student-run newspaper of Benson Polytechnic High School",
		start_url: "/",
		display: "standalone",
		background_color: "#030712",
		icons: [
			{
				src: "/icon.svg",
				sizes: "any",
				type: "image/svg+xml",
			},
			{
				src: "/apple-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
		shortcuts: Object.entries(categories).map(([category, name]) => ({
			name,
			url: `/${category}`,
		})),
		categories: ["news", "education", "sports"],
	};
}
