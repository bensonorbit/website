import { ImageIcon } from "@sanity/icons/Image";
import { defineField } from "sanity";

export const image = defineField({
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
      description: "Name of the photographer or source, including 'Photo by'",
      name: "credit",
      title: "Credit",
      type: "string",
    }),
  ],
  icon: ImageIcon,
  name: "image",
  title: "Image",
  type: "image",
});
