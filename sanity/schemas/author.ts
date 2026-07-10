import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const author = defineType({
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
      initialValue: "Contributor",
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.max(30).required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
    }),
    defineField({
      name: "bio",
      of: [{ type: "block" }],
      title: "Biography",
      type: "array",
    }),
  ],
  icon: UserIcon,
  name: "author",
  preview: {
    select: {
      media: "photo",
      subtitle: "role",
      title: "name",
    },
  },
  title: "Author",
  type: "document",
});
