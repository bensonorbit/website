import { defineField } from "sanity";

import { categories } from "@/lib/data";

export const category = defineField({
  initialValue: Object.keys(categories)[0],
  name: "category",
  options: {
    list: Object.entries(categories).map(([value, title]) => ({
      title,
      value,
    })),
  },
  title: "Category",
  type: "string",
  validation: (rule) => rule.required(),
});
