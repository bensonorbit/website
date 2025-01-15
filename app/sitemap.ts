import { categories } from "@/lib/data";
import { getAllArticles, getAllAuthors } from "@/sanity/fetch";
import type { MetadataRoute } from "next";

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

	for (const category of Object.keys(categories)) {
		entries.push({
			url: `https://bensonorbit.com/${category}`,
		});
	}

	for (const article of await getAllArticles()) {
		entries.push({
			url: `https://bensonorbit.com${article.url}`,
			lastModified: article.date,
		});
	}

	for (const author of await getAllAuthors()) {
		entries.push({
			url: `https://bensonorbit.com/authors/${author.slug?.current}`,
		});
	}

	return entries;
}
