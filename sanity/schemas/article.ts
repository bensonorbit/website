import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { author } from "@/sanity/schemas/author";
import { image } from "@/sanity/schemas/image";
import { category } from "@/sanity/schemas/category";

export const article = defineType({
	name: "article",
	title: "Article",
	icon: DocumentTextIcon,
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		category,
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }, image],
		}),
		defineField({
			name: "summary",
			title: "Summary",
			type: "text",
			validation: (rule) => rule.min(3).max(200),
		}),
		defineField({
			name: "coverImage",
			title: "Cover Image",
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
					description:
						"Name of the photographer or source, including 'Photo by'",
				}),
			],
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "date",
			title: "Date",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
		}),
		defineField({
			name: "authors",
			title: "Authors",
			type: "array",
			of: [{ type: "reference", to: [{ type: author.name }] }],
			validation: (rule) => rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			author: "authors.0.name", // First author
			date: "date",
			media: "coverImage",
		},
		prepare({ title, media, author, date }) {
			const subtitle = [
				author && `by ${author}`,
				date &&
					`on ${new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" })}`,
			]
				.filter(Boolean)
				.join(" ");

			return { title, media, subtitle };
		},
	},
});
