import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const hubble = defineType({
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      description: "Important for SEO and accessiblity.",
      name: "alt",
      title: "Alternative text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      initialValue: () => new Date().toISOString(),
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "photographer",
      title: "Photographer",
      type: "string",
    }),
  ],
  icon: ImageIcon,
  name: "hubble",
  preview: {
    prepare({ title, photographer, date, media }) {
      const subtitle = [
        photographer,
        date &&
          `${new Date(date).toLocaleDateString(undefined, { dateStyle: "medium" })}`,
      ]
        .filter(Boolean)
        .join(" • ");

      return { media, subtitle, title };
    },
    select: {
      date: "date",
      media: "image",
      photographer: "photographer",
      title: "caption",
    },
  },
  title: "Hubble Photo",
  type: "document",
});
