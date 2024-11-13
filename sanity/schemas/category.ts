import { defineField } from "sanity";
import { categories } from "@/lib/data";

export const category = defineField({
	name: "category",
	title: "Category",
	type: "string",
	options: {
		list: Object.entries(categories).map(([value, title]) => ({
			value,
			title,
		})),
	},
	initialValue: Object.keys(categories)[0],
	validation: (rule) => rule.required(),
});
