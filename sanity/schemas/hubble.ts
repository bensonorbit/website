import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hubble = defineType({
	name: "hubble",
	title: "Hubble Photo",
	icon: ImageIcon,
	type: "document",
	fields: [
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "caption",
			title: "Caption",
			type: "string",
			validation: (rule) => rule.max(200),
		}),
		defineField({
			name: "alt",
			type: "string",
			title: "Alternative text",
			description: "Important for SEO and accessiblity.",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "date",
			title: "Date",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: "photographer",
			title: "Photographer",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "caption",
			photographer: "photographer",
			date: "date",
			media: "image",
		},
		prepare({ title, photographer, date, media }) {
			const subtitle = [
				photographer,
				date &&
					`${new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" })}`,
			]
				.filter(Boolean)
				.join(" • ");

			return { title, media, subtitle };
		},
	},
});
