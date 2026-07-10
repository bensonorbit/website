import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { article } from "@/sanity/schemas/article";

export const settings = defineType({
  fields: [
    defineField({
      description: "Used on the about page",
      name: "about",
      of: [{ type: "block" }],
      title: "About",
      type: "array",
    }),
    defineField({
      description: "Featured articles on the home page",
      name: "featuredArticles",
      of: [{ to: [{ type: article.name }], type: "reference" }],
      title: "Featured Articles",
      type: "array",
      validation: (rule) => rule.max(12),
    }),
  ],
  icon: CogIcon,
  name: "settings",
  preview: {
    prepare() {
      return {
        title: "Settings",
      };
    },
  },
  title: "Settings",
  type: "document",
});
