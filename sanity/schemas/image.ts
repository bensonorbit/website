import { ImageIcon } from "@sanity/icons";
import { defineField } from "sanity";

export const image = defineField({
	name: "image",
	title: "Image",
	icon: ImageIcon,
	type: "image",
	fields: [
		defineField({
			name: "alt",
			type: "string",
			title: "Alternative text",
			description: "Important for SEO and accessiblity.",
		}),
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
			description: "Appears below the image.",
		}),
		defineField({
			name: "credit",
			type: "string",
			title: "Credit",
			description: "Name of the photographer or source, including 'Photo by'",
		}),
	],
});
