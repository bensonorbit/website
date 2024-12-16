import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { article } from "@/sanity/schemas/article";

export const settings = defineType({
	name: "settings",
	title: "Settings",
	type: "document",
	icon: CogIcon,
	fields: [
		defineField({
			name: "about",
			description: "Used on the about page",
			title: "About",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "featuredArticles",
			description: "Featured articles on the home page",
			title: "Featured Articles",
			type: "array",
			of: [{ type: "reference", to: [{ type: article.name }] }],
			validation: (rule) => rule.max(12),
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Settings",
			};
		},
	},
});
