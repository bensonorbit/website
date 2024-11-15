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
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "caption",
			type: "string",
			title: "Caption",
			description: "Appears below the image.",
		}),
	],
});
