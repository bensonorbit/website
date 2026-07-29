import "server-only";
import { createClient, defineQuery } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";

import { apiVersion, dataset, projectId, token } from "@/sanity/constants";

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
    "showArticleEyebrow": coalesce(showArticleEyebrow, false),
  },
  categories[] -> {
    _id,
    "title": coalesce(title, "Untitled Category"),
    "slug": slug.current,
    "showArticleEyebrow": coalesce(showArticleEyebrow, false),
  },
  "date": coalesce(date, _updatedAt),
  "url": coalesce("/" + categories[0]->slug.current + "/" + slug.current, "/"),
  authors[] -> {
    "name": coalesce(name, "Unknown Author"),
    "slug": slug.current,
  },
  "topics": array::compact(
    coalesce(
      topics[]-> {
        "name": coalesce(name, "Untitled Topic"),
        "slug": slug.current,
      },
      []
    )
  ),
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
			"dateModified": _updatedAt,
			${articleFields}
		}
	`);

  const article = await client.fetch(articleQuery, { slug });

  const tags = new Set([`article:${slug}`]);
  for (const category of article?.categories ?? []) {
    if (category.slug) {
      tags.add(`category:${category.slug}`);
    }
  }
  for (const author of article?.authors ?? []) {
    if (author.slug) {
      tags.add(`author:${author.slug}`);
    }
  }
  for (const topic of article?.topics ?? []) {
    if (topic?.slug) {
      tags.add(`topic:${topic.slug}`);
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
      description
    }
	`);

  const category = await client.fetch(categoryQuery, { slug });
  cacheTag(`category:${slug}`);
  return category;
}

export async function getArticlesByCategorySlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const articlesByCategoryQuery = defineQuery(`
    *[
      _type == "article" &&
      $slug in categories[]->slug.current
    ] | order(date desc) [0...14] {
      ${articleFields}
    }
  `);

  const articles = await client.fetch(articlesByCategoryQuery, { slug });
  cacheTag(`articles:category:${slug}`, "category-article-lists");
  return articles;
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

export async function getTopicBySlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const topicQuery = defineQuery(`
    *[_type == "topic" && slug.current == $slug] [0] {
      _id,
      "name": coalesce(name, "Untitled Topic"),
      "slug": slug.current,
      description
    }
  `);

  const topic = await client.fetch(topicQuery, { slug });
  cacheTag(`topic:${slug}`);
  return topic;
}

export async function getArticlesByTopicSlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const articlesByTopicQuery = defineQuery(`
    *[
      _type == "article" &&
      $slug in topics[]->slug.current
    ] | order(date desc) [0...14] {
      ${articleFields}
    }
  `);

  const articles = await client.fetch(articlesByTopicQuery, { slug });
  cacheTag(`articles:topic:${slug}`, "topic-article-lists");
  return articles;
}

export async function getAllTopics() {
  "use cache: remote";
  cacheLife("max");

  const allTopicsQuery = defineQuery(`
    *[_type == "topic"] | order(name asc) {
      _id,
      "name": coalesce(name, "Untitled Topic"),
      "slug": slug.current,
    }
  `);

  const topics = await client.fetch(allTopicsQuery, {});
  cacheTag("topics");
  return topics;
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
			about
		}
	`);

  const settings = await client.fetch(settingsQuery, {});
  cacheTag("settings");
  return settings;
}

export async function getFeaturedArticles() {
  "use cache: remote";
  cacheLife("max");

  const featuredArticlesQuery = defineQuery(`
    coalesce(
      *[_type == "settings"][0].featuredArticles[]-> {
        ${articleFields}
      },
      []
    )
  `);

  const articles = await client.fetch(featuredArticlesQuery, {});
  const tags = new Set(["featured-articles"]);
  for (const article of articles) {
    if (article.slug) {
      tags.add(`article:${article.slug}`);
    }
  }
  cacheTag(...tags);
  return articles;
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
			}
		}
	`);

  const author = await client.fetch(authorQuery, { slug });
  cacheTag(`author:${slug}`);
  return author;
}

export async function getArticlesByAuthorSlug(slug: string) {
  "use cache: remote";
  cacheLife("max");

  const articlesByAuthorQuery = defineQuery(`
    *[
      _type == "article" &&
      $slug in authors[]->slug.current
    ] | order(date desc) {
      ${articleFields}
    }
  `);

  const articles = await client.fetch(articlesByAuthorQuery, { slug });
  cacheTag(`articles:author:${slug}`, "author-article-lists");
  return articles;
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
