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
		shortcuts: [
			{
				name: "News",
				url: "/news",
			},
			{
				name: "Sports",
				url: "/sports",
			},
			{
				name: "Culture",
				url: "/culture",
			},
			{
				name: "Student Voices",
				url: "/voices",
			},
			{
				name: "The Hubble",
				url: "/hubble",
			},
			{
				name: "The Star",
				url: "/star",
			},
		],
		categories: ["news", "education", "sports"],
	};
}
