import { TagIcon } from "@sanity/icons/Tag";
import { defineField, defineType } from "sanity";

export const category = defineType({
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      options: {
        isUnique: (value, context) => context.defaultIsUnique(value, context),
        maxLength: 96,
        source: "title",
      },
      title: "Slug",
      type: "slug",
      validation: (rule) => rule.required(),
    }),
    defineField({
      description: "Displayed near the top of the category page.",
      name: "description",
      of: [{ type: "block" }],
      title: "Description",
      type: "array",
    }),
    defineField({
      description: "Reserved for future category hierarchy features.",
      name: "parent",
      title: "Parent Category",
      to: [{ type: "category" }],
      type: "reference",
      validation: (rule) =>
        rule.custom((parent, context) => {
          if (!parent?._ref || !context.document?._id) {
            return true;
          }

          const parentId = parent._ref.replace(/^drafts\./u, "");
          const documentId = context.document._id.replace(/^drafts\./u, "");

          return parentId === documentId
            ? "A category cannot be its own parent."
            : true;
        }),
    }),
  ],
  icon: TagIcon,
  name: "category",
  preview: {
    select: {
      subtitle: "slug.current",
      title: "title",
    },
  },
  title: "Category",
  type: "document",
});
