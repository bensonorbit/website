import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { author } from "@/sanity/schemas/author";
import { category } from "@/sanity/schemas/category";
import { image } from "@/sanity/schemas/image";

export const article = defineType({
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
    category,
    defineField({
      name: "content",
      of: [{ type: "block" }, image],
      title: "Content",
      type: "array",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      validation: (rule) => rule.min(3).max(200),
    }),
    defineField({
      fields: [
        defineField({
          description: "Important for SEO and accessiblity.",
          name: "alt",
          title: "Alternative text",
          type: "string",
        }),
        defineField({
          description: "Appears below the image.",
          name: "caption",
          title: "Caption",
          type: "string",
        }),
        defineField({
          description:
            "Name of the photographer or source, including 'Photo by'",
          name: "credit",
          title: "Credit",
          type: "string",
        }),
      ],
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      initialValue: () => new Date().toISOString(),
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "authors",
      of: [{ to: [{ type: author.name }], type: "reference" }],
      title: "Authors",
      type: "array",
    }),
  ],
  icon: DocumentTextIcon,
  name: "article",
  preview: {
    prepare({ title, media, author, date }) {
      const subtitle = [
        author && `by ${author}`,
        date &&
          `on ${new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" })}`,
      ]
        .filter(Boolean)
        .join(" ");

      return { media, subtitle, title };
    },
    select: {
      author: "authors.0.name",
      date: "date",
      media: "coverImage",
      title: "title",
    },
  },
  title: "Article",
  type: "document",
});
