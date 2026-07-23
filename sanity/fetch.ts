import "server-only";
import { createClient, defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

import { apiVersion, dataset, projectId, assert } from "@/sanity/constants";

const token = assert(
  process.env.SANITY_API_READ_TOKEN,
  "SANITY_API_READ_TOKEN"
);

const client = createClient({
  apiVersion,
  dataset,
  // Only published documents should be fetched (not drafts)
  perspective: "published",
  projectId,
  token,
  // We always want fresh data during revalidation, and it's cached by Vercel anyway
  useCdn: false,
});

const articleFields = `// groq
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  summary,
  "primaryCategory": categories[0]-> {
    _id,
    "title": coalesce(title, "Untitled Category"),
    "slug": slug.current,
  },
  "date": coalesce(date, _updatedAt),
  "url": coalesce("/" + categories[0]->slug.current + "/" + slug.current, "/"),
  authors[] -> {
    "name": coalesce(name, "Unknown Author"),
    "slug": slug.current,
  },
  "coverImage": {
	"url": coverImage.asset->url,
	"aspectRatio": coverImage.asset->metadata.dimensions.aspectRatio,
	"lqip": coverImage.asset->metadata.lqip,
	"alt": coverImage.alt,
	"caption": coverImage.caption,
	"credit": coverImage.credit,
  }
`;

export async function getArticleBySlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const articleQuery = defineQuery(`
		*[_type == "article" && slug.current == $slug] [0] {
			content[] {
				...,
				_type == "image" => {
					"url": @.asset->url,
					"aspectRatio": @.asset->metadata.dimensions.aspectRatio,
					"lqip": @.asset->metadata.lqip,
					alt,
					caption,
				}
			},
			${articleFields}
		}
	`);

  const article = await client.fetch(articleQuery, { slug });

  const tags = [`article:${slug}`];
  if (article?.primaryCategory?.slug) {
    tags.push(`category:${article.primaryCategory.slug}`);
  }
  for (const author of article?.authors ?? []) {
    if (author.slug) {
      tags.push(`author:${author.slug}`);
    }
  }
  cacheTag(...tags);

  return article;
}

export async function getLatestArticles() {
  "use cache: remote";
  cacheLife("max");

  const latestArticlesQuery = defineQuery(`
		*[_type == "article"] | order(date desc) [0...20] {
			${articleFields}
		}
	`);

  const articles = await client.fetch(latestArticlesQuery, {});
  cacheTag("articles");
  return articles;
}

export async function getCategoryBySlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const categoryQuery = defineQuery(`
		*[_type == "category" && slug.current == $slug] [0] {
      _id,
      "title": coalesce(title, "Untitled Category"),
      "slug": slug.current,
      description,
      "articles": *[_type == "article" && references(^._id)] | order(date desc) [0...14] {
        ${articleFields}
      }
    }
	`);

  const category = await client.fetch(categoryQuery, { slug });
  cacheTag(`category:${slug}`);
  return category;
}

export async function getAllCategories() {
  "use cache: remote";
  cacheLife("max");

  const allCategoriesQuery = defineQuery(`
    *[_type == "category"] | order(title asc) {
      _id,
      "title": coalesce(title, "Untitled Category"),
      "slug": slug.current,
    }
  `);

  const categories = await client.fetch(allCategoriesQuery, {});
  cacheTag("categories");
  return categories;
}

export async function getAllArticles() {
  "use cache: remote";
  cacheLife("max");

  const allArticlesQuery = defineQuery(`
		*[_type == "article"] | order(date desc) {
			${articleFields}
		}
	`);

  const articles = await client.fetch(allArticlesQuery, {});
  cacheTag("articles");
  return articles;
}

export async function getSettings() {
  "use cache: remote";
  cacheLife("max");

  const settingsQuery = defineQuery(`
		*[_type == "settings"] [0] {
			...,
			"featuredArticles": featuredArticles[]-> {
				${articleFields}
			}
		}
	`);

  const settings = await client.fetch(settingsQuery, {});
  cacheTag("settings", "articles");
  return settings;
}

export async function getAuthorBySlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const authorQuery = defineQuery(`
		*[_type == "author" && slug.current == $slug] [0] {
			...,
			"photo": {
				"url": photo.asset->url,
				"aspectRatio": photo.asset->metadata.dimensions.aspectRatio,
				"lqip": photo.asset->metadata.lqip,
			},
			"articles": *[_type == "article" && references(^._id)] | order(date desc) {
				${articleFields}
			}
		}
	`);

  const author = await client.fetch(authorQuery, { slug });
  cacheTag(`author:${slug}`);
  return author;
}

export async function getAllAuthors() {
  "use cache: remote";
  cacheLife("max");

  const allAuthorsQuery = defineQuery(`
		*[_type == "author"] {
			slug,
			role,
			name,
		}
	`);

  const authors = await client.fetch(allAuthorsQuery, {});
  cacheTag("authors");
  return authors;
}
