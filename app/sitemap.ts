import type { MetadataRoute } from "next";

import {
  getAllArticles,
  getAllAuthors,
  getAllCategories,
} from "@/sanity/fetch";

export default async function sitemap() {
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://bensonorbit.com",
    },
    {
      url: "https://bensonorbit.com/about",
    },
    {
      url: "https://bensonorbit.com/archive",
    },
  ];

  for (const category of await getAllCategories()) {
    entries.push({
      url: `https://bensonorbit.com/${category.slug}`,
    });
  }

  for (const article of await getAllArticles()) {
    entries.push({
      lastModified: article.date,
      url: `https://bensonorbit.com${article.url}`,
    });
  }

  for (const author of await getAllAuthors()) {
    entries.push({
      url: `https://bensonorbit.com/authors/${author.slug?.current}`,
    });
  }

  return entries;
}
