import type { MetadataRoute } from "next";

import { fullUrl } from "@/lib/utils";
import {
  getAllArticles,
  getAllAuthors,
  getAllCategories,
} from "@/sanity/fetch";

export default async function sitemap() {
  const entries: MetadataRoute.Sitemap = [
    {
      url: fullUrl(),
    },
    {
      url: fullUrl("/about"),
    },
    {
      url: fullUrl("/archive"),
    },
  ];

  for (const category of await getAllCategories()) {
    entries.push({
      url: fullUrl(`/${category.slug}`),
    });
  }

  for (const article of await getAllArticles()) {
    entries.push({
      lastModified: article.date,
      url: fullUrl(article.url),
    });
  }

  for (const author of await getAllAuthors()) {
    entries.push({
      url: fullUrl(`/authors/${author.slug?.current}`),
    });
  }

  return entries;
}
