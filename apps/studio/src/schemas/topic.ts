import { HashIcon } from "@sanity/icons/Hash";
import { defineField, defineType } from "sanity";

export const topic = defineType({
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      options: {
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        maxLength: 96,
        source: "name",
      },
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: "Displayed near the top of the topic page.",
      name: "description",
      of: [{ type: "block" }],
      title: "Description",
      type: "array",
    }),
  ],
  icon: HashIcon,
  name: "topic",
  preview: {
    select: {
      subtitle: "slug.current",
      title: "name",
    },
  },
  title: "Topic",
  type: "document",
});
