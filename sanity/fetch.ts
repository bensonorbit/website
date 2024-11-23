import "server-only";
import { createClient, defineQuery } from "next-sanity";
import { apiVersion, dataset, projectId, assert } from "@/sanity/constants";
import { categories } from "@/lib/data";

const token = assert(
	process.env.SANITY_API_READ_TOKEN,
	"SANITY_API_READ_TOKEN",
);

const client = createClient({
	projectId,
	dataset,
	apiVersion,
	token,
	useCdn: false, // We always want fresh data during revalidation, and it's cached by Vercel anyway
	perspective: "published", // Only published documents should be fetched (not drafts)
});

const articleFields = `// groq
  _id,
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  summary,
  category,
  "date": coalesce(date, _updatedAt),
  "url": coalesce("/" + category + "/" + slug.current, "/"),
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
		{ next: { tags: [`article:${slug}`], revalidate: false } },
	);
}

export function getLatestArticles() {
	const latestArticlesQuery = defineQuery(`
		*[_type == "article"] | order(date desc) [0...4] {
			${articleFields}
		}
	`);

	return client.fetch(
		latestArticlesQuery,
		{},
		{ next: { tags: ["article"], revalidate: false } },
	);
}

export function getArticlesByCategory(category: keyof typeof categories) {
	const categoryArticlesQuery = defineQuery(`
		*[_type == "article" && category == $category] | order(date desc) [0...14] {
			${articleFields}
		}
	`);

	return client.fetch(
		categoryArticlesQuery,
		{ category },
		{ next: { tags: [`category:${category}`], revalidate: false } },
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
		{ next: { tags: ["article"], revalidate: false } },
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
		{ next: { tags: ["settings"], revalidate: false } },
	);
}

export function getHubblePhotos() {
	const hubbleQuery = defineQuery(`
		*[_type == "hubble"] | order(date desc) {
			...,
			"date": coalesce(date, _createdAt),
			"image": {
				"url": image.asset->url,
				"aspectRatio": image.asset->metadata.dimensions.aspectRatio,
				"lqip": image.asset->metadata.lqip,
			}
		}
	`);

	return client.fetch(
		hubbleQuery,
		{},
		{ next: { tags: ["hubble"], revalidate: false } },
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
		{ next: { tags: [`author:${slug}`, "article"], revalidate: false } },
	);
}
