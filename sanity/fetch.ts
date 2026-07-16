import "server-only";
import { createClient, defineQuery } from "next-sanity";

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

export function getArticleBySlug(slug: string) {
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

  return client.fetch(
    articleQuery,
    { slug },
    { next: { revalidate: false, tags: ["article", `article:${slug}`] } }
  );
}

export function getLatestArticles() {
  const latestArticlesQuery = defineQuery(`
		*[_type == "article"] | order(date desc) [0...20] {
			${articleFields}
		}
	`);

  return client.fetch(
    latestArticlesQuery,
    {},
    { next: { revalidate: false, tags: ["article"] } }
  );
}

export function getCategoryBySlug(slug: string) {
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

  return client.fetch(
    categoryQuery,
    { slug },
    {
      next: {
        revalidate: false,
        tags: ["article", "category", `category:${slug}`],
      },
    }
  );
}

export function getAllCategories() {
  const allCategoriesQuery = defineQuery(`
    *[_type == "category"] | order(title asc) {
      _id,
      "title": coalesce(title, "Untitled Category"),
      "slug": slug.current,
    }
  `);

  return client.fetch(
    allCategoriesQuery,
    {},
    { next: { revalidate: false, tags: ["category"] } }
  );
}

export function getAllArticles() {
  const allArticlesQuery = defineQuery(`
		*[_type == "article"] | order(date desc) {
			${articleFields}
		}
	`);

  return client.fetch(
    allArticlesQuery,
    {},
    { next: { revalidate: false, tags: ["article"] } }
  );
}

export function getSettings() {
  const settingsQuery = defineQuery(`
		*[_type == "settings"] [0] {
			...,
			"featuredArticles": featuredArticles[]-> {
				${articleFields}
			}
		}
	`);

  return client.fetch(
    settingsQuery,
    {},
    { next: { revalidate: false, tags: ["settings"] } }
  );
}

export function getAuthorBySlug(slug: string) {
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

  return client.fetch(
    authorQuery,
    { slug },
    { next: { revalidate: false, tags: [`author:${slug}`, "article"] } }
  );
}

export function getAllAuthors() {
  const allAuthorsQuery = defineQuery(`
		*[_type == "author"] {
			slug,
			role,
			name,
		}
	`);

  return client.fetch(
    allAuthorsQuery,
    {},
    { next: { revalidate: false, tags: ["author"] } }
  );
}
