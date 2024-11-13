import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const author = defineType({
	name: "author",
	title: "Author",
	icon: UserIcon,
	type: "document",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
				isUnique: (value, context) => context.defaultIsUnique(value, context),
			},
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: "role",
			title: "Role",
			type: "string",
			validation: (rule) => rule.max(30).required(),
			initialValue: "Contributor",
		}),
		defineField({
			name: "photo",
			title: "Photo",
			type: "image",
		}),
		defineField({
			name: "bio",
			title: "Biography",
			type: "array",
			of: [{ type: "block" }],
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "role",
			media: "photo",
		},
	},
});
